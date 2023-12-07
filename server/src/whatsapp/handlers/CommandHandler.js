import FlowModel from "../../mongo/models/FlowModel.js";
import LeadModel from "../../mongo/models/LeadModel.js";
import mongoConnect from "../../mongo/mongoConnect.js";
import whatsapp from "whatsapp-web.js";

const findAllowedNodes = (
  startNodeId,
  nodes,
  edges = [],
  allowedTypes = []
) => {
  const allowedNodes = [];
  const visited = new Set();

  function dfs(nodeId) {
    const outgoingEdges = edges.filter((edge) => edge.source === nodeId);

    for (const edge of outgoingEdges) {
      if (!visited.has(edge.target)) {
        visited.add(edge.target);

        const currentNode = nodes.find((node) => node.id === edge.target);

        if (!allowedTypes.includes(currentNode.type)) {
          return;
        }

        allowedNodes.push(edge.target);

        dfs(edge.target);
      }
    }
  }

  dfs(startNodeId);

  return allowedNodes;
};

const replaceVariables = (data, variables) => {
  const pattern = /{([^}]+)}/g;
  const result = {};
  for (const key in data) {
    if (
      Object.prototype.hasOwnProperty.call(data, key) &&
      typeof data[key] === "string"
    ) {
      const replacedField = data[key].replace(pattern, (_, match) => {
        const variableValue = variables[match.trim()];
        return variableValue !== undefined ? variableValue : match;
      });
      result[key] = replacedField;
    }
  }
  return result;
};

class CommandHandler {
  constructor() {
    /**
     * @private
     * @type {whatsapp.Client}
     */
    this.client;

    /**
     * @private
     * @type {{nodes: [], edges: [] }}
     */
    this.flow;

    /**
     * @private
     * @type {{key: value}}
     */
    this.variables = {};

    /**
     * @private
     * @type {{ var_name: String, var_tel: String, var_lastcommand: String, var_datetime: String }}
     */
    this.userData = {};

    /**
     * @private
     * @type {String}
     */
    this.startDialog;
  }

  /**
   * @returns {CommandHandler}
   */
  static getInstance() {
    if (!CommandHandler.instance) {
      CommandHandler.instance = new CommandHandler();
    }
    return CommandHandler.instance;
  }

  /**
   * @param {whatsapp.Client} client
   */
  async initialize(client) {
    this.client = client;
    await this.rebuild(await FlowModel.findOne({}).lean());
  }

  /**
   * @returns {Promise<boolean>}
   */
  async checkClientConnection() {
    return (
      this.client &&
      (await this.client.getState()) == whatsapp.WAState.CONNECTED
    );
  }

  /**
   * @param {{nodes: [], edges: [] }}flow
   */
  async rebuild(flow) {
    this.flow = flow;

    this.startDialog = null;

    this.variables = {};

    this.userData = null;

    if (
      flow &&
      flow.nodes &&
      flow.nodes.length > 0 &&
      (await this.checkClientConnection())
    ) {
      for (const node of this.flow.nodes) {
        switch (node.type) {
          case "userNode":
            if (node.data) {
              if (!this.userData) this.userData = node.data;
            }
            break;

          case "commandNode":
            if (node.data?.command) {
              if (!this.startDialog) this.startDialog = node.data.command;
              if (node.data?.var_command)
                this.variables[node.data.var_command] = node.data.command;
              node.allowedNodes = findAllowedNodes(
                node.id,
                flow.nodes,
                flow.edges,
                ["botMessageNode"]
              );
            }
            break;

          case "leadNode":
            if (node.data?.tel && node.data?.var_tel) {
              this.variables[node.data.var_tel] = node.data.tel;
            }
            break;

          default:
            break;
        }
      }

      // console.log('startDialog: %o\r\nvariables: %o\r\nleadChat: %o\r\nnodes: %o', this.startDialog, this.variables, this.leadChat, this.flow.nodes);
    }
  }

  /**
   * @param {whatsapp.Message} message
   */
  async message(message) {
    try {
      const body = message.body;
      const contact = await message.getContact();
      const timestamp = new Date(message.timestamp * 1000);

      const flow = this.flow;

      if (flow && flow.nodes && flow.nodes.length > 0) {
        const command = flow.nodes.find((node) => body == node.data?.command);

        if (command) {

          if (this.userData) {
            this.userData.var_name &&
              (this.variables[this.userData.var_name] =
                contact.name || contact.pushname);
            this.userData.var_tel &&
              (this.variables[this.userData.var_tel] = contact.number);
            this.userData.var_lastcommand &&
              (this.variables[this.userData.var_lastcommand] = body);
            this.userData.var_datetime &&
              (this.variables[this.userData.var_datetime] =
                timestamp.toLocaleString("ru-Ru", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }));
          }

          const replyMessages = flow.nodes.filter((node) =>
            command.allowedNodes.includes(node.id)
          );

          for (const reply of replyMessages) {
            const data = replaceVariables(reply.data, this.variables);

            const recipientNumberId = await this.client.getNumberId(
              data.recipient
            );

            if (recipientNumberId?._serialized && data?.message)
              await this.client.sendMessage(
                recipientNumberId._serialized,
                data.message
              );
          }

          await LeadModel.updateOne({
                tel: contact.number
            }, {
                name: contact.name || contact.pushname,
                lastcommand: body
            }, {
                upsert: true
            });
          return;
        }
      }

      await this.client.sendMessage(
        message.from,
        "Неккоректный формат обращения." +
          (this.startDialog &&
            " Для начала диалога наберите команду " + this.startDialog)
      );
    } catch (error) {}
  }
}

export default CommandHandler.getInstance();

import FlowModel from "../../mongo/models/FlowModel.js";
import mongoConnect from "../../mongo/mongoConnect.js";
import CommandHandler from "../../whatsapp/handlers/CommandHandler.js";


export default class FlowController {
  static async save(req, res) {
    try {
      const flow = req.body;

      await mongoConnect();

      const existingFlow = await FlowModel.findOne({});

      if (existingFlow) {
        existingFlow.nodes = flow.nodes;
        existingFlow.edges = flow.edges;
        existingFlow.viewport = flow.viewport;

        await existingFlow.save();
      } else {
        await FlowModel.create(flow);
      }

      await CommandHandler.rebuild(flow);

      return res.status(200).send();
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  static async load(req, res) {
    try {

      await mongoConnect();

      const existingFlow = await FlowModel.findOne({});
      
      return res.status(200).json(existingFlow);

    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
}

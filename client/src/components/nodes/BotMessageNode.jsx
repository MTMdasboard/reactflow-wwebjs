import React, { useState } from "react";
import { Handle } from "reactflow";

const BotMessageNode = ({ id, data }) => {
  const [recipient, setRecipient] = useState(data.recipient);
  const [message, setMessage] = useState(data.message);

  const onChangeRecipient = (e) => {
    setRecipient(e.target.value);
    data.recipient = e.target.value;
  };

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
    data.message = e.target.value;
  };

  return (
    <div className="bot-message-node">
      <Handle type="target" position="top" style={{ background: "#555" }} />
      <div className="command-info form" style={{ width: '400px' }}>
        <p>Сообщение пользователю</p>
        <div className="form-item-row">
          <label>Получатель: </label>
          <input type="text" className="nodrag" value={recipient} onChange={onChangeRecipient} />
        </div>
        <div className="form-item-col">
          <label>Текст: </label>
          <textarea type="text" className="nodrag nowheel" rows={4} value={message} onChange={onChangeMessage} />
        </div>
      </div>
      <Handle type="source" position="bottom" style={{ background: "#555" }} />
    </div>
  );
};

export default BotMessageNode;

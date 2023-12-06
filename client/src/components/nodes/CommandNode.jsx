import React, { useState } from 'react';
import { Handle } from 'reactflow';

const CommandNode = ({ id, data }) => {
  
  const [command, setCommand] = useState(data.command);
  const [varCommand, setVarCommand] = useState(data.var_command);

  const onChangeCommand = (e) => {
    setCommand(e.target.value);
    data.command = e.target.value;
  };

  const onChangeVarCommand = (e) => {
    setVarCommand(e.target.value);
    data.var_command = e.target.value;
  };

  return (
    <div className="command-node">
      <Handle type="target" position="top" style={{ background: '#555' }} />
      <div className="command-info form">
        <p>Команда пользователя</p>
        <div className="form-item-row">
          <label>Текст: </label>
          <input type="text" className="nodrag" value={command} onChange={onChangeCommand} />
        </div>
        <div className="form-item-row">
          <label>Переменная: </label>
          <input type="text" className="nodrag" value={varCommand} onChange={onChangeVarCommand} />
        </div>
      </div>
      <Handle type="source" position="bottom" style={{ background: '#555' }} />
    </div>
  );
};

export default CommandNode;

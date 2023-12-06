import React, { useState } from "react";
import { Handle } from "reactflow";

const UserNode = ({ id, data }) => {
  const [varName, setVarName] = useState(data.var_name);
  const [varTel, setVarTel] = useState(data.var_tel);
  const [varLastCommand, setLastCommand] = useState(data.var_lastcommand);
  const [varDatetime, setDatetime] = useState(data.var_datetime);

  const onChangeVarName = (e) => {
    setVarName(e.target.value);
    data.var_name = e.target.value;
  };

  const onChangeVarTel = (e) => {
    setVarTel(e.target.value);
    data.var_tel = e.target.value;
  };

  const onChangeVarLastCommand = (e) => {
    setLastCommand(e.target.value);
    data.var_lastcommand = e.target.value;
  };

  const onChangeVarDatetime = (e) => {
    setDatetime(e.target.value);
    data.var_datetime = e.target.value;
  };

  return (
    <div className="user-node" >
      <svg className="svg-path" width="100" height="100">
        <line className="path" stroke="#4287f5" strokeWidth="10" strokeDasharray="5" x1="20" y1="0" x2="0" y2="0"/>
        <line className="path" stroke="#4287f5" strokeWidth="1" strokeDasharray="1" x1="20" y1="2.5" x2="0" y2="2.5"/>
      </svg>
      <div className="circle">
        <div className="inner-circle"></div>
      </div>
      <Handle type="source" position="bottom" />
      <div className="user-info form nodrag">
        <p>Пользователь</p>
        <div className="form-item-row">
          <label>Имя: </label>
          <input type="text" className="nodrag" value={varName} onChange={onChangeVarName} />
        </div>
        <div className="form-item-row">
          <label>Телефон: </label>
          <input type="text" className="nodrag" value={varTel} onChange={onChangeVarTel} />
        </div>

        <div className="form-item-row">
          <label>Комманда: </label>
          <input type="text" value={varLastCommand} onChange={onChangeVarLastCommand} />
        </div>
        <div className="form-item-row">
          <label>Время: </label>
          <input type="text" value={varDatetime} onChange={onChangeVarDatetime} />
        </div>

      </div>
    </div>
  );
};

export default UserNode;

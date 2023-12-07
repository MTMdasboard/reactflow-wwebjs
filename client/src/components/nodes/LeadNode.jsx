import React, { useState } from "react";
import { Handle } from "reactflow";

const LeadNode = ({ id, data }) => {
  const [tel, setTel] = useState(data.tel);
  const [varTel, setVarTel] = useState(data.var_tel);

  const onChangeTel = (e) => {
    setTel(e.target.value);
    data.tel = e.target.value;
  };

  const onChangeVarTel = (e) => {
    setVarTel(e.target.value);
    data.var_tel = e.target.value;
  };

  return (
    <div className="lead-node">
      <svg className="svg-path" width="100" height="100">
        <line className="path" stroke="rgb(31 41 55)" strokeWidth="10" strokeDasharray="5" x1="0" y1="0" x2="20" y2="0"/>
        <line className="path" stroke="rgb(31 41 55)" strokeWidth="1" strokeDasharray="1" x1="0" y1="2.5" x2="20" y2="2.5"/>
      </svg>
      <div className="circle">
        <div className="inner-circle"></div>
      </div>
      <Handle type="target" position="top" />
      <div className="lead-info form">
        <p>Лид</p>
        <div className="form-item-row">
          <label>Телефон: </label>
          <input type="text" className="nodrag" value={tel} onChange={onChangeTel} />
        </div>
        <div className="form-item-row">
          <label>Переменная: </label>
          <input type="text" className="nodrag" value={varTel} onChange={onChangeVarTel} />
        </div>
      </div>
    </div>
  );
};

export default LeadNode;

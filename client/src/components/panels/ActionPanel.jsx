import React, { useState, useEffect } from "react";
import { Panel } from "reactflow";

const ActionPanel = ({ id, data }) => {
  const onClick = async () => {
    try {
      await fetch(import.meta.env.VITE_SERVER_URL + "/flow/save", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.toObject()),
      });

      alert("Сохранено");
    } catch (error) {
      alert("Ошибка сохранения");
    }
  };

  return (
    <Panel position="top-left" className="panel">
      <button className="" onClick={onClick}>
        Сохранить
      </button>
    </Panel>
  );
};

export default ActionPanel;

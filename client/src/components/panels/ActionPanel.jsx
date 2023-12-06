import React from "react";
import { Panel } from 'reactflow';

const ActionPanel = ({ id, data }) => {

    const onClick = () => {
        const json = JSON.stringify(data.toObject());
        const flow = JSON.parse(json);
        console.log( flow );
    };

    return (
        <Panel position="top-left" className='panel'>
            <button className="" onClick={onClick} >
                Сохранить
            </button>
        </Panel>
    );
  };
  
  export default ActionPanel;
import React, { useState } from "react";
import ReactFlow, { Background, Controls, useEdgesState, useNodesState } from 'reactflow';
import BotMessageNode from '../nodes/BotMessageNode';
import CommandNode from '../nodes/CommandNode';
import LeadNode from '../nodes/LeadNode';
import UserNode from '../nodes/UserNode';
import ActionPanel from '../panels/ActionPanel';

const initialNodes = [
      {
        id: '1',
        type: 'userNode',
        position: { x: 322, y: 0 },
        data: { var_name: 'username', var_tel: 'userphone', var_lastcommand: 'lastcommand', var_datetime: 'datetime' },
      },
      {
        id: '2',
        type: 'commandNode',
        position: { x: 175, y: 165 },
        data: { command: '/консультация', var_command: 'consultation' },
      },
      {
        id: '3',
        type: 'botMessageNode',
        position: { x: 125, y: 285 },
        data: { recipient: '{userphone}', message: "Здравствуйте. Ваша заявка на консультацию принята. Как вам удобно переговорить устно или перепиской?"
        +"\r\nwa.me/7ХХХХХХХХХХ?text={callme}"
        +"\r\nwa.me/7ХХХХХХХХХХ?text={writeme}" },
      },
      {
        id: '4',
        type: 'commandNode',
        position: { x: 0, y: 480 },
        data: { command: '/позвонитемне', var_command: 'callme' },
      },
      {
        id: '5',
        type: 'commandNode',
        position: { x: 350, y: 480 },
        data: { command: '/напишитемне', var_command: 'writeme' },
      },
      {
        id: '6',
        type: 'botMessageNode',
        position: { x: 125, y: 605 },
        data: { recipient: '{userphone}', message: "Ок. Первый освободившийся менеджер сразу же с вами свяжется. Спасибо за обращение." },
      },
      {
        id: '7',
        type: 'botMessageNode',
        position: { x: 125, y: 800 },
        data: { recipient: '{leadphone}', message: "{username}, {userphone} оставил заявку на получение консультации {lastcommand}. {datetime}. Необходимо с ним связаться." },
      },
      {
        id: '8',
        type: 'leadNode',
        position: { x: 322, y: 1050 },
        data: { tel: '77007007070', var_tel: 'leadphone' },
      },
    ];

const nodeTypes = { 
    userNode: UserNode,
    commandNode: CommandNode,
    botMessageNode: BotMessageNode,
    leadNode: LeadNode,
};

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e3-5', source: '3', target: '5', animated: true },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e7-8', source: '7', target: '8' },
];

const LayoutFlow = ({data}) => {
    const [rfInstance, setRfInstance] = useState(null);
  
    return (
      <ReactFlow
        nodes={data.nodes ? data.nodes : initialNodes}
        edges={data.edges ? data.edges : initialEdges}
        nodeTypes={nodeTypes}
        nodesConnectable={false}
        onInit={setRfInstance}
        fitView
      >
        <Controls />
        <Background className='background'/>
        <ActionPanel data={rfInstance}/>
      </ReactFlow>
    );
  };

export default LayoutFlow;

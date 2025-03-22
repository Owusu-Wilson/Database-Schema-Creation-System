import React, { useCallback } from 'react'
import { useAuth } from '@/context/AuthContext'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 

 
export default function OutputSection() {
  const { user } = useAuth();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <div className="text-center transform transition-all duration-700 translate-y-0 opacity-100">
        <h1 className="text-xl font-medium mb-2 text-black">
          Entity Relation Diagram
        </h1>
       
        <div style={{ width: '60vw', height: '40vh' }} className='border border-gray-400 bg-slate-100 rounded-md p-3 shadow-md'>
        <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
        </div>
      </div>
    </div>
  );
}

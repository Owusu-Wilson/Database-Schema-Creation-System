import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

type OutputSectionProps = {
  content?: string; // JSON string input
  type: 'entities-only' | 'entities-attributes' | 'entities-attributes-relationships';
};

const OutputSection: React.FC<OutputSectionProps> = ({ content, type }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  // Handle connecting nodes automatically
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Function to parse JSON content and generate nodes/edges
  const parseContent = (content: string) => {
    try {
      const data = JSON.parse(content);

      switch (type) {
        case 'entities-only':
          handleEntitiesOnly(data);
          break;
        case 'entities-attributes':
          handleEntitiesWithAttributes(data);
          break;
        case 'entities-attributes-relationships':
          handleEntitiesWithAttributesAndRelationships(data);
          break;
        default:
          console.error('Invalid type specified');
      }
    } catch (error) {
      console.error('Failed to parse JSON content:', error);
    }
  };

  // Handle entities-only input
  const handleEntitiesOnly = (entities: string[]) => {
    const newNodes: Node[] = entities.map((entity, index) => ({
      id: `${index + 1}`,
      position: { x: 100 + index * 150, y: 100 },
      data: { label: entity },
    }));

    setNodes(newNodes);
    setEdges([]); // No edges for entities-only
  };

  // Handle entities + attributes input
  const handleEntitiesWithAttributes = (data: { [entity: string]: string[] }) => {
    const newNodes: Node[] = Object.entries(data).map(([entity, attributes], index) => ({
      id: `${index + 1}`,
      position: { x: 100 + index * 200, y: 100 },
      data: { label: `${entity}\n${attributes.join('\n')}` }, // Display entity and attributes
    }));

    setNodes(newNodes);
    setEdges([]); // No edges for entities + attributes
  };

  // Handle entities + attributes + relationships input
  const handleEntitiesWithAttributesAndRelationships = (data: {
    entities: { [entity: string]: string[] };
    relationships: { from: string; to: string }[];
  }) => {
    const { entities, relationships } = data;

    // Create nodes for entities and attributes
    const newNodes: Node[] = Object.entries(entities).map(([entity, attributes], index) => ({
      id: entity,
      position: { x: 100 + index * 200, y: 100 },
      data: { label: `${entity}\n${attributes.join('\n')}` }, // Display entity and attributes
    }));

    // Create edges for relationships
    const newEdges: Edge[] = relationships.map((rel, index) => ({
      id: `e${rel.from}-${rel.to}`,
      source: rel.from,
      target: rel.to,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  };

  useEffect(() => {
    if (content) {
      parseContent(content);
    }
  }, [content, type]);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-4">
      {/* Diagram Container */}
      <div
        style={{ width: '60vw', height: '35vh' }}
        className="border border-gray-300 bg-slate-50 rounded-md p-3 shadow-md"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default OutputSection;
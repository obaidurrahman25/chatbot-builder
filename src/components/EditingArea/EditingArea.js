import React, { useCallback, useState, useMemo } from 'react';
import './EditingArea.scss';
import ReactFlow, { Handle, MiniMap, Controls, Background, applyNodeChanges, applyEdgeChanges, useNodesState, useEdgesState, addEdge, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import TextNode from '../CustomNodes/TextNode/TextNode';
import { v4 as uuidv4 } from 'uuid';

function EditingArea() {

  const generateUniqueId = () => {
    return uuidv4();
  };

  const initialNodes = [
    {
      id: '1',
      type: 'textNode',
      data: { label: 'Input Node', value: 'First node', placeholder: 'Enter your text here' },
      position: { x: 250, y: 25 },
    },
  
    {
      id: '2',
      type: 'textNode',
      // you can also pass a React component as a label
      data: { label: 'Input Node', value: 'Default node', placeholder: 'Enter your text here' },
      position: { x: 100, y: 125 },
    },
    {
      id: '3',
      type: 'textNode',
      data: {  label: 'Input Node', value: 'Output node', placeholder: 'Enter your text here'  },
      position: { x: 250, y: 250 },
    },
  ];
  
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const updateNode = (id, newValue) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, value: newValue } } : node
      )
    );
  }

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: generateUniqueId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const nodeTypes = useMemo(() => ({ textNode: (props) => <TextNode {...props} updateNode={updateNode} /> }), []);

  return (
    <div className="editing-area-container">
      <ReactFlow 
        nodes={nodes} 
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        fitView
        onDrop={onDrop}
        onDragOver={onDragOver}>
          <MiniMap />
          <Controls />
          <Background />
      </ReactFlow>
    </div>
  );
}

export default EditingArea;

import React, { useCallback, useState, useMemo, useContext } from 'react';
import './EditingArea.scss';
import ReactFlow, { Handle, MiniMap, Controls, Background, applyNodeChanges, applyEdgeChanges, useNodesState, useEdgesState, addEdge, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import TextNode from '../CustomNodes/TextNode/TextNode';
import { v4 as uuidv4 } from 'uuid';
import Context from './../../Context';

function EditingArea(props) {

  const { contextData, setContextData } = useContext(Context);

  const generateUniqueId = () => {
    return uuidv4();
  };

  /* const [nodes, setNodes] = useState(props.nodes);
  const [edges, setEdges] = useState(props.edges); */
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onNodesChange = useCallback(
    (changes) => props.setNodes((nodes) => applyNodeChanges(changes, nodes)),
    [props.setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => props.setEdges((eds) => applyEdgeChanges(changes, eds)),
    [props.setEdges]
  );

  const onConnect = useCallback(
    (params) => {
      const { source, sourceHandle } = params;
      const existingEdges = props.edges.filter(edge => edge.source === source);

      if (existingEdges.length === 0) {
        props.setEdges((eds) => addEdge(params, eds));
      }
      else {props.setAlertData('warning', 'Only one edge can originate from one source node.');}
    },
    [props.edges]
  );

  const handleNodeClick = (event, node) => {
    setContextData({ ...contextData, selectedNode: node });
    props.setSelectedNode(node);
  };

  const onPaneClick = (event) => {
    setContextData({ ...contextData, selectedNode: null });
    props.setSelectedNode(null);
  };

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

      props.setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const nodeTypes = useMemo(() => ({ textNode: (nodeProps) => <TextNode {...nodeProps} updateNode={props.updateNode} /> }), []);

  return (
    <div className="editing-area-container">
      <ReactFlow 
        nodes={props.nodes} 
        edges={props.edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={handleNodeClick}
        onPaneClick={onPaneClick}>
          <MiniMap />
          <Controls />
          <Background />
      </ReactFlow>
    </div>
  );
}

export default EditingArea;

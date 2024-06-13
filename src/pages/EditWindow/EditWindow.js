import React, { useCallback, useState, useEffect } from 'react';
import './EditWindow.scss';
import Header from './../../components/Header/Header';
import Sidebar from './../../components/Sidebar/Sidebar';
import EditingArea from './../../components/EditingArea/EditingArea';
import SettingsWindow from './../../components/SettingsWindow/SettingsWindow';
import { hasMoreThanOneNodeWithoutAncestors } from '../../common/utils';
import Alert from '@mui/material/Alert';

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

function EditWindow() {

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const updateNode = (id, newValue) => {
    setNodes((prevNodes) => {
      let updatedNodes = prevNodes?.map((node) => {
        if(node.id === id) setSelectedNode({ ...node, data: { ...node.data, value: newValue } });
        return node.id === id ? { ...node, data: { ...node.data, value: newValue } } : node;
      });
      return updatedNodes;
    });
  }

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000); // Hide after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const setAlertData = (type, message) => {
      setShowAlert(true);
      setAlertType(type);
      setAlertMessage(message)
  }

  const onSaveClick = () => {
    if(hasMoreThanOneNodeWithoutAncestors(nodes,edges)) {
      //show error
      setAlertData('error', 'Could not save the changes. There are more than one origin nodes.');
    }
  }

  return (
    <div className="edit-window-container">
      <Header onSaveClick={onSaveClick}/>
      {showAlert && <Alert className='error-alert' variant='filled' severity={alertType}>{alertMessage}</Alert>}
      <div className='page-content'>
        <Sidebar/>
        <EditingArea
          nodes={nodes}
          edges={edges}
          selectedNode={selectedNode}
          setNodes={setNodes}
          setEdges={setEdges}
          setSelectedNode={setSelectedNode}
          updateNode={updateNode}
          setAlertData={setAlertData}
        />
        <SettingsWindow
          nodes={nodes}
          edges={edges}
          selectedNode={selectedNode}
          setNodes={setNodes}
          setEdges={setEdges}
          setSelectedNode={setSelectedNode}
          updateNode={updateNode}
        />
      </div>
    </div>
  );
}

export default EditWindow;

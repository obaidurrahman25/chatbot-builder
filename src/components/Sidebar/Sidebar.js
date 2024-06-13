import React from 'react';
import './Sidebar.scss';

function Sidebar() {

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const TextNodeTemplate = () => {
    return (
      <div className='textnode-template' onDragStart={(event) => onDragStart(event, 'textNode')} draggable>
            {'Text message node'}
      </div>
    );
  }

  return (
    <div className="sidebar-container">
      {TextNodeTemplate()}
    </div>
  );
}

export default Sidebar;

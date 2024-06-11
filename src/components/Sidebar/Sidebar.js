import React, { useCallback } from 'react';
import './Sidebar.scss';
import TextNode from '../CustomNodes/TextNode/TextNode';

function Sidebar() {

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const TextNodeTemplate = () => {
    return (
      <div className='textnode-template' onDragStart={(event) => onDragStart(event, 'textNode')} draggable>
            {'Text node'}
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

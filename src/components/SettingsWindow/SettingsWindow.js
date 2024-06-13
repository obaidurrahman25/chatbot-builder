import React from 'react';
import './SettingsWindow.scss';
import TextField from '../../common/CommonComponents/TextField/TextField';

function SettingsWindow(props) {

  const handleOnChange = (event) => {
    props.updateNode(props.selectedNode.id, event.target.value);
    console.log("Printing selected node ", props.selectedNode.id, event.target.value);
  }

  return (
    <div className="settings-window-container">
      
      <div className='tabs-container'>
        <div className='tabs'>
          Properties
        </div>
      </div>

      {props.selectedNode && <div className='grid-container'>
          <div className='grid-item text-property'>
            <TextField onChange={handleOnChange} value={props.selectedNode?.data?.value ? props.selectedNode?.data?.value : ''}/>
          </div>
          <div className='grid-item'></div>
          <div className='grid-item'></div>
          <div className='grid-item'></div>
          <div className='grid-item'></div>
          <div className='grid-item'></div>
          <div className='grid-item'></div>
      </div>}

    </div>
  );
}

export default SettingsWindow;

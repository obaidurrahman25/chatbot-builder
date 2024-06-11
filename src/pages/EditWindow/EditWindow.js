import React, { useCallback } from 'react';
import './EditWindow.scss';
import Header from './../../components/Header/Header';
import Sidebar from './../../components/Sidebar/Sidebar';
import EditingArea from './../../components/EditingArea/EditingArea';
import SettingsWindow from './../../components/SettingsWindow/SettingsWindow';


function EditWindow() {

  return (
    <div className="edit-window-container">
      <Header/>
      <div className='page-content'>
        <Sidebar/>
        <EditingArea/>
        <SettingsWindow/>
      </div>
    </div>
  );
}

export default EditWindow;

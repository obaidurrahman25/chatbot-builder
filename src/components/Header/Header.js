import React from 'react';
import './Header.scss';

function Header(props) {

  return (
    <div className="header-container">
      <div className="app-title">ChatBot Builder</div>
      <button className='save-button' onClick={props.onSaveClick}>Save changes</button>
    </div>
  );
}

export default Header;

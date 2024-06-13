import React, { useCallback, useState } from 'react';
import './TextField.scss';

function TextField (props) {

    return (
        <div className='textfield-container'>
            <span>Text message</span>
            <input className='textfield' placeholder={props.data?.placeholder} rows={2} onChange={props.onChange} value={props.value}/>
        </div>
    );
}
export default TextField;
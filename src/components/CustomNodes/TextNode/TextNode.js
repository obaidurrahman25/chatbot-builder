import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

function TextNode (props) {

    const [inputValue, setInputValue] = useState(props.data?.value ? props.data?.value : '');

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
        setInputValue(evt.target.value);
        props.updateNode(props.id, evt.target.value);
    }, []);

    return (
        <div className='textnode-container' style={{ padding: 10, border: '1px solid #000000', borderRadius: 5, backgroundColor: 'white' }}>
            <Handle type="target" position={Position.Top} />
            <textarea className='nodrag' placeholder={props.data?.placeholder} rows={2} onChange={onChange} value={inputValue} style={{border: '0px', outline: 'none', resize: 'none', overflow: 'hidden', display:'flex', textAlign: 'center' }}/>
            <Handle type="source" position={Position.Bottom} id="a" />
        </div>
    );
}
export default TextNode;
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import './TextNode.scss'

function TextNode (props) {

    const onChange = useCallback((evt) => {
        props.updateNode(props.id, evt.target.value);
    }, []);

    return (
        <div className='textnode-container' style={{ padding: 0, border: '1px solid #000000', borderRadius: 5, backgroundColor: 'white' }}>
            <div className='node-title'>Text message</div>
            <Handle type="target" position={Position.Top} />
            <textarea className='nodrag' placeholder={props.data?.placeholder} rows={2} onChange={onChange} value={props.data?.value ? props.data?.value : ''} style={{fontSize: '11px', margin: '3px', borderRadius: 5, border: '0px', outline: 'none', resize: 'none', overflow: 'hidden', display:'flex', textAlign: 'center' }}/>
            <Handle type="source" position={Position.Bottom} id="a" />
        </div>
    );
}
export default TextNode;
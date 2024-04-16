import React from 'react';
import cs from './Modal.module.css'
const Modal = ({visible, setVisible, children}) => {
    const className = [cs.overlay]
    if (visible) {
        className.push([cs.overlay_visible])
    }
    return (
        <div className={className.join(" ")} onClick={()=>{setVisible(false)}}>
            <div className={cs.modal} onClick={(e)=>{e.stopPropagation()}}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
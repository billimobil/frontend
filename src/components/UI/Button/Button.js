import React from 'react';
import cs from './Button.module.css'
const Button = ({onClick, type, ...props}) => {
    return (
        <button type={type} onClick={onClick} className={cs.button}>
            {props.children}
        </button>
    );
};

export default Button;
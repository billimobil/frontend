import React from 'react';
import cs from "./Input.module.css"
const Input = ({value, setValue, placeholder, ...props}) => {
    return (
        <input className={cs.input} style={{background: "white"}} type="text" placeholder={placeholder} value={value} onChange={event => setValue(event.target.value)} {...props}/>
    );
};

export default Input;
import React from 'react';
import cs from './Select.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const Select = ({options, value, setValue}) => {
    return (
        <div className={cs.filter}>
            <i className={["fa-solid", "fa-sliders", cs.filter__icon].join(" ")}/>
            <select onChange={(e)=>{setValue(e.target.value)}} className={cs.filter__dropdown}>
                {options.map(option=>
                    <option value={option.value} key={option.value}>{option.name}</option>
                )}
            </select>
            <i className={["fa-solid", "fa-caret-down", cs.filter__icon, cs.filter__icon_right].join(" ")}/>
        </div>
    );
};

export default Select;
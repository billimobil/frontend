import React, {useEffect, useState} from 'react';
import cs from "./Experts.module.css"
import axios from "axios";

const Experts = () => {
    const [experts, setExperts] = useState([])
    const [error, setError] = useState('')
    useEffect(()=>{
        axios.get("http://localhost:81/api/v1/getExperts").then(response=>{
            setExperts(response.data.data)
            console.log(JSON.stringify(response.data.data))
        }).catch(err=>{
            setError(err)
        })
    }, [])
    return (
        <div className={cs.wrapper}>
            <h1 className={cs.title}>Эксперты</h1>
            <div className={cs.experts}>
                {
                    experts ?
                    experts.map(elem=>(
                        <div className={cs.expert}>
                            <p>{elem.first_name} {elem.last_name}</p>
                            <p>{elem.group}</p>
                            <p>ISU:{elem.isu}</p>
                        </div>
                    ))
                    : <></>
                }
            </div>
        </div>
    );
};

export default Experts;
import React, {useEffect, useState} from 'react';
import cs from "./Experts.module.css"
import axios from "axios";

const Experts = () => {
    const [experts, setExperts] = useState([])
    const [error, setError] = useState('')
    useEffect(()=>{
        axios.get("http://188.225.74.17:8080/api/v1/getExperts").then(response=>{
            setExperts(response.data.data)
            console.log(JSON.stringify(response.data.data))
        }).catch(err=>{
            setError(err)
        })
    }, [])
    return (
        <div className={cs.wrapper}>
            <h1 className={cs.title}>Эксперты</h1>
            {error
                ? <div className="error">{error}</div>
                : <></>
            }
            <div className={cs.experts}>
                {
                    experts ?
                    experts.map((elem, index)=>(
                        <div key={index} className={cs.expert}>
                            <div className={cs.expert__child} style={{display: "flex"}}>
                                <img className={elem.male ? cs.expert__child__avatar + " " + cs.blue : cs.expert__child__avatar + " " + cs.pink} alt={`${elem.first_name} ${elem.last_name}`} src={"http://188.225.74.17:8080"+elem.avatar_url}/>
                                <p className={cs.expert__child__name}>{elem.first_name} {elem.last_name}</p>
                            </div>
                            <p className={cs.expert__child}>{elem.group}</p>
                            <p className={cs.expert__child}>ISU:{elem.isu}</p>
                        </div>
                    ))
                    : <></>
                }
            </div>
        </div>
    );
};

export default Experts;
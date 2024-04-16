import React, {useCallback, useEffect, useState} from 'react';
import cs from './PVK.module.css'
import Button from "../components/UI/Button/Button";
import axios from "axios";
import {useParams} from "react-router-dom";
const Pvk = () => {
    const {id} = useParams()
    const [profession, setProfession] = useState()
    const [pvk, setPVK] = useState({})
    const [error, setError] = useState('')
    const [clicked, setClicked] = useState([])

    useEffect(()=>{
        axios.get("http://188.225.74.17:8080/api/v1/getProfession", {
            params: {
                id: id,
            }
        }).then(resp=>{
            setProfession(resp.data.data)
        }).catch(e=>{
            setError(e.response.data.error)
        })

        axios.get("http://188.225.74.17:8080/api/v1/getPVKList").then(response=>{
            setPVK(response.data.data)
        }).catch(err=>{
            setError(err)
        })
    }, [])

    function clickPvk(event, key) {
        console.log(event.target.style.background, key)
        if (event.target.style.background !== "") { // colored
            setClicked(clicked.filter(v => v !== key))
            event.target.style.background = ""
            return
        }
        if (clicked.length === 10) {
            return;
        }
        setClicked([...clicked, key])

        pvk.sort(function(x,y){ return x.id === key ? -1 : y.id === key ? 1 : 0; });
        setPVK(pvk)
        console.log(pvk)
        event.target.style.background = 'red'
    }

    return (
        <div className={cs.wrapper}>
            {profession ?
            <>
                <div className={cs.head}>
                    <h2>{profession.name}</h2>
                    <p>Распределите ПВК по степени значимости по вашему мнению</p>
                </div>

                {
                    error ?
                        <div className="error">
                            {error}
                        </div>
                        : <></>
                }
                {
                    pvk.map(elem=>(
                        <a key={elem.id} onClick={(e)=>{
                            clickPvk(e, elem.id)
                        }}>
                            <div className={cs.pvk}>
                                <p className={cs.pvk__name + " " + cs.border}>
                                    {elem.name}
                                </p>
                            </div>
                        </a>
                    ))
                }
                <Button>
                    Сохранить результат
                </Button>
            </>
            :
            <></>
            }
        </div>
    );
};

export default Pvk;
import React, { useEffect, useState } from 'react';
import cs from './PVK.module.css';
import Button from '../../components/UI/Button/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import profession from "../Profession/Profession";

const Pvk = ({user}) => {
    const [response, setResponse] = useState()
    const [error, setError] = useState('')
    useEffect(()=>{
        axios.get("http://188.225.74.17:8080/api/v1/getPVKList", {
            params: {
                session_token: user.session_token,
            }
        }).then(resp=>{
            console.log(resp.data.data)
            setResponse(resp.data.data)
        }).catch(e=>{
            setError(e.response.data.error)
        })
    }, [])

    return (
        <div className={cs.wrapper}>
            {error ? (
                <div className="error">{error}</div>
            ) : <></>
            }
            <h1 className={cs.head}>Результаты вашего тестирования</h1>
            {
                response ?
                    <>
                        <div className={cs.match}>
                            {
                                Object.entries(response.professions_match).map(([profession, score]) => (
                                    <div className={cs.match__block}>
                                        <div className={cs.match__block__item}>Ваша совместимость с профессией: {profession}</div>
                                        <b><div className={cs.match__block__item}>{score}%</div></b>
                                    </div>
                                ))
                            }
                        </div>

                        <div className={cs.pvk__block}>
                            {
                                Object.entries(response.pvk_match).map(([profession, score]) => (
                                    <div className={cs.pvk}>
                                        <p className={`${cs.pvk__name} ${cs.border}`}>{profession}</p>
                                        <p>{score}%</p>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                    :
                    <></>
            }

        </div>
    );
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Pvk;

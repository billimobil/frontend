import React, {useCallback, useEffect, useState} from 'react';
import cs from './Profession.module.css'
import {useParams} from "react-router-dom";
import img1 from "../../assets/images/1.jpg";
import axios from "axios";
import Input from "../../components/UI/Input/Input";
const Profession = () => {
    const {id} = useParams()
    const [profession, setProfession] = useState()
    const [error, setError] = useState('')
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
    }, [])


    return (
        <div className={cs.wrapper}>
            {
                error ? <div className="error">{error}</div> : <></>
            }

            {
                profession ?
                    <>
                        <img className={cs.profession__pic} alt={"image"} src={img1}/>
                        <div className={cs.left}>
                            <h1>{profession.name}</h1>
                            <p>Вы подходите этой профессии на {profession.your_match}%</p>
                            <p>{profession.description}</p>
                            <h3>Профессионально важные качества по убыванию степени важности</h3>
                            <div className={cs.pvk__block}>
                                {
                                    profession.attached_pvk.map(elem=>
                                        <div key={elem.id} className={cs.pvk__item}>
                                            <p>{elem.name}</p>
                                            <Input className={cs.pvk__item__input} value={getRandomInt(1, 10)}/>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </>
                    : <></>
            }

        </div>
    );
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Profession;
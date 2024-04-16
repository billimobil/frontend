import React, {useCallback, useEffect, useState} from 'react';
import cs from './Profession.module.css'
import {useParams} from "react-router-dom";
import img1 from "../assets/images/1.jpg";
import axios from "axios";
const Profession = () => {
    const {id} = useParams()
    const [profession, setProfession] = useState()
    const [error, setError] = useState('')
    useEffect(()=>{
       axios.get("http://localhost:81/api/v1/getProfession", {
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
                error
                ?
                <div className="error">{error}</div>
                :
                <>
                    {
                        profession ?
                            <>
                                <img className={cs.profession__pic} alt={"image"} src={img1}/>
                                <div className={cs.left}>
                                    <h1>{profession.name}</h1>
                                    <p>{profession.description}</p>
                                    <h3>Профессионально важные качества по убыванию степени важности</h3>
                                    <div className={cs.pvk__block}>
                                        {
                                            profession.attached_pvk.map(elem=>
                                                <p key={elem.id} className={cs.pvk__item}>{elem.name}</p>
                                            )
                                        }
                                    </div>
                                </div>
                            </>
                            : <></>
                    }

                </>
            }

        </div>
    );
};

export default Profession;
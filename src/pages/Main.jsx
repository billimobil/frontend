import img1 from "../assets/images/1.jpg"
import React, {useCallback, useEffect, useId, useState} from 'react';
import cs from './Main.module.css'
import axios from "axios";
import Button from "../components/UI/Button/Button";
import {NavLink, useNavigate} from "react-router-dom";

const Main = ({user}) => {
    const navigate = useNavigate();
    const [professions, setProfessions] = useState([])
    const [error, setError] = useState('')
    useEffect(()=>{
        axios.get("http://188.225.74.17:8080/api/v1/getProfessions", {
            params: {
                session_token: user.session_token,
            }
        }).then(response=>{
            setProfessions(response.data.data)
            console.log(professions)
        }).catch(err=>setError(error.response.data.error))
    }, [])

    return (
        <div className={cs.wrapper}>
            <h1>Профессии</h1>
            {
                error ?
                    <div className="error">{error}</div>
                    : <></>
            }
            <div className={cs.professions}>
                {professions.map(elem=>(
                    <NavLink to={`/professions/`+elem.id}>
                        <div className={cs.profession}>
                            <h2>{elem.name}</h2>
                                <p>{elem.description}</p>
                                <img src={img1}/>
                        </div>
                    </NavLink>
                ))}
            </div>
            <Button onClick={()=>{
                navigate("/addProfession")
            }}>Добавить профессию</Button>
        </div>
    );
};

export default Main;
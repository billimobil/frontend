import img1 from "../../assets/images/1.jpg"
import React, {useCallback, useEffect, useId, useState} from 'react';
import cs from './Main.module.css'
import axios from "axios";
import Button from "../../components/UI/Button/Button";
import {NavLink, useNavigate} from "react-router-dom";

const Main = ({user}) => {
    const navigate = useNavigate();
    const [professions, setProfessions] = useState([])
    const [error, setError] = useState('')
    useEffect(()=>{
        axios.get("http://188.225.74.17:8080/api/v1/getProfessions").then(response=>{
            setProfessions(response.data.data)
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
                    <>
                        <NavLink to={`/professions/`+elem.id}>
                            <div className={cs.profession}>
                                <h2 className={cs.profession__child}>{elem.name}</h2>
                                <p className={cs.profession__child}>{elem.description}</p>
                                <img className={cs.profession__child} src={"http://188.225.74.17:8080" + elem.photo_url}/>
                            </div></NavLink>
                        <NavLink to={"/updateProfession/"+elem.id}><Button>Редактировать</Button></NavLink>
                    </>
                ))}
            </div>
            <Button onClick={()=>{
                navigate("/addProfession")
            }}>Добавить профессию</Button>
        </div>
    );
};

export default Main;

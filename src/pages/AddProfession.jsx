import React, {useState} from 'react';
import cs from './AddProfession.module.css'
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const AddProfession = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    function submit(e) {
        axios.get("http://localhost:81/api/v1/createProfession", {
            params: {
                name: name,
                description: description
            }
        }).then(response=>{
            if (response.data.ok !== true) {
                setError(response.data.error)
            }
            navigate("/")
        }).catch(error=>{
            setError(error.response.data.error)
        })
    }
    return (
        <div className={cs.wrapper}>
            <h1>Добавление профессии</h1>
            {
                error ?
                    <div className="error">{error}</div>
                    : <></>
            }
            <p>Название профессии</p>
            <Input value={name} setValue={setName}/>
            <p>Описание профессии</p>
            <Input value={description} setValue={setDescription}/>
            <Button type="submit" onClick={submit}>Добавить</Button>
        </div>
    );
};

export default AddProfession;
import React, {useState} from 'react';
import cs from "./Registration.module.css"
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const Registration = ({setUser}) => {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [group, setGroup] = useState("")
    const [isu, setISU] = useState("")
    const navigate = useNavigate();

    const [error, setError] = useState('')

    function register(event) {
        event.preventDefault()
        axios.get("http://188.225.74.17:8080/api/v1/register", {
            params: {
                "email": email,
                "password": password,
                "first_name": name,
                "last_name": surname,
                "group": group,
                "isu": isu,
            }
        }).then(response=>{
            setError('')
            setUser({
                'email': response.data.email,
                'id': response.data.id,
                'first_name': response.data.first_name,
                'last_name': response.data.last_name,
                'session_token': response.data.session_token
            })
            navigate("/")
            console.log(response)
        }).catch(error=>{
            setError(error.response.data.error)
        })
    }

    return (
        <div className={cs.wrapper}>
            <h2>РЕГИСТРАЦИЯ</h2>
            {
                error ?
                    <div className="error">{error}</div>
                : <></>
            }

            <form onSubmit={register} className={cs.inputBlock}>
                <Input name={"Имя"} type="text" value={name} setValue={setName} required={true} placeholder="Имя"/>
                <Input type="text" value={surname} setValue={setSurname} required={true} placeholder="Фамилия"/>
                <Input type="text" value={isu} setValue={setISU} required={true} placeholder="ИСУ"/>
                <Input type="text" value={group} setValue={setGroup} required={true} placeholder="Группа, Р3120"/>
                <Input type="text" value={email} setValue={setEmail} required={true} placeholder="Email"/>
                <Input type="text" value={password} setValue={setPassword} required={true} placeholder="Пароль"/>
                <Button type="submit" onClick={register}>
                    <p className={cs.buttonText}>Зарегистрироваться</p>
                </Button>
            </form>
        </div>
    );
};

export default Registration;
import React, {useState} from 'react';
import cs from "./Login.module.css"
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const Login = ({setUser}) => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')

    function login(event) {
        event.preventDefault()
        axios.get("http://188.225.74.17:8080/api/v1/login", {
            params: {
                "email": email,
                "password": password,
            }
        }).then(response=>{
            setError('')
            setUser(response.data)
            navigate("/")
            console.log(response)
        }).catch(error=>{
            setError(error.response.data.error)
        })
    }

    return (
        <div className={cs.wrapper}>
            <h2>ВХОД</h2>
            <div className={cs.inputBlock}>
                {
                    error ?
                        <div className="error">{error}</div>
                    : <></>
                }
                <Input type="email" value={email} setValue={setEmail} placeholder="Email"/>
                <Input type="password" value={password} setValue={setPassword} placeholder="Пароль"/>
                <Button onClick={login}>
                    <p className={cs.buttonText}>Войти</p>
                </Button>
            </div>
        </div>
    );
};

export default Login;
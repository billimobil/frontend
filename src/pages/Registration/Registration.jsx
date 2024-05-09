import React, {useState} from 'react';
import cs from "./Registration.module.css"
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import RadioButton from "../../components/UI/RadioButton/RadioButton";
const Registration = ({setUser}) => {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [group, setGroup] = useState("")
    const [birthYear, setBirthYear] = useState()
    const [isu, setISU] = useState("")
    const navigate = useNavigate();
    const [sex, setSex] = useState({ male: false, female: false })


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
                "birth_year": birthYear,
                "male": sex.male,
            }
        }).then(response=>{
            setError('')
            setUser({
                'email': response.data.email,
                'id': response.data.id,
                'first_name': response.data.first_name,
                'last_name': response.data.last_name,
                'session_token': response.data.session_token,
                'birth_year': response.data.birth_year,
                'male': response.data.male,
            })
            navigate("/")
            console.log(response)
        }).catch(error=>{
            setError(error.response.data.error)
        })
    }

    function handleChange(e) {
        const {name} = e.target;
        if (name === "male") {
            setSex({ male: true, female: false })
        } else {
            setSex({ male: false, female: true })
        }
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
                <Input type="number" value={isu} setValue={setISU} required={true} placeholder="ИСУ"/>
                <Input type="number" value={birthYear} setValue={setBirthYear} required={true} placeholder="Год рождения"/>
                <Input type="text" value={group} setValue={setGroup} required={true} placeholder="Группа, Р3120"/>
                <Input type="email" value={email} setValue={setEmail} required={true} placeholder="Email"/>
                <Input type="password" value={password} setValue={setPassword} required={true} placeholder="Пароль"/>

                Ваш пол:
                <RadioButton name="male" id="male" value="male" onChange={handleChange} checked={sex.male} text="мужской"/>
                <RadioButton name="female" id="female" value="female" onChange={handleChange} checked={sex.female} text="женский"/>
                {/*<label className="form-control">*/}
                {/*    <input type="radio" name="male" id="male" value="male" onChange={handleChange}/>*/}
                {/*    мужской*/}
                {/*</label>*/}
                {/*<label className="form-control">*/}
                {/*    <input type="radio" name="sex" id="sex" value="female" onChange={handleChange}/>*/}
                {/*    женский*/}
                {/*</label>*/}
                <Button type="submit" onClick={register}>
                    <p className={cs.buttonText}>Зарегистрироваться</p>
                </Button>
            </form>
        </div>
    );
};

export default Registration;
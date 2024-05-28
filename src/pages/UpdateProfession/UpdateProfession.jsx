import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from "../../components/UI/Button/Button";
import axios from "axios";
import cs from './UpdateProfession.module.css';
import Input from "../../components/UI/Input/Input";

const UpdateProfession = ({ user }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedProfession, setSelectedProfession] = useState('');
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        axios.get("http://188.225.74.17:8080/api/v1/getProfessions")
            .then(response => {
                setProfessions(response.data.data);
            })
            .catch(error => {
                setError(error.response.data.error);
            });
    }, []);

    function submit() {
        if (!selectedProfession) {
            setError("Пожалуйста, выберите профессию");
            return;
        }

        axios.get(`http://188.225.74.17:8080/api/v1/updateProfession`, {
            params: {
                id: selectedProfession, // используем выбранную профессию
                name: name,
                description: description,
                session_token: user.session_token,
            }
        })
            .then(response => {
                if (response.data.ok !== true) {
                    setError(response.data.error);
                    return;
                }
                navigate("/");
            })
            .catch(error => {
                setError(error.response.data.error);
            });
    }

    function deleteProfession() {
        if (!selectedProfession) {
            setError("Пожалуйста, выберите профессию");
            return;
        }

        axios.get(`http://188.225.74.17:8080/api/v1/deleteProfession`, {
            params: {
                id: selectedProfession, // используем выбранную профессию
                session_token: user.session_token,
            }
        })
            .then(response => {
                if (response.data.ok !== true) {
                    setError(response.data.error);
                    return;
                }
                navigate("/");
            })
            .catch(error => {
                setError(error.response.data.error);
            });
    }


    return (
        <div className={cs.wrapper}>
            <h1 className={cs.title}>Редактирование профессии</h1>
            {error && <div className={cs.error}>{error}</div>}
            <p>Выберите профессию</p>
            <select
                value={selectedProfession}
                onChange={(e) => setSelectedProfession(e.target.value)}
                className={cs.selectProfession}
            >
                <option value="">профессия</option>
                {professions.map(profession => (
                    <option key={profession.id} value={profession.id}>{profession.name}</option>
                ))}
            </select>
            <p>Изменить название профессии</p>
            <Input value={name} setValue={setName} />
            <p>Изменить описание профессии</p>
            <Input value={description} setValue={setDescription} />

            <div className={cs.buttonContainer}>
                <Button type="button" onClick={submit} className={cs.button}>Сохранить</Button>
                <Button type="button" onClick={deleteProfession} className={cs.button}>Удалить</Button>
            </div>
        </div>
    );
};

export default UpdateProfession;

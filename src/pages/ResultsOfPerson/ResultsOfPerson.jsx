import React, { useState, useEffect } from "react";
import cs from "./ResultsOfPerson.module.css";
import axios from "axios";
import {Link} from "react-router-dom";



function ResultsOfPersons({ user }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://188.225.74.17:8080/api/v1/getAllUsers", {
                params: {
                    session_token: user.session_token,
                },
            })
            .then((resp) => {
                setUsers(resp.data.data);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [user.session_token]); // Зависимость для useEffect

    return (
        <div className={cs.wrapper}>
            {/* Каждый человек будет в своем отдельном блоке */}
            {users.map((person) => (
                <div className={cs.resultsPerson_block} key={person.id}>
                    <div className={cs.contentTopLeft}>
                    <div >Имя: {person.first_name}</div>
                    <div >Фамилия: {person.last_name}</div>
                    <div >Email: {person.email}</div>
                    <div >Группа: {person.group}</div>
                    <div >ИСУ: {person.isu}</div>
                    </div>
                    
                    <div className={cs.contentBottomRight}>
                        <Link className={cs.buttonResult} to="/ResultsOfTests">Результаты тестов</Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ResultsOfPersons;

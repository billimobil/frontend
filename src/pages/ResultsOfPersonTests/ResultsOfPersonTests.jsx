import React, { useState, useEffect } from "react";
import cs from "./ResultsOfPersonTests.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function UserTestResults({ user }) {
    const { test_id } = useParams();
    const [testResults, setTestResults] = useState([]);

    useEffect(() => {
        axios
            .get("http://188.225.74.17:8080/api/v1/getUserTestResults", {
                params: {
                    session_token: user.session_token,
                    test_id: test_id,
                },
            })
            .then((resp) => {
                if (resp.data.ok) {
                    setTestResults(resp.data.data);
                } else {
                    console.error("Ошибка: ответ не ок");
                }
            })
            .catch((e) => {
                console.error("Ошибка при получении данных:", e);
            });
    }, [user.session_token, test_id]);

    return (
        <div className={cs.wrapper}>
            <h1>Результаты тестов</h1>
            {testResults.map((result, index) => {
                const formattedTime = new Date(result.Time * 1000).toLocaleString(); 

                return (
                    <div className={cs.resultsPerson_block} key={index}>
                        <div>Название теста: {getTestName(result.TestID)}</div>
                        <div>
                            Attempts: {result.Attempts.map((attempt) => (attempt ? '1' : '0')).join(", ")}
                        </div>
                        <div>
                            Reactions: {result.Reactions.map((reaction) => reaction).join(", ")}
                        </div>
                        <div>Time: {formattedTime}</div>
                    </div>
                );
            })}
        </div>
    );
}

function getTestName(test_id){
    if(test_id === 1){
        return 'реакция на свет';
    }
    if(test_id === 2){
        return 'простой звук';
    }
    if(test_id === 3){
        return 'цветовой тест';
    }
    if(test_id === 29){
        return 'сложные звуки';
    }
    if(test_id === 5){
        return 'визуальное сложение';
    }
    if(test_id === 28){
        return 'движущийся круг';
    }
    if(test_id === 7){
        return 'три движущийхся круга';
    }
}

export default UserTestResults;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import cs from "./ResultsOfPersonTests.module.css";

const ResultsOfPersonTests = ({ user }) => {
    // Получаем параметры user_id и test_id из URL
    const { user_id, test_id } = useParams(); 

    const [results, setResults] = useState([]);

    useEffect(() => {
        axios
            .get("http://188.225.74.17:8080/api/v1/getUserTestResults", {
                params: {
                    session_token: user.session_token,
                    test_id,
                    user_id,
                },
            })
            .then((resp) => {
                if (resp.data.ok) {
                    setResults(resp.data.data);
                } else {
                    console.error("Ошибка при получении результатов тестов");
                }
            })
            .catch((e) => {
                console.error("Ошибка при запросе данных:", e);
            });
    }, [user.session_token, user_id, test_id]);

    return (
        <div className={cs.wrapper}>
            <h1>Результаты тестов для пользователя с ID: {user_id}</h1> {/* Используем полученный user_id */}
            {results.length === 0 ? (
                <p>Нет результатов для данного пользователя и теста.</p> // Если нет данных
            ) : (
                results.map((result, index) => (
                    <div key={index} className={cs.resultBlock}>
                        <div>Название теста: {getTestName(result.TestID)}</div>
                        <div>Попытки: {result.Attempts.map((a) => (a ? "1" : "0")).join(", ")}</div>
                        <div>Реакции: {result.Reactions.map((r) => r).join(", ")}</div>
                        <div>Время: {new Date(result.Time * 1000).toLocaleString()}</div>
                    </div>
                ))
            )}
        </div>
    );
};

// Функция для определения названия теста по его ID
function getTestName(test_id) {
    switch (test_id) {
        case 1:
            return "Реакция на свет";
        case 2:
            return "Простой звук";
        case 3:
            return "Цветовой тест";
        case 29:
            return "Сложные звуки";
        case 10:
            return "Визуальное сложение";
        case 28:
            return "Движущийся круг";
        default:
            return "Неизвестный тест";
    }
}

export default ResultsOfPersonTests;

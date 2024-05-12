import React, { useState, useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const WhatProfession = ({ user }) => {
    const [pvkScores, setPvkScores] = useState({});
    const { test_id } = useParams();

    useEffect(() => {
        const calculatePVKScores = async () => {
            try {
                const response = await axios
                    .get("/api/v1/getUserTestResults", {
                        params: {
                            session_token: user.session_token,
                            test_id: test_id,
                        },
                    })
                    .then((resp) => {
                        // Обработка данных
                    })
                    .catch((e) => {
                        console.error("Ошибка при получении данных:", e);
                    }
                );

                const testResults = response.data.data;
                const pvkScores = {};

                testResults.forEach((result) => {
                    const testScore = calculateTestScore(result);
                    const testPVK = getTestPVK(result.TestID);
                    if (testPVK) {
                        if (!pvkScores[testPVK]) {
                            pvkScores[testPVK] = 0;
                        }
                        pvkScores[testPVK] += testScore;
                    }
                });

                setPvkScores(pvkScores);
            } catch (error) {
                console.error("Ошибка при получении результатов тестов:", error);
            }
        };

        calculatePVKScores();
    }, [user]);

    const calculateTestScore = (result) => {
        const testScore = result.score;
        const pvkScore = (testScore / 100) * 9 + 1; // Преобразуем оценку в диапазоне от 0 до 100 в диапазон от 1 до 10
        return pvkScore;
    };

    const getTestPVK = (testID) => {
        switch (testID) {
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
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>Баллы профессиональных компетенций:</h2>
            <ul>
                {/* Отображаем баллы ПВК */}
                {Object.entries(pvkScores).map(([pvk, score]) => (
                    <li key={pvk}>
                        {pvk}: {score}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WhatProfession;

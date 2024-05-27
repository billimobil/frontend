import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const WhatProfession = ({ user }) => {
    const [pvkScores, setPvkScores] = useState({});
    const { test_id } = useParams();

    useEffect(() => {
        const calculatePVKScores = async () => {
            try {
                const response = await axios.get("/api/v1/getUserTestResults", {
                    params: {
                        session_token: user.session_token,
                        test_id: test_id,
                    },
                });

                const testResults = response.data.data;
                const testStatistics = response.data.statistics; // Предполагаем, что статистика включена в API-ответ

                const pvkScores = {};

                testResults.forEach((result) => {
                    const { score, TestID } = result;
                    const { mean, stdDev } = testStatistics[TestID]; // Получаем среднее значение и стандартное отклонение для текущего теста
                    const zScore = calculateZScore(score, mean, stdDev);
                    const threshold = getThreshold(TestID);

                    if (zScore > threshold) {
                        const testPVK = getTestPVK(TestID);
                        if (testPVK) {
                            if (!pvkScores[testPVK]) {
                                pvkScores[testPVK] = 0;
                            }
                            pvkScores[testPVK] += zScore;
                        }
                    }
                });

                setPvkScores(pvkScores);
            } catch (error) {
                console.error("Ошибка при получении результатов тестов:", error);
            }
        };

        calculatePVKScores();
    }, [user]);

    const calculateZScore = (score, mean, stdDev) => {
        return (score - mean) / stdDev;
    };

    const getThreshold = (testID) => {
        // Здесь задаются пороговые значения для каждого теста
        switch (testID) {
            case 1:
                return 0; // Пороговое значение для "Реакция на свет"
            case 2:
                return 0; // Пороговое значение для "Простой звук"
            case 3:
                return 0; // Пороговое значение для "Цветовой тест"
            case 29:
                return 0; // Пороговое значение для "Сложные звуки"
            case 10:
                return 0; // Пороговое значение для "Визуальное сложение"
            default:
                return 0; // Пороговое значение по умолчанию
        }
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
                {Object.entries(pvkScores).map(([pvk, score]) => (
                    <li key={pvk}>
                        {pvk}: {score.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WhatProfession;

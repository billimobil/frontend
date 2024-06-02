import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cs from './EasyTest.module.css';

const EasyTest = ({ user }) => {
    const navigate = useNavigate();
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [isTestActive, setIsTestActive] = useState(false);
    const [error, setError] = useState(null); // Добавлено состояние ошибки

    const generateRandomNumbers = () => {
        setNum1(Math.floor(Math.random() * 10000) + 1);
        setNum2(Math.floor(Math.random() * 10000) + 1);
    };

    useEffect(() => {
        if (isTestActive) {
            generateRandomNumbers();
        }
    }, [isTestActive]);

    const handleAnswer = (chosenNumber) => {
        const testID = 5;

        if (totalAttempts >= 15) {
            return; // Ограничение на 15 попыток
        }

        setTotalAttempts(totalAttempts + 1);
        const correct = (chosenNumber === 'num1' && num1 > num2) || (chosenNumber === 'num2' && num2 > num1);

        if (correct) {
            setCorrectAnswers(correctAnswers + 1);
        }

        if (totalAttempts === 14) { // 15-я попытка завершает тест
            axios
                .get("http://188.225.74.17:8080/api/v1/saveUserTestResult", {
                    params: {
                        user_id: user.id,
                        session_token: user.session_token,
                        test_id: 5,
                        correct_answers: correctAnswers,
                        total_attempts: totalAttempts, // Всего попыток
                    },
                }).then((response) => {
                console.log("Ответ от сервера:", response.data); // Лог ответа
                navigate(`/ResultsOfPersonTests/${user.id}/${testID}`);
            }).catch(error => {
                console.log("Ошибка при отправке данных:", error.response.data.data); // Обработка ошибки
                setError("Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова."); // Установка сообщения об ошибке
            })
        } else {
            generateRandomNumbers(); // Генерация новых чисел после ответа
        }
    };

    const handleStartTest = () => {
        setError(null); // Сброс ошибок
        setIsTestActive(true);
        setCorrectAnswers(0); // Сброс правильных ответов
        setTotalAttempts(0); // Сброс попыток
        generateRandomNumbers(); // Генерация начальных чисел
    };

    return (
        <div className={cs.wrapper}>
            <h1>Тест на сравнение</h1>
            {error && <div className={cs.error}>{error}</div>} {/* Отображение сообщения об ошибке */}
            {!isTestActive ? (
                <button className={cs.startButton} onClick={handleStartTest}>Начать тест</button>
            ) : (
                <div>
                    <p>Выберите большее число:</p>
                    <div className={cs.numbers}>
                        <button className={cs.buttonNumber} onClick={() => handleAnswer('num1')}>Число 1: {num1}</button>
                        <button className={cs.buttonNumber} onClick={() => handleAnswer('num2')}>Число 2: {num2}</button>
                    </div>
                    <p>Правильные ответы: {correctAnswers}</p>
                    <p>Всего попыток: {totalAttempts}</p>
                </div>
            )}
        </div>
    );
};

export default EasyTest;

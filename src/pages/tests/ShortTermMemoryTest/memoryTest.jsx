import React, { useState, useEffect } from 'react';
import cs from "./MemoryTest.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const MemoryTest = ({ user }) => {
    const testID = 8;

    const [examplesLeft, setExamplesLeft] = useState(15);
    const [isTestRunning, setIsTestRunning] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const [isReversedOrder, setIsReversedOrder] = useState(false);
    const [numbersToRemember, setNumbersToRemember] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [timeToRemember, setTimeToRemember] = useState(5); // время на запоминание
    const [timeToEnter, setTimeToEnter] = useState(9); // время на ввод ответа
    const [countdown, setCountdown] = useState(timeToRemember); // обратный отсчет для запоминания и ввода
    const navigate = useNavigate();
    const [attempts, setAttempts] = useState([]); // boolean (правильно ли запомнил числа)
    const [reactions, setReactions] = useState([]); // number (количество времени на ввод)
    const [inputStartTime, setInputStartTime] = useState(null);

    const sendResultsToBackend = () => {
        try {
            axios.get("http://188.225.74.17:8080/api/v1/saveUserTestResult", {
                params: {
                    user_id: user.id,
                    session_token: user.session_token,
                    test_id: testID,
                    attempts: JSON.stringify(attempts),
                    reactions: JSON.stringify(reactions)
                }
            }).then(resp => {
                navigate(`/ResultsOfPersonTests/${user.id}/${testID}`);
            })
        } catch (error) {
            console.log("Error sending results: ", error);
        }
    }

    useEffect(() => {
        if (!isTestRunning) return;

        const timer = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isTestRunning]);

    useEffect(() => {
        if (!isTestRunning) return;

        if (countdown <= 0) {
            if (!isRemember) {
                setIsRemember(true);
                setCountdown(timeToEnter);
                setInputStartTime(Date.now());
            } else {
                checkUserInput();
                setExamplesLeft(prev => prev - 1);
                if (examplesLeft > 1) {
                    setIsRemember(false);
                    setNumbersToRemember(generateRandomNumbers(getNumberCountByPhase(examplesLeft - 1), 0, 99));
                    setIsReversedOrder(Math.random() > 0.5);
                    setCountdown(timeToRemember);
                    setUserInput("");
                } else {
                    finishTest();
                }
            }
        }
    }, [countdown]);

    const generateRandomNumbers = (count, min, max) => {
        return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);  // генерация n чисел от min до max
    };

    const getNumberCountByPhase = (examplesLeft) => {
        if (examplesLeft > 10) return 2;
        if (examplesLeft > 5) return 4;
        return 6;
    };

    const startTest = () => {
        setIsTestRunning(true);
        setIsRemember(false);
        setExamplesLeft(15);
        setNumbersToRemember(generateRandomNumbers(2, 0, 99));
        setIsReversedOrder(Math.random() > 0.5);
        setCountdown(timeToRemember);
        setUserInput("");
        setAttempts([]);
        setReactions([]);
    };

    const finishTest = () => {
        setIsTestRunning(false);
        sendResultsToBackend();
    };

    const handleRememberButtonClick = () => {
        checkUserInput();
        setExamplesLeft(prev => prev - 1);
        if (examplesLeft > 1) {
            setIsRemember(false);
            setNumbersToRemember(generateRandomNumbers(getNumberCountByPhase(examplesLeft - 1), 0, 99));
            setIsReversedOrder(Math.random() > 0.5);
            setCountdown(timeToRemember);
            setUserInput("");
        } else {
            finishTest();
        }
    };

    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const checkUserInput = () => {
        const inputNumbers = userInput.split(' ').map(Number);
        const correctNumbers = isReversedOrder ? [...numbersToRemember].reverse() : numbersToRemember;

        const isCorrect = inputNumbers.join(' ') === correctNumbers.join(' ');
        const reactionTime = (Date.now() - inputStartTime) / 1000; // тут хуйня для ввода в секах

        setAttempts(prev => [...prev, isCorrect ? 1 : 0]);
        setReactions(prev => [...prev, reactionTime]);

        // if (isCorrect) {
        //     alert("Правильно!");
        // } else {
        //     alert("Неправильно. Правильный ответ: " + correctNumbers.join(' '));
        // }
    };

    return (
        <div className={cs.wrapper + " "}>
            <div className={cs.testName}>Тест на память </div>
            {!isRemember ?
                <>
                    <div className={cs.testDescription}>Запоминайте числа, появляющиеся на экране.</div>
                </> :
                <>
                    <div className={cs.testDescription}>Введите числа в {isReversedOrder ? "обратном" : "том же"} порядке через пробел.</div>
                </>
            }
            <div className={cs.lineUnderTestName}></div>
            {isTestRunning && !isRemember ?
                <>
                    <div className={cs.numbersContainer}>
                        {numbersToRemember.map((number, index) => (
                            <div className={cs.numberSquare} key={index}>
                                {number}
                            </div>
                        ))}
                    </div>
                </> : (isTestRunning && isRemember) ?
                    <>
                        <input type="text" placeholder="Введите числа" className={cs.input} value={userInput} onChange={handleUserInputChange} />
                    </> :
                    <></>
            }
            {!isTestRunning && !isRemember ?
                <>
                    <div className={cs.startButton} onClick={startTest}>Начать тестирование</div>
                </> : (isTestRunning && isRemember) ?
                    <>
                        <div className={cs.startButton} onClick={handleRememberButtonClick}>Подтвердить</div>
                    </> :
                    <></>
            }
            <div className={cs.examplesLeft}>Осталось примеров: {examplesLeft}</div>
            {isTestRunning && (
                <div className={cs.timer}>Обратный отсчет: {countdown}</div>)
            }
        </div>
    );
};

export default MemoryTest;

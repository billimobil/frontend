import React, { useState, useEffect } from 'react';
import styles from "./SimpleMovingObjectTest.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const MovingObjectTest = ({ user }) => {
    const testID = 7;
    const navigate = useNavigate();

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(15);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [distance, setDistance] = useState(0);
    const [isTestRunning, setIsTestRunning] = useState(false);
    const [redCirclePosition, setRedCirclePosition] = useState({ x: window.innerWidth / 1.66, y: window.innerHeight / 1.94 });
    const [redCircleDirection, setRedCircleDirection] = useState(1);
    const [timeLeft, setTimeLeft] = useState(0);
    const [distanceLog, setDistanceLog] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [isTestFinished, setIsTestFinished] = useState(false);
    const [lastRecordedTime, setLastRecordedTime] = useState(0);
    const mainRectCenter = { x: window.innerWidth / 1.66, y: window.innerHeight / 1.94 };

    const handleMouseMove = (e) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        if (isTestRunning) {
            const interval = setInterval(() => {
                setRedCirclePosition(prevPosition => {
                    const newX = prevPosition.x + redCircleDirection * 5; // Скорость движения круга
                    return { ...prevPosition, x: Math.min(window.innerWidth - 50, Math.max(50, newX)) };
                });
            }, 1000 / 60);

            return () => clearInterval(interval);
        }
    }, [isTestRunning, redCircleDirection]);

    useEffect(() => {
        const distanceX = mainRectCenter.x - redCirclePosition.x;
        const distanceY = mainRectCenter.y - redCirclePosition.y;
        const newDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        setDistance(newDistance);

        setRedCircleDirection(cursorPosition.x > redCirclePosition.x ? -1 : 1);
    }, [redCirclePosition, cursorPosition]);

    useEffect(() => {
        if (isTestRunning && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else if (isTestRunning && timeLeft === 0) {
            setIsTestRunning(false);
            setIsTestFinished(true);
        }
    }, [isTestRunning, timeLeft]);

    useEffect(() => {
        console.log("isTestRunning:", isTestRunning);
        console.log("timeLeft:", timeLeft);
        console.log("lastRecordedTime:", lastRecordedTime);
        console.log("cursorPosition:", cursorPosition);
        console.log("redCirclePosition:", redCirclePosition);
        console.log("minutes:", minutes);
        console.log("seconds:", seconds);
        if (isTestRunning) {
            const logInterval = setInterval(() => {
                const currentTime = (minutes * 60 + seconds) - timeLeft;
                if (currentTime - lastRecordedTime >= 2) { // массив стрингами заполнен
                    const distance = Number(Math.abs(redCirclePosition.x - mainRectCenter.x).toFixed(2));
                    console.log(`Recording data at ${currentTime} seconds`);
                    setDistanceLog(prevLog => {
                        const newLog = [...prevLog, distance];
                        console.log("Updated distanceLog:", newLog);
                        return newLog;
                    });
                    const isCursorOnCircle = Math.abs(cursorPosition.x - redCirclePosition.x) <= 25 && Math.abs(cursorPosition.y - redCirclePosition.y) <= 25;
                    setAnswers(prevAnswers => {
                        const newAnswers = [...prevAnswers, isCursorOnCircle];
                        console.log("Updated answers:", newAnswers);
                        return newAnswers;
                    });
                    setLastRecordedTime(currentTime);
                }
            }, 1000);

            return () => clearInterval(logInterval);
        }
    }, [isTestRunning, timeLeft, lastRecordedTime, cursorPosition, redCirclePosition, minutes, seconds]);


    useEffect(() => {
        if (isTestFinished) {
            console.log("Attempts:", answers);
            console.log("Reactions:", distanceLog);
            sendResultsToBackend();
            alert(`Answers: ${JSON.stringify(answers)}\nDistances: ${JSON.stringify(distanceLog)}`);
        }
    }, [isTestFinished]);

    const startTest = () => {
        setIsTestRunning(true);
        setTimeLeft(minutes * 60 + seconds);
        setDistanceLog([]); // Сбросить лог дистанций при начале нового теста
        setAnswers([]); // Сбросить ответы при начале нового теста
        setIsTestFinished(false);
        setLastRecordedTime(0);
    };

    const sendResultsToBackend = async () => {
        try {
            console.log("Sending results to backend");
            console.log("User ID:", user.id);
            console.log("Session Token:", user.session_token);
            console.log("Test ID:", testID);
            console.log("Attempts:", JSON.stringify(answers));
            console.log("Reactions:", JSON.stringify(distanceLog));

            const response = await axios.get("http://188.225.74.17:8080/api/v1/saveUserTestResult", {
                params: {
                    user_id: user.id,
                    session_token: user.session_token,
                    test_id: testID,
                    attempts: JSON.stringify(answers),
                    reactions: JSON.stringify(distanceLog)
                }
            });
            if (response.status === 200) {
                navigate(`/ResultsOfPersonTests/${user.id}/${testID}`);
            } else {
                console.error("Failed to send results: ", response.statusText);
            }
        } catch (error) {
            console.error("Error sending results: ", error);
        }
    };

    return (
        <div className={styles.div + " " + user} onMouseMove={handleMouseMove}>
            <div className={styles.testName}>Оценка аналогового слежения</div>
            <div className={styles.task}>
                Ваша задача: с помощью курсора мышки держать движущийся круг ближе к центру объекта. Если курсор расположен справа от круга,
                то он будет двигаться влево, если слева, то вправо.
            </div>
            <div className={styles.distance}>Дистанция: {distance.toFixed(2)}</div>
            <div className={styles.lineUnderTestName}></div>
            <div className={styles.startButton} onClick={startTest}>Нажмите чтобы начать тестирование</div>
            <div className={styles.testDuration}>Выберите длительность теста</div>
            <div className={styles.min}>мин:</div>
            <input
                type="number"
                className={styles.minutesRectangle}
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value))}
            />
            <div className={styles.sec}>сек:</div>
            <input
                type="number"
                className={styles.secondsRectangle}
                value={seconds}
                onChange={(e) => setSeconds(parseInt(e.target.value))}
            />
            <div className={styles.mainRect}></div>
            <div className={styles.mainRectCenter}></div>
            <div
                className={styles.redEllipse}
                style={{ left: `${redCirclePosition.x}px`, top: `${redCirclePosition.y}px` }}
            ></div>
            <div className={styles.timeLeft}>Осталось времени:<br></br>
                {Math.floor(timeLeft / 60)} мин {timeLeft % 60} сек</div>
        </div>
    );
};

export default MovingObjectTest;

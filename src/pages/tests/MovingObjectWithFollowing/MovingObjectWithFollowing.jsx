import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./MovingObjectFollowing.module.css";
import axios from "axios";

export const MovingObjectWithFollowing = ({ user }) => {
    const testID = 5;
    const [speed, setSpeed] = useState(5); // увеличили скорость красного кружка
    const [isTestRunning, setIsTestRunning] = useState(false); // флаг запуска теста
    const [timeLeft, setTimeLeft] = useState(15); // время, оставшееся до окончания теста
    const [redCirclePosition, setRedCirclePosition] = useState({ x: 0, y: 0 }); // начальная позиция красного кружка
    const [greenCirclePosition, setGreenCirclePosition] = useState({ x: 0, y: 0 }); // начальная позиция зеленого кружка
    const [redCircleDirection, setRedCircleDirection] = useState(1); // направление движения красного кружка (1 - вправо, -1 - влево)
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(15);
    const [distanceHistory, setDistanceHistory] = useState([]); // массив для сохранения истории дистанций
    const [lastRecordedTime, setLastRecordedTime] = useState(0); // последнее записанное время
    const navigate = useNavigate();
    const reactionsMS = [true]

    useEffect(() => {
        // обновляем позиции кругов по центру после отрисовки компонента
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2 + 35; // опускаем на N px вниз (16 на моем пк)
        setRedCirclePosition({ x: centerX, y: centerY });
        setGreenCirclePosition({ x: centerX, y: centerY });
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            sendResultsToBackend();
        }
    }, [timeLeft]);


    useEffect(() => {
        // таймер обновляется каждую секунду, если тест запущен
        const timer = setTimeout(() => {
            if (isTestRunning && timeLeft > 0) {
                setTimeLeft(prevTime => prevTime - 1);
            }
        }, 1000);

        // остановить таймер, если время вышло или тест не запущен
        if (!isTestRunning || timeLeft === 0) {
            clearTimeout(timer);
        }

        return () => clearTimeout(timer);
    }, [isTestRunning, timeLeft]);

    useEffect(() => {
        // функция для изменения позиции красного кружка каждую секунду
        const interval = setInterval(() => {
            if (isTestRunning) {
                // случайное число от 0 до 1
                const random = Math.random();
                // если число меньше 0.02, меняем направление движения красного кружка
                if (random < 0.02) {
                    setRedCircleDirection(prevDirection => -prevDirection);
                }
                // изменяем только горизонтальную позицию красного кружка
                setRedCirclePosition(prevPosition => {
                    let newX = prevPosition.x + redCircleDirection * speed; // скорость поменять можно
                    // ограничиваем позицию кружка, чтобы он не мог подойти близко к краю экрана (хуйня кривая, но работает)
                    newX = Math.min(window.innerWidth - 280, Math.max(280, newX));
                    return { ...prevPosition, x: newX };
                });
                // записываем дистанцию каждые 2 секунды (можно сменить)
                const currentTime = (minutes * 60 + seconds) - timeLeft;
                if (currentTime - lastRecordedTime >= 2) { // массив стрингами заполнен
                    const distance = Number(Math.abs(redCirclePosition.x - greenCirclePosition.x).toFixed(2));
                    setDistanceHistory(prevHistory => [...prevHistory, distance]);
                    setLastRecordedTime(currentTime);
                }
            }
        }, 1000 / 60); // обновляем каждый кадр для плавного движения

        // остановить движение красного кружка, если время вышло или тест не запущен
        if (!isTestRunning || timeLeft === 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [speed, isTestRunning, redCircleDirection, timeLeft, greenCirclePosition, lastRecordedTime, redCirclePosition]);

    // функция для обновления позиции зеленого кружка в зависимости от позиции курсора
    const handleMouseMove = (e) => {
        if (isTestRunning) {
            // обновляем только горизонтальную позицию зеленого кружка в соответствии с позицией курсора
            setGreenCirclePosition(prevPosition => {
                return { ...prevPosition, x: e.clientX };
            });
        }
    };

    const startTest = () => {
        setIsTestRunning(true);
        setTimeLeft(minutes * 60 + seconds);
    };

    const sendResultsToBackend =  () => {
        try {
            axios.get("http://188.225.74.17:8080/api/v1/saveUserTestResult", {
                params: {
                    user_id: user.id,
                    session_token: user.session_token,
                    test_id: testID,
                    attempts: JSON.stringify(reactionsMS),
                    reactions: JSON.stringify(distanceHistory)
                }
            }).then(resp=>{
                navigate(`/ResultsOfPersonTests/${user.id}/${testID}`);
            })
        } catch (error) {
            console.log("Error sending results: ", error);
        }
    }

    return (
        <div className={styles.div + " "} onMouseMove={handleMouseMove}>
            <div className={styles.testName}>Оценка слежения с преследованием</div>
            <div className={styles.lineUnderTestName}></div>
            <div className={styles.testDescription}>
                Ваша задача: следить курсором за движущимся объектом, стремясь держать
                зеленый кружок как можно ближе к центру объекта
            </div>
            <div className={styles.centralRectangle}></div>
            <div
                className={styles.distance}>Дистанция: {Math.abs(redCirclePosition.x - greenCirclePosition.x).toFixed(2)}px
            </div>
            {/* поля для ввода минут и секунд */}
            <div className={styles.durationOfTest}>Выберите длительность теста</div>
            <div className={styles.min}>мин:</div>
            <input
                type="number"
                className={styles.minutesRectangle}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
            />
            <div className={styles.sec}>сек:</div>
            <input
                type="number"
                className={styles.secondsRectangle}
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
            />
            {!isTestRunning && (
                <div className={styles.startButton} onClick={startTest}>Нажмите чтобы начать тестирование</div>
            )}
            {/* отображение красного и зеленого кружков */}
            <div className={styles.redEllipse}
                 style={{left: `${redCirclePosition.x}px`, top: `${redCirclePosition.y}px`}}></div>
            <div className={styles.greenEllipse}
                 style={{left: `${greenCirclePosition.x}px`, top: `${greenCirclePosition.y}px`}}></div>
            <div className={styles.timeLasts}>Осталось секунд: {timeLeft}</div>
        </div>
    );
};
export default MovingObjectWithFollowing;

import React, { useState, useEffect } from 'react';
import styles from "./MovingObjectTest.module.css";

export const MovingObjectTest = ({ className, ...props }) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(15);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [distance, setDistance] = useState(0);
    const [isTestRunning, setIsTestRunning] = useState(false);
    const [redCirclePosition, setRedCirclePosition] = useState({ x: window.innerWidth / 2 - 39 + 5, y: window.innerHeight / 2.2 }); // начальное положение красного кружка TODO: сделать нормальным блять
    const [redCircleDirection, setRedCircleDirection] = useState(1); // направление движения красного кружка: 1 вправо, -1 влево
    const [timeLeft, setTimeLeft] = useState(0); // в секундах (криво-косо, типо не в секундах, но в них) TODO: исправить
    //TODO сделать запись в массив и отправку на бекенд

    const handleMouseMove = (e) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
    }; //TODO: сделать не лагающим сайт

    useEffect(() => {
        if (isTestRunning) {
            const interval = setInterval(() => {
                // обновляем позицию красного кружка
                setRedCirclePosition(prevPosition => {
                    const newX = prevPosition.x + redCircleDirection * 10;
                    return { ...prevPosition, x: Math.min(window.innerWidth - 280, Math.max(280, newX)) };
                });

                // дистанция между курсором и красным кружком
                const distanceX = cursorPosition.x - redCirclePosition.x;
                const distanceY = cursorPosition.y - redCirclePosition.y;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                setDistance(distance);
            }, 1000 / 60);

            return () => clearInterval(interval);
        }
    }, [isTestRunning, redCircleDirection, cursorPosition]);

    useEffect(() => {
        if (isTestRunning && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setIsTestRunning(false);
        }
    }, [isTestRunning, timeLeft]);

    const startTest = () => {
        setIsTestRunning(true);
        setTimeLeft(minutes * 60 + seconds);
    };

    return (
        <div className={styles.div + " " + className} onMouseMove={handleMouseMove}>
            {/*<div className={styles.topRect}></div>*/}
            <div className={styles.testName}>Оценка аналогово слежения</div>
            <div className={styles.task}>
                Ваша задача: следить курсором за движущимся объектом, стремясь держать
                курсор как можно ближе к центру объекта{" "}
            </div>
            <div className={styles.distance}>Дистанция: {distance.toFixed(2)}</div>
            <div className={styles.lineUnderTestName}></div>
            {/*<div className={styles.div2}>Эксперты</div>*/}
            {/*<div className={styles.div3}>Выйти</div>*/}
            <div className={styles.startButton} onClick={startTest}>Нажмите чтобы начать тестирование</div>
            {/*<div className={styles.div4}>Нажмите чтобы начать тестирование</div>*/}
            <div className={styles.testDuration}>Выберите длительность теста</div>
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
            <div className={styles.mainRect}></div>
            <div
                className={styles.redEllipse}
                style={{ left: `${redCirclePosition.x}px`, top: `${redCirclePosition.y}px` }}
            ></div>
            {/*<div className={styles.medianReactionTime}>*/}
            {/*    Среднее время реакции: {" "}*/}
            {/*</div>*/}
            {/*TODO:сделать норм таймер*/}
            <div className={styles.timeLeft}>Осталось времени: {Math.floor(timeLeft / 60)} мин {timeLeft % 60} сек</div>
            {/*<img className={styles.vector} src="vector0.svg"/>*/}
        </div>
    );
};
//todo: исправить кружок
export default MovingObjectTest;

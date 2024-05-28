import React, { useState, useEffect } from 'react';
import styles from "./SimpleMovingObjectTest.module.css";

export const MovingObjectTest = ({ className, ...props }) => {
    const testID = 7;

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(15);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [distance, setDistance] = useState(0);
    const [isTestRunning, setIsTestRunning] = useState(false);
    const [redCirclePosition, setRedCirclePosition] = useState({ x: window.innerWidth / 1.66, y: window.innerHeight / 1.94 });
    const [redCircleDirection, setRedCircleDirection] = useState(1);
    const [timeLeft, setTimeLeft] = useState(0);
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

                const distanceX = mainRectCenter.x - redCirclePosition.x;
                const distanceY = mainRectCenter.y - redCirclePosition.y;
                const newDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                setDistance(newDistance);

                setRedCircleDirection(cursorPosition.x > redCirclePosition.x ? -1 : 1);
            }, 1000 / 60);

            return () => clearInterval(interval);
        }
    }, [isTestRunning, redCircleDirection, cursorPosition, redCirclePosition]);

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

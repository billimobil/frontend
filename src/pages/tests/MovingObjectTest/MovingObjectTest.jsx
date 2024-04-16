import React, {useCallback, useEffect, useState} from 'react';
import cs from '../LightReactionTest/LightReactionTest.module.css'
import cs2 from './MovingObjectTest.module.css'
import Button from "../../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
const LightReactionTest = () => {
    const navigate = useNavigate();

    const [color, setColor] = useState('grey')
    const [reactionsMs, setReactionsMs] = useState([]);
    const [avgReactionMs, setAvgReactionMs] = useState(0)
    const [answers, setAnswers] = useState([]) // true/false
    const [testStarted, setTestStarted] = useState(false)

    function recalculateAvgReactionTime() {
        let length = reactionsMs.length;
        if (length !== 0) {
            setAvgReactionMs(reactionsMs.reduce((a, b)=>a+b) / length)
        }
    }

    let i = 15
    const [signalsCount, setSignalsCount] = useState(i)
    function startTest() { // TODO fix bug that appears when start button is pressed few times
        if (i <= 0) {
            // TODO тут отправляем результаты на бэк, ждем их сохранения и идем смотреть результаты
            navigate("/results");
            setReactionsMs([]);
            return;
        }

        react((timeSpent)=>{
            i--;
            setSignalsCount(i);

            reactionsMs.push(timeSpent);
            setReactionsMs(reactionsMs);
            recalculateAvgReactionTime();

            startTest()
        })
    }

    function react(callback) {
        var colorDisplayed = false;
        setTimeout(()=>{
            setColor('red')
            colorDisplayed = true
        }, getRandomInt(1000, 3000));

        var start = performance.now();
        document.addEventListener('keydown', onKeyHandler); // TODO считать слишком ранние ответы неправильными
        function onKeyHandler(e) {
            if (e.keyCode === 87) {
                answers.push(colorDisplayed);
                setAnswers(answers);
                console.log(answers);
                if (!colorDisplayed) {
                    return;
                }

                setColor('');
                var timeSpent = performance.now() - start;
                callback(timeSpent);
                document.removeEventListener('keydown', onKeyHandler);
            }
        }

    }


    // const [angle, setAngle] = useState(0);
    //
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setAngle(prevAngle => (prevAngle + 1) % 360);
    //     }, 5);
    //
    //     return () => clearInterval(interval);
    // }, []);
    //
    // const radius = 90;
    // const centerX = 100; // координата x центра окружности
    // const centerY = 100; // координата y центра окружности
    // const x = centerX + radius * Math.cos(angle * Math.PI / 180);
    // const y = centerY + radius * Math.sin(angle * Math.PI / 180);

    // const radius = 275;
    // const x = radius * Math.cos(angle * Math.PI / 180);
    // const y = radius * Math.sin(angle * Math.PI / 180);

    return (
        <div className={cs.wrapper}>
            <h1>Оценка простых сенсомоторных реакций &nbsp;<div className={cs.underline}>на свет</div></h1>
            <hr/>
            <p>Ваша задача: максимально быстро нажать кнопку после появления светового сигнала</p>
            <div className={cs2.circleContainer}>
                <div className={cs2.circle}/>
            </div>
            <div className={cs.helper}>
                <div className={cs.key}>
                    W<sub>ц</sub>
                </div>
                <div>Нажмите кнопку (w) при появлении сигнала</div>
            </div>
            <div style={{width: 650}}>
                {testStarted
                    ? <Button onClick={()=>{window.location.reload()}}>Остановить тест</Button>
                    : <Button onClick={()=>{
                        setTestStarted(true);
                        startTest();
                    }}>Нажмите, чтобы начать тестирование</Button>
                }
            </div>
            <div className={cs.stats}>
                <p>Среднее время реакции: {avgReactionMs.toFixed(0)} ms</p>
                <p>Осталось сигналов: {signalsCount}</p>
            </div>
        </div>
    );
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function getRandomColor() {
//     const colors = ["blue", "yellow", "red"];
//     return colors[Math.floor(Math.random() * colors.length)];
// }

export default LightReactionTest;
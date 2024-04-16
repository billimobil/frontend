import React, {useCallback, useEffect, useState} from 'react';
import cs from '../LightReactionTest/LightReactionTest.module.css'
import cs2 from './LightComplexReactionTest.module.css'
import Button from "../../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
const LightReactionTest = () => {
    const navigate = useNavigate();

    const [AColor, setAColor] = useState('')
    const [SColor, setSColor] = useState('')
    const [DColor, setDColor] = useState('')

    const [symbol, setSymbol] = useState('')

    const [color, setColor] = useState('grey')
    const [reactionsMs, setReactionsMs] = useState([]); // ms
    const [avgReactionMs, setAvgReactionMs] = useState(0)
    const [answers, setAnswers] = useState([]) // true/false
    const [testStarted, setTestStarted] = useState(false)

    function recalculateAvgReactionTime() {
        let length = reactionsMs.length;
        if (length !== 0) {
            setAvgReactionMs(reactionsMs.reduce((a, b)=>a+b) / length)
        }
    }

    var i = 15
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

            setTimeout(startTest, getRandomInt(1000, 3000));
        })
    }

    function react(callback) {
        let color = getRandomColor()
        setColor(color)
        setSymbol('')
        var start = performance.now()
        document.addEventListener('keydown', onKeyHandler);
        function onKeyHandler(e) {
            document.removeEventListener('keydown', onKeyHandler)

            let map = {
                "#FF0000": 65,
                "#1400FF": 83,
                "#42FF00": 68,
            }
            var timeSpent = performance.now() - start
            callback(timeSpent)
            if (e.keyCode === map[color]) {
                setSymbol('✅')
            } else if ([65, 83, 68].includes(e.keyCode)) {
                setSymbol('❌')
            }

            answers.push(e.keyCode === map[color])
            setAnswers(answers)

            setTimeout(()=>{setColor('')}, 500)

        }

    }


    return (
        <div className={cs.wrapper}>
            <h1>Оценка простых сенсомоторных реакций &nbsp;<div className={cs.underline}>на различные цвета</div></h1>
            <hr/>
            <p>Ваша задача: в зависимости от цвета нажать соответсвующую кнопку</p>
            <div className={cs2.display} style={{marginBottom: 15, width: 608, height: 253, background: color}}>{symbol}</div>
            <div>Нажмите на кнопку, соответствующую цвету</div>
            <div className={cs.helper}>
                <div className={cs.key} style={{background: "#FF0000"}}>
                    A<sub>ф</sub>
                </div>
                <div className={cs.key} style={{background: "#1400FF"}}>
                    S<sub>ы</sub>
                </div>
                <div className={cs.key} style={{background: "#42FF00"}}>
                    D<sub>в</sub>
                </div>
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

function getRandomColor() {
    const colors = ["#FF0000", "#1400FF", "#42FF00"];
    return colors[Math.floor(Math.random() * colors.length)];
}

export default LightReactionTest;
import React, {useCallback, useEffect, useState} from 'react';
import cs from './LightReactionTest.module.css'
import Button from "../../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const LightReactionTest = ({user}) => {
    const testID = 1;
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
            setReactionsMs([]);

            axios.get("http://188.225.74.17:8080/api/v1/saveUserTestResult", {
                params: {
                    user_id: user.id,
                    session_token: user.session_token,
                    test_id: testID,
                    attempts: JSON.stringify(answers),
                    reactions: JSON.stringify(reactionsMs)
                }
            }).then(resp=>{
                navigate(`/ResultsOfPersonTests/${user.id}/${testID}`);
            })
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
        var start;
        setTimeout(()=>{
            start = performance.now();
            setColor('red')
            colorDisplayed = true
        }, getRandomInt(1000, 3000));

        document.addEventListener('keydown', onKeyHandler); // TODO считать слишком ранние ответы неправильными
        function onKeyHandler(e) {
            if (e.keyCode === 87) {
                var end = performance.now();
                answers.push(colorDisplayed);
                setAnswers(answers);
                if (!colorDisplayed) {
                    return;
                }

                setColor('');
                let timeSpent = Number((end - start).toFixed(0));
                callback(timeSpent);
                document.removeEventListener('keydown', onKeyHandler);
            }
        }

    }


    return (
        <div className={cs.wrapper}>
            <h1>Оценка простых сенсомоторных реакций &nbsp;<div className={cs.underline}>на свет</div></h1>
            <hr/>
            <p>Ваша задача: максимально быстро нажать кнопку после появления светового сигнала</p>
            <div style={{marginBottom: 15, width: 608, height: 253, background: color}}></div>
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
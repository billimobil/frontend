import React, {useEffect, useMemo, useState} from 'react';
import cs from "../LightReactionTest/LightReactionTest.module.css";
import Button from "../../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import {useAudio} from "../../../hooks/useAudio";
import axios from "axios";

const SoundReactionTest = ({user}) => {
    const navigate = useNavigate();

    let [a, b, odd] = [0, 0, false]

    const [testStarted, setTestStarted] = useState(false)
    const [AColor, setAColor] = useState('')
    const [DColor, setDColor] = useState('')

    const [reactionsMs, setReactionsMs] = useState([]); // ms
    const [answers, setAnswers] = useState([]) // true/false
    const [avgReactionMs, setAvgReactionMs] = useState(0)
    function recalculateAvgReactionTime() {
        let length = reactionsMs.length;
        if (length !== 0) {
            setAvgReactionMs(reactionsMs.reduce((a, b)=>a+b) / length)
        }
    }

    var i = 15
    const [signalsCount, setSignalsCount] = useState(i)

    const startTest = () => { // TODO fix bug that appears when start button is pressed few times
        setAColor('')
        setDColor('')

        a = getRandomInt(10, 50)
        b = getRandomInt(10, 50)
        odd = (a + b) % 2

        let audio1 = new Audio(require(`../../../assets/sounds/numbers/${a}.mp2`));
        let audio2 = new Audio(require(`../../../assets/sounds/numbers/+.mp2`));
        let audio3 = new Audio(require(`../../../assets/sounds/numbers/${b}.mp2`));

        audio1.play()
        setTimeout(()=>{audio2.play()}, 1200)
        setTimeout(()=>{audio3.play()}, 1600)

        // TODO: звуки не перестают играть, и нажатия W/D не перестают считываться после выхода из этой страницы
        if (i <= 0) {
            // TODO тут отправляем результаты на бэк, ждем их сохранения и идем смотреть результаты
            setTestStarted(false);
            axios.get("http://188.225.74.17:8080/api/v1/saveUserTestResult", {
                params: {
                    user_id: user.id,
                    session_token: user.session_token,
                    test_id: 29,
                    attempts: JSON.stringify(answers),
                    reactions: JSON.stringify(reactionsMs)
                }
            }).then(resp=>{
                navigate("/results");
            })
            navigate("/results");
            setReactionsMs([]);
            return;
        }

        react((timeSpent, right)=>{
            i--;
            setSignalsCount(i);

            reactionsMs.push(timeSpent);
            setReactionsMs(reactionsMs);
            recalculateAvgReactionTime();

            answers.push(right)
            setAnswers(answers)

            setTimeout(startTest, 1000);
        })
    }

    function react(callback) {
        var start = performance.now();
        document.addEventListener('keydown', onKeyHandler);
        function onKeyHandler(e) {
            document.removeEventListener('keydown', onKeyHandler)
            var timeSpent = performance.now() - start - 1600

            if (e.keyCode === 65) {
                callback(timeSpent, !odd)
                !odd ? setAColor('#42FF00') : setAColor('#FF0000')
            } else if (e.keyCode === 68) {
                callback(timeSpent, odd)
                odd ? setDColor('#42FF00') : setDColor('#FF0000')
            }
        }
    }
    return (
        <div className={cs.wrapper}>
            <h1>Оценка простых сенсомоторных реакций&nbsp;<div className={cs.underline}>на сложный звуковой сигнал</div></h1>
            <hr/>
            <p>Ваша задача: определить, четная или нечетная сумма произнесенных чисел</p>
            <div className={cs.helper}>
                <div className={cs.key} style={{background: AColor}}>
                    А<sub>ц</sub>
                </div>
                <div>Нажмите кнопку (А) при четности</div>
                <div className={cs.key} style={{background: DColor}}>
                    D<sub>в</sub>
                </div>
                <div>Нажмите кнопку (D) при нечетности</div>
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

export default SoundReactionTest;
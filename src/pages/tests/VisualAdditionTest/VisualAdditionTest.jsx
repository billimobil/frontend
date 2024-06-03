import React, {useState} from 'react';
import cs from "../LightReactionTest/LightReactionTest.module.css";
import cs2 from "./VisualAdditionTest.module.css";
import Button from "../../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const SoundReactionTest = ({user}) => {
    const testID = 10;
    const navigate = useNavigate();

    const [AColor, setAColor] = useState('')
    const [DColor, setDColor] = useState('')
    const [a, setA] = useState()
    const [b, setB] = useState()
    const [reactionsMs, setReactionsMs] = useState([]);
    const [avgReactionMs, setAvgReactionMs] = useState(0)
    const [testStarted, setTestStarted] = useState(false)
    const [answers, setAnswers] = useState([]); // true/false

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
            console.log(answers)

            setTimeout(startTest, getRandomInt(1000, 3000));
        })
    }

    function react(callback) {
        let a = getRandomInt(10, 50);
        let b = getRandomInt(10, 50);
        let odd = (a + b) % 2;
        setA(a)
        setB(b)
        setAColor('')
        setDColor('')

        var start = performance.now();
        document.addEventListener('keydown', onKeyHandler);
        function onKeyHandler(e) {
            document.removeEventListener('keydown', onKeyHandler)
            var timeSpent = performance.now() - start
            setA()
            setB()

            if (e.keyCode === 65) {
                callback(timeSpent, !odd)
                !odd ? setAColor('#42FF00') : setAColor('#FF0000');
            } else if (e.keyCode === 68) {
                callback(timeSpent, odd)
                odd ? setDColor('#42FF00') : setDColor('#FF0000');
            }
        }

    }
    return (
        <div className={cs.wrapper}>
            <h1>Оценка простых сенсомоторных реакций&nbsp;<div className={cs.underline}>на визуальное сложение в уме</div></h1>
            <hr/>
            <p>Ваша задача: определить, четная или нечетная сумма чисел на экране</p>
            <div className={cs2.frame}>
                {a ?
                    <>{a} + {b}</>
                    :
                    <></>
                }

            </div>
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
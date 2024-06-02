import React, {useState} from 'react';
import cs from "./MovingCircleTest.module.css"
import Button from "../../../components/UI/Button/Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Input from "../../../components/UI/Input/Input";

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY
    };
}

function getCurrentTimestamp() {
    return Number(Math.floor(new Date().getTime() / 1000))
}

const MovingCircleTest = ({user}) => {
    const testID = 3;
    const navigate = useNavigate();
    const [distances, setDistances] = useState([]); // px
    const [answers, setAnswers] = useState([]); // true/false

    const [keyColor, setKeyColor] = useState('')
    const [testStarted, setTestStarted] = useState(false)
    const [avgDistances, setAvgDistances] = useState(0)

    const [minutesLeft, setMinutesLeft] = useState(1);
    const [secondsLeft, setSecondsLeft] = useState(0);

    var i = 15;
    let endTime = -1;
    var intervalID = -1;
    const [signalsCount, setSignalsCount] = useState(i)

    function countSecond() {
        let diff = endTime - getCurrentTimestamp()
        if (diff > 0) {
            let mins = Math.floor(diff / 60);
            let secs = diff - mins * 60;
            setSecondsLeft(secs)
            setMinutesLeft(mins)
            return
        }
        setTestStarted(false);
        clearInterval(intervalID);
        axios.get("http://188.225.74.17:8080/api/v1/saveUserTestResult", {
            params: {
                user_id: user.id,
                session_token: user.session_token,
                test_id: 30,
                attempts: JSON.stringify(answers),
                reactions: JSON.stringify(distances)
            }
        }).then(resp=>{
            navigate(`/ResultsOfPersonTests/${user.id}/${testID}`);
        }).catch(error => {
            console.log(error.response.data.error);
        })
    }

    function startTest(e) {
        if (i === 15) { // test just started
            setTestStarted(true);
            endTime = getCurrentTimestamp() + Number(minutesLeft) * 60 + Number(secondsLeft);
            intervalID = setInterval(countSecond, 1000)
        }
        if (i === 0) {
            axios.get("http://188.225.74.17:8080/api/v1/saveUserTestResult", {
                params: {
                    user_id: user.id,
                    session_token: user.session_token,
                    test_id: testID,
                    attempts: JSON.stringify(answers),
                    reactions: JSON.stringify(distances)
                }
            }).then(resp=>{
                navigate(`/ResultsOfPersonTests/${user.id}/${testID}`);
            }).catch(error => {
                console.log(error.response.data.error);
            })
        }

        react((distance)=>{ // waiting for reaction
            // Saving received distance
            distances.push(distance);
            setDistances(distances);

            answers.push(distance === 0);
            setAnswers(answers);

            i--;
            setSignalsCount(i);
            recalculateAvgDistance()

            startTest();
        })
    }

    function recalculateAvgDistance() {
        let length = distances.length;
        if (length !== 0) {
            setAvgDistances(distances.reduce((a, b)=>a+b) / length)
        }
    }

    function react(callback) {
        // Starting listening for keypress
        document.addEventListener('keydown', onKeyHandler); // TODO считать слишком ранние ответы неправильными
        function onKeyHandler(e) {
            if (e.keyCode === 87) {
                // Stopping listening
                document.removeEventListener('keydown', onKeyHandler);

                // Calculating distance between circle and the crossline
                let lineRect = document.getElementsByClassName(cs.crossline)[0];
                let objectRect = document.getElementsByClassName(cs.object)[0];
                var distancePx = Math.abs(getOffset(lineRect).x - getOffset(objectRect).x) + Math.abs(getOffset(lineRect).y - getOffset(objectRect).y);
                distancePx = Number(distancePx.toFixed(0));

                if (distancePx < 50) { // color display
                    setKeyColor('#59fe20')
                } else {
                    setKeyColor('red')
                }
                setTimeout(()=>{setKeyColor('')}, 300)

                // Saving distance
                callback(distancePx)
            }
        }
    }
    // TODO select test duration

    return (
        <div className={cs.wrapper}>
            <h1>Оценка простых сенсомоторных реакций &nbsp;<div className={cs.underline}>на движущийся объект</div></h1>
            <hr/>
            <p>Ваша задача: следить за движующимся объекта, стремясь нажимать кнопку (W) как можно ближе к отмеченной риске</p>
            <div className={cs.circle}>
                <div className={cs.object} style={{animationPlayState: testStarted ? "running" : "paused"}}></div>
                <div className={cs.crossline}></div>
            </div>
            <div className={cs.helper}>
                <div className={cs.key} style={{background: keyColor}}>
                    W<sub>ц</sub>
                </div>
                <div>Нажмите кнопку (w) при появлении сигнала</div>
            </div>
            <div>
                <div className={cs.time_inputs_block}>
                    {
                        testStarted ?
                            <>
                                Осталось: {minutesLeft} мин {secondsLeft} сек
                            </>
                            :
                            <>
                                Выберите длительность теста
                                <div>
                                    <Input value={minutesLeft} setValue={setMinutesLeft} type="number" className={cs.time_input}></Input> мин
                                </div>
                                <div>
                                    <Input value={secondsLeft} setValue={setSecondsLeft} type="number" className={cs.time_input}></Input> сек
                                </div>
                            </>

                    }

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
                <p>Средний промах: {avgDistances.toFixed(0)} px</p>
                <p>Осталось сигналов: {signalsCount}</p>
            </div>

        </div>
    );
};

export default MovingCircleTest;
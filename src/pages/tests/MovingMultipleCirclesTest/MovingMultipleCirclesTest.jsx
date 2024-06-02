import React, {useEffect, useState} from 'react';
import cs from "./MovingMultipleCirclesTest.module.css"
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

function getDistancePx(color) {
    let elements = document.getElementsByClassName(color);
    let object = getOffset(elements[0]);
    let line = getOffset(elements[1]);

    let distancePx = Math.abs(line.x - object.x) + Math.abs(line.y - object.y);
    return Number(distancePx.toFixed(0));
}

const MovingMultipleCirclesTest = ({user}) => {
    const testID = 4;
    const navigate = useNavigate();
    const [distances, setDistances] = useState([]); // px
    const [answers, setAnswers] = useState([]); // true/false

    const [keyColor, setKeyColor] = useState('')
    const [testStarted, setTestStarted] = useState(false)
    const [avgDistances, setAvgDistances] = useState(0)

    const [minutesLeft, setMinutesLeft] = useState(1);
    const [secondsLeft, setSecondsLeft] = useState(0);

    const [result1, setResult1] = useState()
    const [result2, setResult2] = useState()
    const [result3, setResult3] = useState()

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
                test_id: testID,
                attempts: JSON.stringify(answers),
                reactions: JSON.stringify(distances)
            }
        }).then(resp=>{
            navigate(`/ResultsOfPersonTests/${user.id}/${testID}`);
        }).catch(error => {
            console.log(error.response.data.error)
        })
    }

    function startTest(e) {
        if (i === 15) { // test just started
            setTestStarted(true);
            endTime = getCurrentTimestamp() + Number(minutesLeft) * 60 + Number(secondsLeft);
            intervalID = setInterval(countSecond, 1000)
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
            // Filtering keycodes
            if (![65, 83, 68].includes(e.keyCode)) {
                return
            }

            document.removeEventListener('keydown', onKeyHandler);

            let map2 = {
                65: cs.color1, // red
                83: cs.color2, // blue
                68: cs.color3, // green
            }

            let distance = getDistancePx(map2[e.keyCode]) - 25;
            if (distance <= 0) {
                distance = 0;
            }
            distance = -distance
            var result = distance == 0 ? "OK" : distance;
            switch (e.keyCode) {
                case 65:
                    setResult1(result);
                    setTimeout(()=>{setResult1()}, 1000)
                    break;
                case 83:
                    setResult2(result);
                    setTimeout(()=>{setResult2()}, 1000)
                    break;
                case 68:
                    setResult3(result);
                    setTimeout(()=>{setResult3()}, 1000)
                    break;
            }
            callback(distance);
        }
    }
    // TODO select test duration

    return (
        <div className={cs.wrapper}>
            <h1>Оценка простых сенсомоторных реакций &nbsp;<div className={cs.underline}>на движущиеся объекты</div></h1>
            <hr/>
            <p>Ваша задача: следить за движующимися объектами, стремясь нажимать кнопку (A), (W), (D) как можно ближе к отмеченным рискам</p>
            <div className={cs.circles__block}>
                <div className={cs.circle}>
                    <div className={[cs.object, cs.object1, cs.color1].join(" ")} style={{animationPlayState: testStarted ? "running" : "paused"}}></div>
                    <div className={[cs.crossline, cs.crossline1, cs.color1].join(" ")}></div>
                    <div className={cs.center}>{result1 ? "Результат: "+result1 : ""}</div>
                </div>
                <div className={cs.circle}>
                    <div className={[cs.object, cs.object2, cs.color2].join(" ")} style={{animationPlayState: testStarted ? "running" : "paused"}}></div>
                    <div className={[cs.crossline, cs.crossline2, cs.color2].join(" ")}></div>
                    <div className={cs.center}>{result2 ? "Результат: "+result2 : ""}</div>
                </div>
                <div className={cs.circle}>
                    <div className={[cs.object, cs.object3, cs.color3].join(" ")} style={{animationPlayState: testStarted ? "running" : "paused"}}></div>
                    <div className={[cs.crossline, cs.crossline3, cs.color3].join(" ")}></div>
                    <div className={cs.center}>{result3 ? "Результат: "+result3 : ""}</div>
                </div>
            </div>

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

export default MovingMultipleCirclesTest;
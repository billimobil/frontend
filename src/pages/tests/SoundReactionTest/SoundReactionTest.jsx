import React, {useState} from 'react';
import cs from "../LightReactionTest/LightReactionTest.module.css";
import Button from "../../../components/UI/Button/Button";
import {useAudio} from "../../../hooks/useAudio";
import {useNavigate} from "react-router-dom";

const SoundReactionTest = ({setResult}) => {
    const navigate = useNavigate();
    var [playing, setPlaying] = useAudio(require('../../../assets/sounds/sound.wav'))

    const [answers, setAnswers] = useState([]) // true/false
    const [reactionsMs, setReactionsMs] = useState([]);
    const [avgReactionMs, setAvgReactionMs] = useState(0)
    const [testStarted, setTestStarted] = useState(false);
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

            startTest()
        })
    }

    function react(callback) {
        document.addEventListener('keydown', onKeyHandler);

        var start;
        var songPlayed = false;
        setTimeout(()=>{
            songPlayed = true
            setPlaying(true)
            start = performance.now()
        }, getRandomInt(1000, 3000))
        function onKeyHandler(e) {
            if (e.keyCode === 87) {
                answers.push(songPlayed)
                setAnswers(answers)

                setPlaying(false)
                var timeSpent = performance.now() - start
                callback(timeSpent)
                document.removeEventListener('keydown', onKeyHandler)
            }
        }

    }
    return (
        <div className={cs.wrapper}>
            <h1>Оценка простых сенсомоторных реакций&nbsp;<div className={cs.underline}>на простой звук</div></h1>
            <hr/>
            <p>Ваша задача: максимально быстро нажать кнопку после звукового сигнала</p>
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

export default SoundReactionTest;
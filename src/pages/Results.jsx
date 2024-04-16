import React from 'react';
import cs from './Results.module.css'
import {NavLink} from "react-router-dom";
const Results = () => {
    return (
        <div className={cs.wrapper}>
            <h1>Тесты</h1>
            <div className={cs.tests}>
                <NavLink to="/results/light-reaction-test">
                    <div className={cs.tests__block}>Реакция на свет</div>
                </NavLink>
                <NavLink to="/results/sound-reaction-test">
                    <div className={cs.tests__block}>Простой звук</div>
                </NavLink>
                <NavLink to="/results/light-complex-reaction-test">
                    <div className={cs.tests__block}>Цветовой тест</div>
                </NavLink>
                <NavLink to="/results/sound-addition-test">
                    <div className={cs.tests__block}>Сложные звуки</div>
                </NavLink>
                <NavLink to="/results/visual-addition-test">
                    <div className={cs.tests__block}>Визуальное сложение</div>
                </NavLink>
                <div className={cs.tests__block}>Движущийся круг</div>
                <div className={cs.tests__block}>Три движущихся круга</div>
            </div>
        </div>
};

export default Results;
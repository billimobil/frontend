import React from 'react';
import cs from './Tests.module.css'
import {NavLink} from "react-router-dom";

const Tests = () => {
    return (
        <div className={cs.wrapper}>
            <h1>Тесты</h1>
            <div className={cs.tests}>
                <NavLink to="/light-reaction-test">
                    <div className={cs.tests__block}>Реакция на свет</div>
                </NavLink>
                <NavLink to="/sound-reaction-test">
                    <div className={cs.tests__block}>Простой звук</div>
                </NavLink>
                <NavLink to="/light-complex-reaction-test">
                    <div className={cs.tests__block}>Цветовой тест</div>
                </NavLink>
                <NavLink to="/sound-addition-test">
                    <div className={cs.tests__block}>Сложные звуки</div>
                </NavLink>
                <NavLink to="/visual-addition-test">
                    <div className={cs.tests__block}>Визуальное сложение</div>
                </NavLink>
                <div className={cs.tests__block}>Движущийся круг</div>
                <div className={cs.tests__block}>Три движущихся круга</div>
                <script src="https://code.responsivevoice.org/responsivevoice.js?key=SepBoBuy"></script>
            </div>
        </div>
    );
};

export default Tests;
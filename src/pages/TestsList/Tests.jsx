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
                <NavLink to="/moving-circle-test">
                    <div className={cs.tests__block}>Движущийся круг</div>
                </NavLink>
                <NavLink to="/moving-multiple-circles-test">
                    <div className={cs.tests__block}>Три движущихся круга</div>
                </NavLink>
                <NavLink to="/moving-object-test">
                    <div className={cs.tests__block}>Слежение за кругом</div>
                </NavLink>
                <NavLink to="/moving-object-with-following">
                    <div className={cs.tests__block}>Преследование круга</div>
                </NavLink>
                <NavLink to={"/easy-thinking-test"}>
                    <div className={cs.tests__block}>Легкое мышление</div>
                </NavLink>
                <NavLink to={"/hard-thinking-test"}>
                    <div className={cs.tests__block}>Сложное мышление</div>
                </NavLink>
            </div>
        </div>
    );
};

export default Tests;
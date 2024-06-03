import React, {useState} from 'react';
import cs from './InfoGraphSelection.module.css'
import {Link, NavLink} from "react-router-dom";
const InfoGraphSelection = () => {
    return (
        <div className={cs.wrapper}>
            <h1 className={cs.underline}>Инфографика тестов</h1>
            <div className={cs.tests}>
                <NavLink to="/infograph/1">
                    <div className={cs.tests__block}>Реакция на свет</div>
                </NavLink>
                <div className={cs.tests__block}>Простой звук</div>
                <div className={cs.tests__block}>Цветовой тест</div>
                <NavLink to="/infograph/4">
                    <div className={cs.tests__block}>Сложные звуки</div>
                </NavLink>
                <div className={cs.tests__block}>Визуальное сложение</div>
                <div className={cs.tests__block}>Движущийся круг</div>
                <div className={cs.tests__block}>Три движущихся круга</div>
                <div className={cs.tests__block}>Простой трекинг</div>
                <div className={cs.tests__block}>Преследование круга</div>
                <NavLink to={"/infograph/10"}>
                    <div className={cs.tests__block}>Легкое мышление</div>
                </NavLink>
                <NavLink to={"/infograph/11"}>
                    <div className={cs.tests__block}>Сложное мышление</div>
                </NavLink>
                <div className={cs.tests__block}>Внимание</div>
                <div className={cs.tests__block}>Кратковременная память</div>
            </div>
        </div>
    );
}

export default InfoGraphSelection;

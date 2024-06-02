import React, { useEffect, useState } from 'react';
import cs from './PVK.module.css';
import Button from '../../components/UI/Button/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Pvk = ({user}) => {
    const { id } = useParams();
    // const [profession, setProfession] = useState(null);
    const [error, setError] = useState('');
    const [clicked, setClicked] = useState([]);
    var pvk = ["Креативность", "Способность к зрительным представлениям",
        "Умственная работоспособность", "Аккуратность", "Глазомер: линейный, угловой, объемный", "Переключаемость внимания", "Образность",
        "Предусмотрительность", "Умение подмечать незначительные изменения", "Способность к распознаванию небольших отклонений параметров по визуальным признакам",
        "Оперативность", "Способность к переводу образа в словесное состояние", "Способность планировать свою деятельность во времени",
        "Зрительная оценка размеров предметов", "Способность к пространственному воображению", "Способность к воссозданию образа по словесному описанию",
        "Способность к распределению внимания между несколькими видами деятельность", "Предметность"]

    return (
        <div className={cs.wrapper}>
            {error ? (
                <div className="error">{error}</div>
            ) : (
                <>
                    <h1 className={cs.head}>Результаты вашего тестирования</h1>

                    <div className={cs.match}>
                        <div className={cs.match__block}>
                            <div className={cs.match__block__item}>Ваша совместимость с профессией: Веб-дизайнер</div>
                            <b><div className={cs.match__block__item}>{getRandomInt(30, 80)}%</div></b>
                        </div>
                        <div className={cs.match__block}>
                            <div className={cs.match__block__item}>Ваша совместимость с профессией: Веб-дизайнер</div>
                            <b><div className={cs.match__block__item}>{getRandomInt(30, 80)}%</div></b>
                        </div>
                        <div className={cs.match__block}>
                            <div className={cs.match__block__item}>Ваша совместимость с профессией: Веб-дизайнер</div>
                            <b><div className={cs.match__block__item}>{getRandomInt(30, 80)}%</div></b>
                        </div>
                    </div>


                    <div className={cs.pvk__block}>
                        {pvk.map((elem) => (
                            <div className={cs.pvk}>
                                <p className={`${cs.pvk__name} ${cs.border}`}>{elem}</p>
                                <p>{getRandomInt(50, 70)}%</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Pvk;

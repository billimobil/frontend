import React from 'react';
import { useParams } from "react-router-dom";
import cs from './ResultsOfTests.module.css';
import { Link } from "react-router-dom";

const ResultsOfTests = () => {
    const {user_id} = useParams();
    const testData = [
        { test_id: 1, name: 'Реакция на свет'},
        { test_id: 2, name: 'Простой звук' },
        { test_id: 3, name: 'Цветовой тест' },
        { test_id: 29, name: 'Сложные звуки' },
        { test_id: 10, name: 'Визуальное сложение' },
        { test_id: 28, name: 'Движущийся круг'},
        { test_id: 7, name: 'Три движущийхся круга'},
        { test_id: 5, name: 'Тест мышления простой' },
        { test_id: 6, name: 'Тест мышления сложный' },
        { test_id: 4, name: 'Простой трекинг'},
        { test_id: 7, name: 'Преследование круга'}
    ];

    return (
        <div className={cs.wrapper}>
            <h1>Результаты теста:</h1>
            <div className={cs.tests}>
                {testData.map((test) => (
                    <Link 
                      to={`/ResultsOfPersonTests/${user_id}/${test.test_id}`}
                      key={test.id} 
                      className={cs.buttonResultsLink}
                    >
                        <div className={cs.buttonResults}>{test.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ResultsOfTests;

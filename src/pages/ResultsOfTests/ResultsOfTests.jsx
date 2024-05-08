import React from 'react';
import cs from './ResultsOfTests.module.css';
import { Link } from "react-router-dom";

const ResultsOfTests = () => {
    const testData = [
        { test_id: 1, name: 'Реакция на свет', path: '/ResultsOfPersonTests' },
        { test_id: 2, name: 'Простой звук', path: '/ResultsOfPersonTests' },
        { test_id: 3, name: 'Цветовой тест', path: '/ResultsOfPersonTests' },
        { test_id: 29, name: 'Сложные звуки', path: '/ResultsOfPersonTests' },
        { test_id: 5, name: 'Визуальное сложение', path: '/ResultsOfPersonTests' },
        { test_id: 28, name: 'Движущийся круг', path: '/ResultsOfPersonTests'},
        { test_id: 7, name: 'Три движущийхся круга', path: '/ResultsOfTests'}
    ];

    

    return (
        <div className={cs.wrapper}>
            <h1>Результаты теста:</h1>
            <div className={cs.tests}>
                {testData.map((test) => (
                    <Link 
                      to={`${test.path}/${test.test_id}`} 
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

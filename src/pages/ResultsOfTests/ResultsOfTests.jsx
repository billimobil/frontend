import React from 'react';
import { useParams } from "react-router-dom";
import cs from './ResultsOfTests.module.css';
import { Link } from "react-router-dom";

const ResultsOfTests = () => {
    const {user_id} = useParams();
    const testData = [
        { test_id: 1, name: 'Реакция на свет', path: '/ResultsOfPersonTests' },
        { test_id: 2, name: 'Простой звук', path: '/ResultsOfPersonTests' },
        { test_id: 3, name: 'Цветовой тест', path: '/ResultsOfPersonTests' },
        { test_id: 29, name: 'Сложные звуки', path: '/ResultsOfPersonTests' },
        { test_id: 10, name: 'Визуальное сложение', path: '/ResultsOfPersonTests' },
        { test_id: 28, name: 'Движущийся круг', path: '/ResultsOfPersonTests'},
        { test_id: 7, name: 'Три движущийхся круга', path: '/ResultsOfPersonTests'},
        { test_id: 5, name: 'Тест мышления простой', path: '/ResultsOfPersonTests' },
        { test_id: 6, name: 'Тест мышления сложный', path: '/ResultsOfPersonTests' },
        { test_id: 4, name: 'Простой трекинг', path: '/ResultsOfPersonTests'},
        { test_id: 7, name: 'Преследование круга', path: '/ResultsOfPersonTests'}
    ];

    return (
        <div className={cs.wrapper}>
            <h1>Результаты теста:</h1>
            <div className={cs.tests}>
                {testData.map((test) => (
                    <Link 
                      to={`${test.path}/${test.test_id}/${user_id}`} 
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

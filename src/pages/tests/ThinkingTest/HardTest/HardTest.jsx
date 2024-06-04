import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cs from './HardTest.module.css';

// Импортируем все необходимые изображения (10 тестов)
// Первый тест
import img27 from './Test1/Component27.svg';
import img28 from './Test1/Component28.svg';
import img29 from './Test1/Component29.svg';
import img30 from './Test1/Component30.svg';
import img32 from './Test1/Component32.svg';
// Второй тест
import img31 from './Test2/Component 31.svg';
import img33 from './Test2/Component 33.svg';
import img34 from './Test2/Component 34.svg';
import img35 from './Test2/Component 35.svg';
import img36 from './Test2/Component 36.svg';
//Третий тест
import img37 from './Test3/Component 37.svg';
import img38 from './Test3/Component 38.svg';
import img39 from './Test3/Component 39.svg';
import img40 from './Test3/Component 40.svg';
import img41 from './Test3/Component 41.svg';
//Четвертый тест
import img42 from './Test4/Component 42.svg';
import img43 from './Test4/Component 43.svg';
import img44 from './Test4/Component 44.svg';
import img45 from './Test4/Component 45.svg';
import img46 from './Test4/Component 46.svg';
//Пятый тест
import img47 from './Test5/Component 47.svg';
import img48 from './Test5/Component 48.svg';
import img49 from './Test5/Component 49.svg';
import img50 from './Test5/Component 50.svg';
import img51 from './Test5/Component 51.svg';
//Шестой тест
import img52 from './Test6/Component 52.svg';
import img53 from './Test6/Component 53.svg';
import img54 from './Test6/Component 54.svg';
import img55 from './Test6/Component 55.svg';
import img56 from './Test6/Component 56.svg';
//Седьмой тест
import img57 from './Test7/Component 57.svg';
import img58 from './Test7/Component 58.svg';
import img59 from './Test7/Component 59.svg';
import img60 from './Test7/Component 60.svg';
import img61 from './Test7/Component 61.svg';
//Восьмой тест
import img62 from './Test8/Component 62.svg';
import img63 from './Test8/Component 63.svg';
import img64 from './Test8/Component 64.svg';
import img65 from './Test8/Component 65.svg';
import img66 from './Test8/Component 66.svg';
//Девятый тест
import img67 from './Test9/Component 67.svg';
import img68 from './Test9/Component 68.svg';
import img69 from './Test9/Component 69.svg';
import img70 from './Test9/Component 70.svg';
import img71 from './Test9/Component 71.svg';
//Десятый тест
import img72 from './Test10/Component 72.svg';
import img73 from './Test10/Component 73.svg';
import img74 from './Test10/Component 74.svg';
import img75 from './Test10/Component 75.svg';
import img76 from './Test10/Component 76.svg';


const HardTest = (user) => {
  // Массив тестов
  const tests = [
    {
      id: 1,
      image: img32,
      pieces: [
        { id: 1, image: img27, isCorrect: false },
        { id: 2, image: img28, isCorrect: true },
        { id: 3, image: img29, isCorrect: false },
        { id: 4, image: img30, isCorrect: false },
      ],
    },
    {
      id: 2,
      image: img31,
      pieces: [
        { id: 1, image: img34, isCorrect: false },
        { id: 2, image: img33, isCorrect: true },
        { id: 3, image: img35, isCorrect: false },
        { id: 4, image: img36, isCorrect: false },
      ],
    },
    {
      id: 3,
      image: img37,
      pieces: [
        { id: 1, image: img39, isCorrect: false },
        { id: 3, image: img40, isCorrect: false },
        { id: 4, image: img41, isCorrect: false },
        { id: 2, image: img38, isCorrect: true },
      ],
    },
    {
      id: 4,
      image: img42,
      pieces: [
        { id: 1, image: img43, isCorrect: true },
        { id: 2, image: img44, isCorrect: false },
        { id: 3, image: img45, isCorrect: false },
        { id: 4, image: img46, isCorrect: false },
      ],
    },
    {
      id: 6,
      image: img47,
      pieces: [
        { id: 1, image: img49, isCorrect: false },
        { id: 2, image: img50, isCorrect: false },
        { id: 3, image: img48, isCorrect: true },
        { id: 4, image: img51, isCorrect: false },
      ],
    },
    {
      id: 6,
      image: img52,
      pieces: [
        { id: 1, image: img54, isCorrect: false },
        { id: 2, image: img55, isCorrect: false },
        { id: 3, image: img56, isCorrect: false },
        { id: 4, image: img53, isCorrect: true },
      ],
    },
    {
      id: 7,
      image: img57,
      pieces: [
        { id: 1, image: img58, isCorrect: true },
        { id: 2, image: img59, isCorrect: true },
        { id: 3, image: img60, isCorrect: false },
        { id: 4, image: img61, isCorrect: false },
      ],
    },
    {
      id: 8,
      image: img62,
      pieces: [
        { id: 1, image: img63, isCorrect: false },
        { id: 2, image: img65, isCorrect: false },
        { id: 3, image: img64, isCorrect: true },
        { id: 4, image: img66, isCorrect: false },
      ],
    },
    {
      id: 9,
      image: img67,
      pieces: [
        { id: 1, image: img68, isCorrect: true },
        { id: 2, image: img69, isCorrect: false },
        { id: 3, image: img70, isCorrect: false },
        { id: 4, image: img71, isCorrect: false },
      ],
    },
    {
      id: 10,
      image: img72,
      pieces: [
        { id: 1, image: img74, isCorrect: false },
        { id: 2, image: img75, isCorrect: false },
        { id: 3, image: img76, isCorrect: false },
        { id: 4, image: img73, isCorrect: true },
      ],
    },
  ];
  const navigate = useNavigate();
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0); // Для отслеживания правильных ответов
  const [result, setResult] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [answersLog, setAnswersLog] = useState([]);
  const react = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const testID = 6;

  const currentTest = tests[currentTestIndex]; // Текущий тест

  const handlePieceClick = (piece) => {
    const testID = 6;
    if (piece.isCorrect) {
      setResult('Правильно!');
      setCorrectAnswers(correctAnswers + 1); // Увеличиваем правильные ответы
        setAnswersLog(prevAnswersLog => [...prevAnswersLog, 1]);
        console.log(answersLog);
        setTimeout(() => {
        setResult(null);
        if (currentTestIndex < tests.length - 1) {
          setCurrentTestIndex(currentTestIndex + 1); // Переход к следующему тесту
        } else {
          // Если это последний тест, отправляем результаты на сервер
          sendResultsToBackend();
        }
      }, 1000); // Задержка перед переходом
    } else {
      setResult('Неправильно.'); // Неправильный выбор
        setAnswersLog(prevAnswersLog => [...prevAnswersLog, 0]);
        console.log(answersLog);
    }
  };

    const sendResultsToBackend =  () => {
        try {
            axios.get("http://188.225.74.17:8080/api/v1/saveUserTestResult", {
                params: {
                    user_id: user.id,
                    session_token: user.session_token,
                    test_id: testID,
                    attempts: JSON.stringify(answersLog),
                    reactions: JSON.stringify(react)
                }
            }).then(resp=>{
                navigate(`/ResultsOfPersonTests/${user.id}/${testID}`);
            })
        } catch (error) {
            console.log("Error sending results: ", error);
        }
    }

  return (
      <div className={cs.wrapper}>
        <h1>Найди недостающую деталь</h1>
        <div className={cs.imageBlock}>
          <img
              src={currentTest.image} // Изображение текущего теста
              alt="Изображение с вырезанной областью"
              className={cs.cutoutImage}
          />
        </div>
        <div className={cs.pieces}>
          {currentTest.pieces.map((piece) => (
              <img
                  key={piece.id}
                  src={piece.image}
                  alt={`Piece ${piece.id}`}
                  className={`${cs.piece} ${selectedPiece === piece ? cs.selected : ''}`} // Выделение выбранного элемента
                  onClick={() => handlePieceClick(piece)}
              />
          ))}
        </div>
        {result && (
            <div className={cs.result}>
              <p>{result}</p> {/* Отображение результата правильного/неправильного выбора */}
            </div>
        )}
      </div>
  );
};

export default HardTest;

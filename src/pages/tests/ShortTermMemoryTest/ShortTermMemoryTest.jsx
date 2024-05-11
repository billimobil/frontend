import React, { useState, useEffect } from 'react';

function ShortTermMemoryTest() {
  const words = ["apple", "tree", "sky", /* Другие слова */];
  const [currentWord, setCurrentWord] = useState('');
  const [userWords, setUserWords] = useState([]);
  const [testStarted, setTestStarted] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (inputVisible) {
      setStartTime(Date.now());
      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }

    return () => clearInterval(timer); // Очистка интервала
  }, [inputVisible, startTime]);

  const startTest = () => {
    setUserWords([]);
    setTestStarted(true);
    setInputVisible(false);
    setElapsedTime(0);
  };

  const handleInputChange = (event) => {
    setCurrentWord(event.target.value.toLowerCase());
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && currentWord) {
      setUserWords(prevUserWords => [...prevUserWords, currentWord]);
      setCurrentWord(''); // Очистка поля ввода
    }
  };

  const finishTest = () => {
    const correctCount = userWords.filter(word => words.includes(word)).length;
    alert("Тест завершен. Вы правильно вспомнили ${correctCount} из ${words.length} слов за ${(elapsedTime / 1000).toFixed(2)} секунд.");
    setTestStarted(false);
    setInputVisible(false);
    clearInterval(startTime); // Остановка таймера
  };

  return (
    <div>
      <h1>Short Term Memory Test</h1>
      {testStarted ? (
        <div>
          {inputVisible ? (
            <>
              <input
                type="text"
                value={currentWord}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                autoFocus
              />
              <button onClick={finishTest}>Finish Test</button>
              <p>Затраченное время: {(elapsedTime / 1000).toFixed(2)} секунд</p>
            </>
          ) : (
            <div>Запомните слова: {words.join(', ')}</div>
          )}
        </div>
      ) : (
        <button onClick={startTest}>Start Test</button>
      )}
    </div>
  );
}

export default ShortTermMemoryTest;
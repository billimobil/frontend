import React, { useState } from 'react';
import cs from './ShortTest.css'
function ShortTermMemoryTest() {
  const words = ["apple", "tree", "sky", /* Другие слова */];
  const [userWords, setUserWords] = useState([]);
  const [testStarted, setTestStarted] = useState(false);

  const startTest = () => {
    setTestStarted(true);
    setTimeout(() => {
      alert("Время запоминания закончилось. Начните вводить слова.");
    }, 60000);  // 1 минута на запоминание
  };

  const handleInput = (event) => {
    setUserWords([...userWords, event.target.value.toLowerCase()]);
    event.target.value = ''; // Очистка поля ввода
  };

  const finishTest = () => {
    const correctCount = userWords.filter(word => words.includes(word)).length;
    alert(`Тест завершен. Вы правильно вспомнили ${correctCount} слов.`);
  };

  return (
    <div>
      <h1>Тест Кратковременной памяти</h1>
      {testStarted ? (
        <>
          <input type="text" onBlur={handleInput} />
          <button onClick={finishTest}>Завершить тест</button>
        </>
      ) : (
        <button onClick={startTest}>Начать тест</button>
      )}
    </div>
  );
}

export default ShortTermMemoryTest;
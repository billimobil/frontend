import React, { useState, useEffect } from 'react';
import cs from 'memoryTest.css';

// Импорт изображений
import img1 from '../../../assets/images/MemoryTest/Снимок экрана 2024-05-14 184904.png';
import img2 from '../../../assets/images/MemoryTest/Снимок экрана 2024-05-14 184853.png';
import img3 from '../../../assets/images/MemoryTest/Снимок экрана 2024-05-14 184847.png';
import img4 from '../../../assets/images/MemoryTest/Снимок экрана 2024-05-14 184840.png';
import img5 from '../../../assets/images/MemoryTest/Снимок экрана 2024-05-14 184834.png';
import img6 from '../../../assets/images/MemoryTest/Снимок экрана 2024-05-14 184859.png';

const imageSources = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  // Добавьте больше импортов изображений по мере необходимости
];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Утилита для получения случайных элементов из массива без дублирования
const getRandomElements = (array, numElements) => {
  const shuffled = shuffleArray([...array]);
  return shuffled.slice(0, numElements);
};

function MemoryTest() {
  const testID = 6;

  const [memorizeImages, setMemorizeImages] = useState([]);
  const [testImages, setTestImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [errors, setErrors] = useState(0);
  const [testStatus, setTestStatus] = useState('memorize'); // memorize, test, success, fail

  const [startTime, setStartTime] = useState(null);
  const [responseTimes, setResponseTimes] = useState([]);

  useEffect(() => {
    // Создаем копию imageSources для избежания дублирования
    let availableImages = [...imageSources];

    // Выбираем случайные изображения для запоминания (5 изображений для примера)
    const selectedMemorizeImages = getRandomElements(availableImages, 5);
    setMemorizeImages(selectedMemorizeImages);

    // Убираем выбранные изображения из доступных
    availableImages = availableImages.filter(img => !selectedMemorizeImages.includes(img));

    // Подготавливаем тестовые изображения (20 изображений для примера) включая те, что нужно запомнить
    const additionalTestImages = getRandomElements(availableImages, 15);
    const allTestImages = shuffleArray([...selectedMemorizeImages, ...additionalTestImages]);
    setTestImages(allTestImages);

    // Показываем изображения для запоминания в течение 5 секунд
    const timer = setTimeout(() => {
      setTestStatus('test');
      setStartTime(Date.now());
    }, 5000); // Отрегулируйте время по необходимости

    // Очищаем таймер, если компонент размонтируется
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = (src) => {
    if (testStatus !== 'test') return;

    const currentTime = Date.now();
    setResponseTimes((prevTimes) => [...prevTimes, currentTime]);

    const isCorrect = memorizeImages.includes(src);

    if (isCorrect) {
      if (!selectedImages.includes(src)) {
        setSelectedImages((prevSelected) => [...prevSelected, src]);
      }
      if (selectedImages.length + 1 === memorizeImages.length) {
        setTestStatus('success');
      }
    } else {
      setErrors((prevErrors) => prevErrors + 1);
      if (errors + 1 >= 3) {
        setTestStatus('fail');
      }
    }
  };

  const calculateTotalTime = () => {
    if (responseTimes.length === 0) return 0;
    return (responseTimes[responseTimes.length - 1] - startTime) / 1000;
  };

  const calculateAverageResponseTime = () => {
    if (responseTimes.length < 2) return 0;
    const timeIntervals = responseTimes.slice(1).map((time, index) => time - responseTimes[index]);
    const averageInterval = timeIntervals.reduce((acc, interval) => acc + interval, 0) / timeIntervals.length;
    return averageInterval / 1000;
  };
  return (
      <div className={cs.memoryTestContainer}>
        {testStatus === 'memorize' && (
            <div>
              <h1>Запомните эти изображения</h1>
              <div className={cs.images}>
                {memorizeImages.map((src, index) => (
                    <img key={index} src={src} alt="" className={cs.image} />
                ))}
              </div>
            </div>
        )}
        {testStatus === 'test' && (
            <div>
              <h1>Выберите запомнившиеся изображения</h1>
              <div className={cs.images}>
                {testImages.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt=""
                        onClick={() => handleImageClick(src)}
                        className={`${cs.image} ${selectedImages.includes(src) ? cs.selected : ''}`}
                    />
                ))}
              </div>
              {errors > 0 && <p>Ошибок: {errors}</p>}
            </div>
        )}
        {testStatus === 'success' && (
            <div>
              <h1>Тест пройден!</h1>
              <p>Общее время: {calculateTotalTime()} секунд</p>
              <p>Среднее время между ответами: {calculateAverageResponseTime()} секунд</p>
            </div>
        )}
        {testStatus === 'fail' && (
            <div>
              <h1>Тест не пройден. Попробуйте снова.</h1>
              <p>Общее время: {calculateTotalTime()} секунд</p>
              <p>Среднее время между ответами: {calculateAverageResponseTime()} секунд</p>
            </div>
        )}
      </div>
  );
}

export default MemoryTest;

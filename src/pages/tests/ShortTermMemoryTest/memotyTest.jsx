import React, { useState, useEffect } from 'react';
import cs from 'src/pages/tests/ShortTermMemoryTest/memoryTest.css'
import Button from "../../../components/UI/Button/Button";
// Example image sources
// Примерные пути к изображениям (24 изображения)
import img1 from '../../../assets/images/MemoryTest/image1.jpg';
import img2 from '../../../assets/images/MemoryTest/image2.jpg';
import img3 from '../../../assets/images/MemoryTest/image3.jpg';
import img4 from '../../../assets/images/MemoryTest/image4.jpg';
import img5 from '../../../assets/images/MemoryTest/image5.jpg';
import img6 from '../../../assets/images/MemoryTest/image6.jpg';
import img7 from '../../../assets/images/MemoryTest/image7.jpg';
import img8 from '../../../assets/images/MemoryTest/image8.jpg';
import img9 from '../../../assets/images/MemoryTest/image9.jpg';
import img10 from '../../../assets/images/MemoryTest/image10.jpg';
import img11 from '../../../assets/images/MemoryTest/image11.jpg';
import img12 from '../../../assets/images/MemoryTest/image12.jpg';
import img13 from '../../../assets/images/MemoryTest/image13.jpg';
import img14 from '../../../assets/images/MemoryTest/image14.jpg';
import img15 from '../../../assets/images/MemoryTest/image15.jpg';
import img16 from '../../../assets/images/MemoryTest/image16.jpg';
import img17 from '../../../assets/images/MemoryTest/image17.jpg';
import img18 from '../../../assets/images/MemoryTest/image18.jpg';
import img19 from '../../../assets/images/MemoryTest/image19.jpg';
import img20 from '../../../assets/images/MemoryTest/image20.jpg';
import img21 from '../../../assets/images/MemoryTest/image21.jpg';
import img22 from '../../../assets/images/MemoryTest/image22.jpg';
import img23 from '../../../assets/images/MemoryTest/image23.jpg';
import img24 from '../../../assets/images/MemoryTest/image24.jpg';

const imageSources = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24,
];
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Utility function to get random elements from an array without duplicates
const getRandomElements = (array, numElements) => {
  const shuffled = shuffleArray([...array]);
  return shuffled.slice(0, numElements);
};

function MemoryTest() {
  const testID = 6;
  const [difficulty, setDifficulty] = useState(null);
  const [memorizeImages, setMemorizeImages] = useState([]);
  const [testImages, setTestImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [errors, setErrors] = useState(0);
  const [testStatus, setTestStatus] = useState('choose'); // choose, memorize, test, success, fail

  const [startTime, setStartTime] = useState(null);
  const [responseTimes, setResponseTimes] = useState([]);

  const handleStartTest = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setTestStatus('memorize');

    let numImages;
    if (selectedDifficulty === 'easy') {
      numImages = 3;
    } else if (selectedDifficulty === 'medium') {
      numImages = 5;
    } else if (selectedDifficulty === 'hard') {
      numImages = 8;
    }

    // Create a copy of imageSources to ensure no duplicates are selected
    let availableImages = [...imageSources];

    // Select random images to memorize
    const selectedMemorizeImages = getRandomElements(availableImages, numImages);
    setMemorizeImages(selectedMemorizeImages);

    // Remove the selected memorize images from the available images
    availableImages = availableImages.filter(img => !selectedMemorizeImages.includes(img));

    // Prepare test images including the ones to memorize
    const additionalTestImages = getRandomElements(availableImages, 22); // до 30 изображений
    const allTestImages = shuffleArray([...selectedMemorizeImages, ...additionalTestImages]);
    setTestImages(allTestImages);

    // Show memorize images for 5 seconds
    setTimeout(() => {
      setTestStatus('test');
      setStartTime(Date.now());
    }, 5000); // Adjust the timing as needed
  };

  const handleImageClick = (src) => {
    if (testStatus !== 'test') return;

    const currentTime = Date.now();
    setResponseTimes([...responseTimes, currentTime]);

    const isCorrect = memorizeImages.includes(src);

    if (isCorrect) {
      if (!selectedImages.includes(src)) {
        setSelectedImages([...selectedImages, src]);
      }
      if (selectedImages.length + 1 === memorizeImages.length) {
        setTestStatus('success');
      }
    } else {
      setErrors(errors + 1);
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
      {testStatus === 'choose' && (
        <div>
          <h1>Выберите сложность</h1>
          <Button onClick={() => handleStartTest('easy')}>Простой</Button>
          <Button onClick={() => handleStartTest('medium')}>Средний</Button>
          <Button onClick={() => handleStartTest('hard')}>Сложный</Button>
        </div>
      )}
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

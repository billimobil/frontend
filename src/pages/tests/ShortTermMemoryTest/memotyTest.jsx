import React, { useState, useEffect } from 'react';
import cs from '../LightReactionTest/LightReactionTest.module.css'
import Button from "../../../components/UI/Button/Button";
// Example image sources
const imageSources = [
  '../src/assets/images/..'
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
  const [memorizeImages, setMemorizeImages] = useState([]);
  const [testImages, setTestImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [errors, setErrors] = useState(0);
  const [testStatus, setTestStatus] = useState('memorize'); // memorize, test, success, fail

  const [startTime, setStartTime] = useState(null);
  const [responseTimes, setResponseTimes] = useState([]);
  
  useEffect(() => {
    // Create a copy of imageSources to ensure no duplicates are selected
    let availableImages = [...imageSources];

    // Select random images to memorize (5-8 images)
    const selectedMemorizeImages = getRandomElements(availableImages, 5);
    setMemorizeImages(selectedMemorizeImages);

    // Remove the selected memorize images from the available images
    availableImages = availableImages.filter(img => !selectedMemorizeImages.includes(img));

    // Prepare test images (20-30 images) including the ones to memorize
    const additionalTestImages = getRandomElements(availableImages, 20);
    const allTestImages = shuffleArray([...selectedMemorizeImages, ...additionalTestImages]);
    setTestImages(allTestImages);

    // Show memorize images for 5 seconds
    setTimeout(() => {
      setTestStatus('test');
      setStartTime(Date.now());
    }, 5000); // Adjust the timing as needed
  }, []);

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
    <div>
      {testStatus === 'memorize' && (
        <div>
          <h1>Запомните эти изображения</h1>
          <div className="images">
            {memorizeImages.map((src, index) => (
              <img key={index} src={src} alt="" />
            ))}
          </div>
        </div>
      )}
      {testStatus === 'test' && (
        <div>
          <h1>Выберите запомнившиеся изображения</h1>
          <div className="images">
            {testImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt=""
                onClick={() => handleImageClick(src)}
                style={{
                  border: selectedImages.includes(src)
                    ? '3px solid green'
                    : ''
                }}
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

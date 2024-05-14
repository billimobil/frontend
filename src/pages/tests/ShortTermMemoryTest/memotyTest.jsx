import React, { useState, useEffect } from 'react';
import cs from '../LightReactionTest/LightReactionTest.module.css'
import Button from "../../../components/UI/Button/Button";
// Example image sources
const imageSources = [
  'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg',
  'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg',
  'img11.jpg', 'img12.jpg', 'img13.jpg', 'img14.jpg', 'img15.jpg',
  'img16.jpg', 'img17.jpg', 'img18.jpg', 'img19.jpg', 'img20.jpg',
  'img21.jpg', 'img22.jpg', 'img23.jpg', 'img24.jpg', 'img25.jpg',
  'img26.jpg', 'img27.jpg', 'img28.jpg', 'img29.jpg', 'img30.jpg'
];

// Utility function to shuffle an array
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

  useEffect(() => {
    // Create a copy of imageSources to ensure no duplicates are selected
    let availableImages = [...imageSources];

    // Select random images to memorize (5 images)
    const selectedMemorizeImages = getRandomElements(availableImages, 5);
    setMemorizeImages(selectedMemorizeImages);

    // Remove the selected memorize images from the available images
    availableImages = availableImages.filter(img => !selectedMemorizeImages.includes(img));

    // Prepare test images (30 images) including the ones to memorize
    const additionalTestImages = getRandomElements(availableImages, 30);
    const allTestImages = shuffleArray([...selectedMemorizeImages, ...additionalTestImages]);
    setTestImages(allTestImages);

    // Show memorize images for 5 seconds
    setTimeout(() => {
      setTestStatus('test');
    }, 10000); // Adjust the timing as needed
  }, []);

  const handleImageClick = (src) => {
    if (testStatus !== 'test') return;

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
      {testStatus === 'success' && <h1>Тест пройден!</h1>}
      {testStatus === 'fail' && <h1>Тест не пройден. Попробуйте снова.</h1>}
    </div>
  );
}

export default MemoryTest;

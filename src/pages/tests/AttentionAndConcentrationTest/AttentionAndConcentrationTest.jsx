import React, { useState, useEffect } from 'react';
import styles from "./AACT.module.css";

export const AttentionAndConcentrationTest = ({ className, ...props }) => {
    const testID = 11;

    const [difficulty, setDifficulty] = useState("Простой");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showDifficultyOptions, setShowDifficultyOptions] = useState(true);
    const [showConfirmationButton, setShowConfirmationButton] = useState(true);
    const [isTestRunning, setIsTestRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [targetDigit, setTargetDigit] = useState(null); // Цифра, которую пользователь должен выбрать
    const [numbers, setNumbers] = useState([]); // Массив чисел для отображения
    const [selectedNumbers, setSelectedNumbers] = useState([]); // Выбранные пользователем числа
    const [correctAnswers, setCorrectAnswers] = useState(0); // Количество правильных ответов
    const [result, setResult] = useState(0); // Итоговый результат
    const [examplesLeft, setExamplesLeft] = useState(9); // Количество оставшихся примеров
    const [initialExamplesLeft] = useState(9); // Изначальное количество оставшихся примеров
    const [concentrationChecking, setConcentrationChecking] = useState(false); // Проверка концентрации
    const [concCheckCount, setConcCheckCount] = useState(0); // Количество проверок концентрации
    const [concentrationNumber, setConcentrationNumber] = useState(0); // Число для проверки концентрации
    const [concentrationInput, setConcentrationInput] = useState(''); // Ввод от пользователя
    const [correctConcentrationAnswers, setCorrectConcentrationAnswers] = useState(0); // Количество правильных ответов при проверке концентрации

    const updateResult = (value) => {
        setResult(prevResult => prevResult + value);
    };

    useEffect(() => {
        if (isTestRunning) {
            const digit = Math.floor(Math.random() * 9) + 1; // От 1 до 9
            setTargetDigit(digit);

            const generatedNumbers = Array.from({ length: difficulty === "Простой" ? 10 : 20 }, () => Math.floor(Math.random() * 90) + 10); // От 10 до 99
            setNumbers(generatedNumbers);
        }
    }, [isTestRunning, difficulty]);

    const handleCheckingButtonClick = () => {
        const remainingExamples = examplesLeft - 1;
        setExamplesLeft(remainingExamples);

        const correctAnswersArray = numbers.filter((number) => String(number).startsWith(targetDigit));

        const allSelectedAreCorrect = selectedNumbers.every((number) =>
            correctAnswersArray.includes(number)
        );

        let res = 0;
        if ((selectedNumbers.length === 0 && correctAnswersArray.length === 0) || (allSelectedAreCorrect)) {
            res = 1;
        }

        updateResult(res);

        if (remainingExamples === 0) {
            finishTest();
        } else {
            concentrationCheckStart();

            const digit = Math.floor(Math.random() * 9) + 1; // От 1 до 9
            setTargetDigit(digit);
            const generatedNumbers = Array.from({ length: difficulty === "Простой" ? 10 : 20 }, () => Math.floor(Math.random() * 90) + 10); // От 10 до 99
            setNumbers(generatedNumbers);

            setSelectedNumbers([]);
        }
    };

    useEffect(() => {
        if (!isTestRunning) return;

        const timer = setInterval(() => {
            setElapsedTime(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isTestRunning]);

    const handleNumberClick = (number) => {
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
        } else {
            setSelectedNumbers([...selectedNumbers, number]);
        }
    };

    const startTest = () => {
        setIsTestRunning(true);
        setElapsedTime(0);
    };

    const finishTest = () => {
        setIsTestRunning(false);
        resetExamplesLeft();
        alert(`Тест завершен!\nРезультат: ${result}\nПрошедшее время: ${elapsedTime} сек.\nОчков концентрации: ${correctConcentrationAnswers}`);
    };

    const resetExamplesLeft = () => {
        setExamplesLeft(initialExamplesLeft);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(true);
    };

    const handleDifficultyChange = (selectedDifficulty) => {
        setDifficulty(selectedDifficulty);
        setIsDropdownOpen(false);
    };

    const handleConfirmationButtonClick = () => {
        setShowDifficultyOptions(false);
        setShowConfirmationButton(false);
        setExamplesLeft(prevExamplesLeft => prevExamplesLeft - 1);
        startTest();
    };

    const handleConcentrationCheckingClick = () => {
        const countInGeneratedNumbers = numbers.reduce((acc, number) => {
            const digits = String(number).split('');
            const countInNumber = digits.filter(digit => parseInt(digit) === concentrationNumber).length;
            return acc + countInNumber;
        }, 0);

        if (countInGeneratedNumbers === parseInt(concentrationInput)) {
            setCorrectConcentrationAnswers(prevCorrectConcentrationAnswers => prevCorrectConcentrationAnswers + 1);
        }

        setConcentrationInput('');
        setConcentrationChecking(false);
    }

    const updateConcCheckCount = () => {
        setConcCheckCount(prevConcCheckCount => prevConcCheckCount + 1);
    }

    const concentrationCheckStart = () => {
        if (examplesLeft <= initialExamplesLeft && Math.random() < 0.5 && concCheckCount < 2) {
            updateConcCheckCount();
            setConcentrationNumber(Math.floor(Math.random() * 10));
            setConcentrationChecking(true);
        } else {
            setConcentrationChecking(false);
        }
    }

    return (
        <div className={styles.div + " " + className}>
            <div className={styles.testName}>Тест на внимание</div>
            <div className={styles.lineUnderTestName}></div>
            {(isTestRunning && !concentrationChecking) && (
                <div className={styles.testDescription}>
                    Выберите все числа, начинающиеся на цифру:
                    <div className={styles.numberSquareDescription}>{targetDigit}</div>
                </div>
            )}

            {(!isTestRunning && !concentrationChecking) && (
                <div className={styles.testDescription}>
                    Выберите все числа, начинающиеся на заданную цифру. Запоминайте демонстрируемые числа.
                </div>
            )}

            {(isTestRunning && concentrationChecking) && (
                <div className={styles.testDescription}>
                    Введите количество {concentrationNumber} внутри чисел на прошлом шаге. Пример: ответу 3 для цифры 6 соответствует 51 65 66
                </div>
            )}

            {!isTestRunning && (
                <div className={styles.startAndCheckButton} onClick={handleConfirmationButtonClick}>Подтвердить</div>
            )}
            <div className={styles.examplesLeft}>Осталось примеров: {examplesLeft}</div>

            {isTestRunning && <div className={styles.timer}>Прошедшее время: {elapsedTime} сек.</div>}

            {isTestRunning && !concentrationChecking && (
                <div className={styles.numbersContainer}>
                    {numbers.map((number, index) => (
                        <div
                            key={index}
                            className={`${styles.numberSquare} ${selectedNumbers.includes(number) ? styles.selected : ""}`}
                            onClick={() => handleNumberClick(number)}
                        >
                            {number}
                        </div>
                    ))}
                </div>
            )}

            {!isTestRunning && (
                <div>
                    <div className={styles.textChooseDiff}>Выберите сложность теста</div>
                    <div className={styles.chooseDifficult} onClick={handleDropdownToggle}>
                        {difficulty}
                    </div>
                    {isDropdownOpen && (
                        <div className={styles.dropdown}>
                            <div className={styles.dropdownItem}
                                 onClick={() => handleDifficultyChange("Простой")}>Простой
                            </div>
                            <div className={styles.dropdownItem}
                                 onClick={() => handleDifficultyChange("Сложный")}>Сложный
                            </div>
                        </div>
                    )}
                </div>
            )}
            {isTestRunning && !concentrationChecking && (
                <div className={styles.startAndCheckButton} onClick={handleCheckingButtonClick}>Проверить</div>
            )}
            {concentrationChecking && (
                <div className={styles.startAndCheckButton} onClick={handleConcentrationCheckingClick}>Проверить концентрацию</div>
            )}
            {concentrationChecking && (
                <input
                    type='number'
                    className={styles.concentrationInput}
                    value={concentrationInput}
                    onChange={(e) => setConcentrationInput(e.target.value)}
                />
            )}
        </div>
    );
};

export default AttentionAndConcentrationTest;

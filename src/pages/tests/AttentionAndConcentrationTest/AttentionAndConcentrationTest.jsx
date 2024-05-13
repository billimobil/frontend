import React, { useState, useEffect } from 'react';
import styles from "./AACT.module.css";

export const AttentionAndConcentrationTest = ({ className, ...props }) => {
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
    const [result, setResult] = useState(0);
    const [examplesLeft, setExamplesLeft] = useState(9); // Количество оставшихся примеров
    const [initialExamplesLeft] = useState(examplesLeft); // Изначальное количество оставшихся примеров

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
        setExamplesLeft(prevExamplesLeft => prevExamplesLeft - 1);

        const correctAnswers = numbers.filter((number) => String(number).startsWith(targetDigit));

        const allSelectedAreCorrect = selectedNumbers.every((number) =>
            correctAnswers.includes(number)
        );

        let res = 0;
        if ((selectedNumbers.length === 0 && correctAnswers.length === 0) || (allSelectedAreCorrect)) {
            res = 1; // Если оба массива пустые или содержат одинаковое количество элементов и все элементы совпадают, результат 1
        }

        updateResult(res);

        const digit = Math.floor(Math.random() * 9) + 1; // От 1 до 9
        setTargetDigit(digit);
        const generatedNumbers = Array.from({ length: difficulty === "Простой" ? 10 : 20 }, () => Math.floor(Math.random() * 90) + 10); // От 10 до 99
        setNumbers(generatedNumbers);

        setSelectedNumbers([]);

        if (examplesLeft === 0) {
            updateResult(res);
            finishTest();
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
        resetExamplesLeft()
        setCorrectAnswers(result)
        alert(`Тест завершен!\nРезультат: ${correctAnswers}\nПрошедшее время: ${elapsedTime} сек.`);
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
        if (difficulty === "Простой") {
            setShowDifficultyOptions(false);
            setShowConfirmationButton(false);
            setExamplesLeft(prevExamplesLeft => prevExamplesLeft - 1);
            startTest();
        } else if (difficulty === "Сложный") {
            setShowDifficultyOptions(false);
            setShowConfirmationButton(false);
            setExamplesLeft(prevExamplesLeft => prevExamplesLeft - 1);
            startTest();
        }
    };

    return (
        <div className={styles.div + " " + className}>
            <div className={styles.testName}>Тест на внимание</div>
            {isTestRunning && (
                <div className={styles.testDescription}>
                    Выберите все числа, начинающиеся на цифру:
                    <div className={styles.numberSquareDescription}>{targetDigit}</div>
                </div>
            )}
            {!isTestRunning && (
                <div className={styles.testDescription}>
                    Выберите все числа, начинающиеся на заданную цифру. Запоминайте
                    демонстрируемые числа.</div>
            )}
            <div className={styles.lineUnderTestName}></div>

            {!isTestRunning && (
                <div className={styles.startAndCheckButton} onClick={handleConfirmationButtonClick}>Подтвердить</div>
            )}
            <div className={styles.examplesLeft}>Осталось примеров: {examplesLeft}</div>
            {isTestRunning && <div className={styles.timer}>Прошедшее время: {elapsedTime} сек.</div>}
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
            {isTestRunning && (
                <div className={styles.startAndCheckButton} onClick={handleCheckingButtonClick}>Проверить</div>
            )}
        </div>
    );
};

export default AttentionAndConcentrationTest;

export const MovingObjectWithFollowing = ({ className, ...props }) => {
     const [speed, setSpeed] = useState(5); // Увеличили скорость красного кружка
     const [isTestRunning, setIsTestRunning] = useState(false); // Флаг запуска теста
     const [timeLeft, setTimeLeft] = useState(15); // Время, оставшееся до окончания теста
     const [redCirclePosition, setRedCirclePosition] = useState({ x: 0, y: 0 }); // Позиция красного кружка
     const [greenCirclePosition, setGreenCirclePosition] = useState({ x: 0, y: 0 }); // Позиция зеленого кружка
     const [redCircleDirection, setRedCircleDirection] = useState(1); // Направление движения красного кружка
     const [minutes, setMinutes] = useState(0); // Количество минут
     const [seconds, setSeconds] = useState(15); // Количество секунд
 
     useEffect(() => {
         // Обновляем позиции кругов по центру после отрисовки компонента
         const centerX = window.innerWidth / 2;
         const centerY = window.innerHeight / 2 + 35; // Опускаем на N px вниз (16 на моем пк)
         setRedCirclePosition({ x: centerX, y: centerY });
         setGreenCirclePosition({ x: centerX, y: centerY });
     }, []);
 
     useEffect(() => {
         // Обновляем таймер каждую секунду, если тест запущен
         const timer = setTimeout(() => {
             if (isTestRunning && timeLeft > 0) {
                 setTimeLeft(prevTime => prevTime - 1);
             }
         }, 1000);
 
         // Остановить таймер, если время вышло или тест не запущен
         if (!isTestRunning || timeLeft === 0) {
             clearTimeout(timer);
         }
 
         return () => clearTimeout(timer);
     }, [isTestRunning, timeLeft]);
 
     useEffect(() => {
         // Функция для изменения позиции красного кружка каждую секунду
         const interval = setInterval(() => {
             if (isTestRunning) {
                 // Генерируем случайное число от 0 до 1
                 const random = Math.random();
                 // Если число меньше 0.02, меняем направление движения красного кружка
                 if (random < 0.02) {
                     setRedCircleDirection(prevDirection => -prevDirection);
                 }
                 // Изменяем только горизонтальную позицию красного кружка
                 setRedCirclePosition(prevPosition => {
                     let newX = prevPosition.x + redCircleDirection * speed;
                     // Ограничиваем позицию кружка, чтобы он не мог подойти близко к краю экрана
                     newX = Math.min(window.innerWidth - 280, Math.max(280, newX));
                     return { ...prevPosition, x: newX };
                 });
             }
         }, 1000 / 60); // Обновляем каждый кадр для плавного движения
 
         // Остановить движение красного кружка, если время вышло или тест не запущен
         if (!isTestRunning || timeLeft === 0) {
             clearInterval(interval);
         }
 
         return () => clearInterval(interval);
     }, [speed, isTestRunning, redCircleDirection, timeLeft, greenCirclePosition]);
 
     // Функция для обновления позиции зеленого кружка в зависимости от позиции курсора
     const handleMouseMove = (e) => {
         if (isTestRunning) {
             // Обновляем только горизонтальную позицию зеленого кружка в соответствии с позицией курсора
             setGreenCirclePosition(prevPosition => {
                 return { ...prevPosition, x: e.clientX };
             });
         }
     };
 
     // Функция запуска теста
     const startTest = () => {
         setIsTestRunning(true);
         setTimeLeft(minutes * 60 + seconds); // Преобразуем минуты и секунды в секунды
     };
 
     return (
         <div className={styles.div + " " + className} onMouseMove={handleMouseMove}>
             <div className={styles.rectangle47}></div>
             <div className={styles.div2}>Выйти</div>
             <div className={styles.div3}>Оценка слежения с преследованием</div>
             <div className={styles.div4}>
                 Ваша задача: следить курсором за движущимся объектом, стремясь держать
                 зеленый кружок как можно ближе к центру объекта
             </div>
             <div className={styles.centralRectangle}></div>
             <div
                 className={styles.one2Cm}>Дистанция: {Math.abs(redCirclePosition.x - greenCirclePosition.x).toFixed(2)}px
             </div>
             {/* Поля для ввода минут и секунд */}
             <div className={styles.div8}>мин:</div>
             <input
                 type="number"
                 className={styles.minutesRectangle}
                 value={minutes}
                 onChange={(e) => setMinutes(e.target.value)}
             />
             <div className={styles.div9}>сек:</div>
             <input
                 type="number"
                 className={styles.secondsRectangle}
                 value={seconds}
                 onChange={(e) => setSeconds(e.target.value)}
             />
             {/* Условный рендеринг для кнопки запуска теста */}
             {!isTestRunning && (
                 <button className={styles.startButton} onClick={startTest}>Start Test</button>
             )}
             <div className={styles.div7}>Выберите длительность теста</div>
             {/* Отображение красного и зеленого кружков */}
             <div className={styles.redEllipse}
                  style={{left: `${redCirclePosition.x}px`, top: `${redCirclePosition.y}px`}}></div>
             <div className={styles.greenEllipse}
                  style={{left: `${greenCirclePosition.x}px`, top: `${greenCirclePosition.y}px`}}></div>
             <div className={styles.timeLasts}>Осталось секунд: {timeLeft}</div>
             <img className={styles.logo} src="vector0.svg"/>
             <div className={styles.div5}>Эксперты</div>
         </div>
     );
 };
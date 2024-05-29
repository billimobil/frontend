import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Это гарантирует, что Chart.js инициализирован правильно

function GraphPage() {
  const { id } = useParams();
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/getGraph/${id}`);
        const data = response.data.data;
        
        if (data && data.male && data.female) {
          const maleData = data.male;
          const femaleData = data.female;

          const labels = Array.from({ length: Math.max(maleData.length, femaleData.length) }, (_, i) => `Точка ${i + 1}`);
          
          const maleAccuracies = maleData.map(item => item.avg_reaction_time_ms);
          const maleColors = maleData.map(item => item.color);
          
          const femaleAccuracies = femaleData.map(item => item.avg_reaction_time_ms);
          const femaleColors = femaleData.map(item => item.color);
          
          setChartData({
            labels,
            datasets: [
              {
                label: 'Мужчины',
                data: maleAccuracies,
                borderColor: 'transparent', // Скрыть линию
                backgroundColor: 'transparent', // Скрыть фон линии
                pointBackgroundColor: maleColors,
                pointBorderColor: maleColors,
                showLine: false, // Показать только точки
              },
              {
                label: 'Женщины',
                data: femaleAccuracies,
                borderColor: 'transparent', // Скрыть линию
                backgroundColor: 'transparent', // Скрыть фон линии
                pointBackgroundColor: femaleColors,
                pointBorderColor: femaleColors,
                showLine: false, // Показать только точки
              }
            ]
          });

          console.log('Данные мужчин:', maleData);
          console.log('Данные женщин:', femaleData);

        } else {
          console.error('Неверный формат данных:', data);
        }
      } catch (error) {
        console.error('Ошибка получения данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h1>Тест {id}</h1>
      {loading ? <p>Загрузка данных...</p> : <Line data={chartData} />}
    </div>
  );
}

export default GraphPage;

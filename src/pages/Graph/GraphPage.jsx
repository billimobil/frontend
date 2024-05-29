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
        const maleResponse = await axios.get(`/api/v1/gettest/male/${id}`);
        const femaleResponse = await axios.get(`/api/v1/gettest/female/${id}`);

        const maleData = maleResponse.data;
        const femaleData = femaleResponse.data;

        if (Array.isArray(maleData) && Array.isArray(femaleData)) {
          const labels = Array.from({ length: maleData.length }, (_, i) => `Точка ${i + 1}`);

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
                borderColor: 'transparent', // Hide the line
                backgroundColor: 'transparent', // Hide the line background
                pointBackgroundColor: maleColors,
                pointBorderColor: maleColors,
                showLine: false, // Ensure only points are shown
              },
              {
                label: 'Женщины',
                data: femaleAccuracies,
                borderColor: 'transparent', // Hide the line
                backgroundColor: 'transparent', // Hide the line background
                pointBackgroundColor: femaleColors,
                pointBorderColor: femaleColors,
                showLine: false, // Ensure only points are shown
              }
            ]
          });

          // Optionally, log additional fields for debugging or further use
          console.log('Male Data:', maleData);
          console.log('Female Data:', femaleData);

        } else {
          console.error('Неверный формат данных:', maleData, femaleData);
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

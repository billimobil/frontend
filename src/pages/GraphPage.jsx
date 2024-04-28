import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function GraphPage() {
  const { id } = useParams();
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios.get(`api/v1/gettest/${id}`)
      .then(response => {
        const { data } = response;
        const labels = data.map(item => item.time);
        const maleData = data.map(item => item.maleAccuracy);
        const femaleData = data.map(item => item.femaleAccuracy);
        setChartData({
          labels,
          datasets: [
            {
              label: 'Мужчины',
              data: maleData,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
            {
              label: 'Женщины',
              data: femaleData,
              borderColor: 'red',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }
          ]
        });
      })
      .catch(error => console.error('Ошибка получения данных:', error));
  }, [id]);

  return (
    <div>
      <h1>Тест {id}</h1>
      <Line data={chartData} />
    </div>
  );
}

export default GraphPage;
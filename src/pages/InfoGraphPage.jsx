import React, {useState} from 'react';
import cs from './InfoGraphPage.module.css'
import {Link} from "react-router-dom";
const InfoGraphPage = () => {
    return (
        <div className={cs.wrapper}>
            <h1>Инфографика тестов</h1>
            <div style={{ display: 'flex', gap: '10px', padding: '20px' }}>
          <Link key={0} to={`/admin/graph/1`}>
            <button style={{ padding: '20px', fontSize: '20px' }}>Реакция на свет</button>
          </Link>
          <Link key={1} to={`/admin/graph/2`}>
            <button style={{ padding: '20px', fontSize: '20px' }}>Простой звук</button>
          </Link>
          <Link key={2} to={`/admin/graph/3`}>
            <button style={{ padding: '20px', fontSize: '20px' }}>Цветной тест</button>
          </Link>
          <Link key={3} to={`/admin/graph/4`}>
            <button style={{ padding: '20px', fontSize: '20px' }}>Сложные звуки</button>
          </Link>
          <Link key={4} to={`/admin/graph/5`}>
            <button style={{ padding: '20px', fontSize: '20px' }}>Визуальное сложение</button>
          </Link>
          <Link key={5} to={`/admin/graph/6`}>
            <button style={{ padding: '20px', fontSize: '20px' }}>Движущийся круг</button>
          </Link>
          <Link key={6} to={`/admin/graph/7`}>
            <button style={{ padding: '20px', fontSize: '20px' }}>Три движущихся круга</button>
          </Link>
      </div>
    </div>
    );
}

export default InfoGraphPage;

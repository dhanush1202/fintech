import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
// const API_KEY = '033E7T7VLP3WQPM4';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  
    const [stockPrice, setStockPrice] = useState('');
    const [stockChart, setStockChart] = useState([]);
    const [news, setNews] = useState([]);
  
    useEffect(() => {
      // Fetch stock price
      axios.get(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/2023-01-09/2023-01-19?adjusted=true&sort=asc&limit=70&apiKey=SzIxl97LS_SPzFl3LX3K9ydpoyvILxWC`)
        .then(response => {
          const data = response.data['results'];
          setStockPrice(data[3]["h"]);
          const times = Object.keys(data);
          console.log(data);
          const prices = times.map(time => parseFloat(data[time]['o']));
          setStockChart({ times, prices });
        //   console.log(stockPrice);
        })
        .catch(error => console.error('Error fetching stock price:', error));
  
      
      // Fetch news
      axios.get(`https://jsonplaceholder.typicode.com/posts`)
        .then(response => {
          setNews(response.data);
        })
        .catch(error => console.error('Error fetching news:', error));
    }, []);
  
    return (
      <div className='w-full min-h-screen pt-[90px]'>
        <h1 className='md:text-2xl text-3xl text-center uppercase font-semibold font-serif'>TATA Motors Stock Dashboard</h1>
        <h2 className='px-10 my-5 text-xl uppercase'>Stock Price: <span className='text-red-500 text-xl'> {stockPrice} </span></h2>
        <div className='w-[90%] h-[90%] flex m-auto justify-center '>
          <Line className='hover:bg-slate-100 rounded-2xl hover:scale-105  duration-300 hover:shadow-2xl p-4'
            data={{ 
              labels: stockChart.times,
              datasets: [
                {
                  label: 'Stock Price',
                  data: stockChart.prices,
                  backgroundColor: 'rgba(75,192,192,0.2)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderWidth: 2,
                //   fill: true,
                },
              ],
            }}
          />
        </div>
        <h2>Latest News</h2>
        <ul>
          {news.map((article, index) => (
            <li key={index} className='p-5'>
             <p className='px-5 py-1 text-2xl text-neutral-900'>
                 {article.title} 
                </p>
                <p className='px-10 py-1 text-lg text-slate-800'>
                {article.body}

                </p>
              
            </li>
          ))}
        </ul>
      </div>
  )
}


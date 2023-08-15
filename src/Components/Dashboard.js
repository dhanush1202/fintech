import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import { useAsyncError } from "react-router-dom";

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
 
  const [stockPrice, setStockPrice] = useState("");
  const [stockChart, setStockChart] = useState([]);
  const [news, setNews] = useState([]);
  const userState = useSelector((state) => state.user);
  const { userobj } = userState;
  const [ load, setload] = useState(true);
  if(load){
    setload(!load);
    fetchData();
  }
 async function fetchData(){
    await axios
       .get(
         `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/2023-01-09/2023-01-19`,
         {
           params: {
             adjusted: true,
             sort: "asc",
             limit: 70,
             apiKey: "SzIxl97LS_SPzFl3LX3K9ydpoyvILxWC",
           },
         }
       )
       .then((response) => {
         const data = response.data["results"];
         setStockPrice(data[3]["h"]);
         const times = Object.keys(data);
         const prices = times.map((time) => parseFloat(data[time]["o"]));
         setStockChart({ times, prices });
       })
       .catch((error) => console.error("Error fetching stock price:", error));

   await axios
       .get(`https://jsonplaceholder.typicode.com/posts`, {
         params: {
           adjusted: true,
           sort: "asc",
           limit: 4,  
         },
       })
       .then((response) => {
         setNews(response.data);
       })
       .catch((error) => console.error("Error fetching news:", error));
   
 };
  useEffect(() => {
    
    
  }, []); 

 
  return (
    <div className="w-full min-h-screen pt-[90px]">
      <div className="w-full min-h-screen pt-[90px]">
        <h1 className="md:text-2xl text-3xl text-center uppercase font-semibold font-serif">
          TATA Motors Stock Dashboard
        </h1>
        <h2 className="px-10 my-5 text-xl uppercase">
          Stock Price:{" "}
          <span className="text-red-500 text-xl"> {stockPrice} </span>
        </h2>
        <div className="w-[90%] h-[90%] flex m-auto justify-center ">
          <Line
            className="hover:bg-slate-100 rounded-2xl hover:scale-105  duration-300 hover:shadow-2xl p-4"
            data={{
              labels: stockChart.times,
              datasets: [
                {
                  label: "Stock Price",
                  data: stockChart.prices,
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "rgba(75,192,192,1)",
                  borderWidth: 2,
                  //   fill: true,
                },
              ],
            }}
          />
        </div>
        <h2 className="text-center font-bold uppercase text-3xl p-5 m-1">Latest News</h2>
        <ul className="flex flex-wrap w-full justify-center">
          {news.map((article, index) => (
            <li key={index} className="p-1 w-[20%] h-[300px] border-2 border-black m-1 rounded-lg overflow-hidden">
              <p className="px-5 py-1 text-2xl text-neutral-900">
                {article.title}
              </p>
              <p className="px-5 py-1 text-sm text-neutral-900">
                {article.body}
              </p>
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

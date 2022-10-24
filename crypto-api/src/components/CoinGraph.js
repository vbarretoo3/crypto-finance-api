import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useAxios from './useAxios';
import moment from 'moment';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

function CoinGraph() {
    const {id} = useParams()
    const [interval, setInterval] = useState(7)
    const { response } = useAxios(`coins/${id}/market_chart?vs_currency=usd&days=${interval}`);

    if(!response) return null
  
    const options = {
        responsive: true
    }

    function handleIntervalChage(parm) {
        setInterval(parm)
        console.log(parm)
    }
    
    const coinChartData = response.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));

    const data = {
        labels: coinChartData.map(value => moment(value.x).format('MMM DD HH:mm')),
        datasets: [
        {
            fill: true,
            label: id,
            data: coinChartData.map(val => val.y),
            borderColor: 'rgb(23, 138, 23)',
            backgroundColor: 'rgba(38, 179, 38, 0.4)',
        }
        ]
    }


    return (
    <>
        <div className='interval-selector'>
            <button onClick={() => handleIntervalChage(1)} className='interval'>1 days</button>
            <button onClick={() => handleIntervalChage(7)} className='interval'>7 days</button>
            <button onClick={() => handleIntervalChage(30)} className='interval'>1 month</button>
            <button onClick={() => handleIntervalChage(180)} className='interval'>6 months</button>
            <button onClick={() => handleIntervalChage(365)} className='interval'>1 year</button>
        </div>
        <Line options={options} data={data}/>
    </>
    )
}

export default CoinGraph
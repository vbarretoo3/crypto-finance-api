import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai';
import CoinGraph from '../CoinGraph';

export default function Coin() {
  const {id} = useParams()
  const [data, setData] = useState(null)
  const url = `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=false&developer_data=true&sparkline=true`

  useEffect(() => {
    axios.get(url).then(response => {
      setData(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  if (!data) return null
  
  return (
    <>
      <div className='description'>
        <div className='description-header'>
          <img className='header-image' src={data.image.small} alt='/'/>
          <h1 className='title'>{data.name}</h1>
        </div>
        <div className='description-subheader'>
          <h2>Current Price: ${data.market_data.current_price.usd.toLocaleString()}</h2>
          <h2>Daily Price Change: <span className={data.market_data.price_change_percentage_24h < 0 ? 'negative': 'positive'}>{data.market_data.price_change_percentage_24h.toFixed(2)}%</span></h2>
        </div>
        <h4>Coin description:</h4>
        <p dangerouslySetInnerHTML={{__html: data.description.en}} className='coin-description'></p>
        <div className='graphs'>
          <CoinGraph />
        </div>
        <div className='coin-info'>
          {data.market_data.high_24h ? 
          <div className='coin-info-row'>
            <h4>
              24 Hours High/Low:
            </h4>
            <p>
              ${data.market_data.high_24h.usd.toLocaleString()} / ${data.market_data.low_24h.usd.toLocaleString()}
            </p>
          </div>: null}
          {data.market_data.total_supply ? 
          <div className='coin-info-row'>
            <h4>
              Total Supply in {data.name}:
            </h4>
            <p>
              {data.market_data.total_supply.toLocaleString()} {data.symbol}
            </p>
          </div>: null}
          {data.market_data.market_cap.usd ? 
          <div className='coin-info-row'>
            <h4>
              Market Cap:
            </h4>
            <p>
              ${data.market_data.market_cap.usd.toLocaleString()}
            </p>
          </div>: null}
          {data.market_data.market_cap_rank ? 
          <div className='coin-info-row'>
            <h4>
              Market Cap Rank:
            </h4>
            <p>
              {data.market_data.market_cap_rank}
            </p>
          </div> : null}
          {data.links.homepage[0] ? 
          <div className='coin-info-row'>
            <h4>
              Website:
            </h4>
            <p>
              <a href={data.links.homepage[0]}>
                {data.links.homepage[0]}
              </a>
            </p>
          </div> : null}
          <div className='coin-info-row-different'>
            <h4 className='coin-info-title'>Public Review</h4>
            <p className='coin-info-positive'>
              <AiOutlineLike className='review'/> {data.sentiment_votes_up_percentage}%
            </p>
            <p className='coin-info-negative'>
              <AiOutlineDislike className='review'/> {data.sentiment_votes_down_percentage}%
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

  console.log(data)
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
      </div>
    </>
  )
}

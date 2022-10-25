import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CoinDetails from '../../components/CoinDetails'

export default function Coins() {
  const [data, setData] = useState(null)
  const list = []
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${list}&order=market_cap_desc&per_page=100&page=1&sparkline=false`

  useEffect(() => {
    axios.get(url).then(response => {
      setData(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  if (!data) return null

  return (
    <div className="coins">
      {data && data.map(coin => <CoinDetails key={coin.id} coin={coin}/>)}
    </div>
  )
}

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CoinDetails from '../../components/CoinDetails'

export default function Coins() {
  const [data, setData] = useState(null)

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20cardano%2C%20celo%2C%20tether%2C%20dogecoin%2C%20hedera%2C%20litecoin%2C%20decentraland%2C%20ripple%2C%20filecoin%2C%20gala%2C%20chainlink%2C%20solana%2C%20bnb%2C%20usd%20coin&order=market_cap_desc&per_page=100&page=1&sparkline=false`

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

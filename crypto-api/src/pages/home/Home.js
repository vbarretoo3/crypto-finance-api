import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CoinSummary from '../../components/CoinSummary';
import {useAuth} from '../../context/AuthContext'
import Intro from '../../components/Intro'
import Watchlist from '../../components/Watchlist';

export default function Home() {
  const user = useAuth()
  const [data, setData] = useState(null)
  const history = useNavigate()

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false'

  function handelSeeCoins() {
    history("/coins")
  }

  function handleSignUp() {
    history("/signup")
  }

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
      <div className='border'>
        <Intro />
        <div className='intro'>
          <h1>Get Crypto data!</h1>
          <p>
            We from MockCrypto are happy to provide you the best data tools for your
            crypto analysis. This is a project that utilize an API to update your favourite coins.
            Feel free to suggest new coins, or different tools. Create an account today and mark the
            coins you want to keep an eye on. Signup today!
          </p>
        <div className='menu'>
          <button className='button-coins' onClick={() => handleSignUp()}>Sign Up!</button>
        </div>
        {user.currentUser ?  <Watchlist /> : null}
        </div>
        <h2 style={{textAlign: "center"}}>Trending Coins</h2>
        <div className='container'>
          {data && data.map(coin => <CoinSummary key={coin.id} coin={coin}/>)}
        </div>
        <div className='menu'>
          <button className='button-coins' onClick={() => handelSeeCoins()}>See More Coins!</button>
        </div>
      </div>
    </>
  )
}

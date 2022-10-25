import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {AiFillStar} from 'react-icons/ai';
import {useAuth} from '../context/AuthContext';
import {db} from '../Firebase'
import { updateDoc, doc, arrayRemove } from 'firebase/firestore'

function WatchlistCoins(coin) {
    const [data, setData] = useState(null)
    const history = useNavigate()
    const user = useAuth()
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin.coin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    
    useEffect(() => {
      axios.get(url).then(response => {
        setData(response.data)
      }).catch((error) => {
        console.log(error)
      })
    }, [])

    function handleClick(param) {
      history('/coins/' + param)
    }

    async function handleRemove(param) {
      await updateDoc(doc(db, 'users', user.currentUser.uid), {
        watchlist: arrayRemove(param)
      })
    }
    
    if (!data) return null

    return (
      <>
        <div className="item-watchlist">
          <img onClick={() => handleClick(data[0].id)} src={data[0].image} className='coin-image' alt='/'/>
          <h3 onClick={() => handleClick(data[0].id)} className='coin-symbol'>{data[0].symbol.toUpperCase()}</h3>
          <p onClick={() => handleClick(data[0].id)} className='coin-name'>{data[0].name}</p>
          <p onClick={() => handleClick(data[0].id)} className='coin-price'>${data[0].current_price.toLocaleString()}</p>
          <AiFillStar onClick={() => handleRemove(data[0].id)} className='star' />
        </div>
      </>
    )
}

export default WatchlistCoins
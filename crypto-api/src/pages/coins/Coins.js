import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CoinDetailsNotSignedIn from '../../components/CoinDetailsNotSignedIn';
import {useAuth} from '../../context/AuthContext';
import {db} from '../../Firebase'
import { getDoc, doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';


export default function CoinsCopy() {
  const [data, setData] = useState(null)
  const user = useAuth()
  const [watchlist, setWatchlist]= useState(null)
  const list = []
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${list}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  const history = useNavigate()
  function handleClick(param) {
    history("/coins/"+ param)
  }

  useEffect(() => {
    updateWatchlist()
    axios.get(url).then(response => {
      setData(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  function updateWatchlist() {
    getDoc(doc(db, "users", user.currentUser.uid)).then(res => 
      setWatchlist(res._document.data.value.mapValue.fields.watchlist.arrayValue.values))
  }

  async function handleRemove(param) {
    await updateDoc(doc(db, 'users', user.currentUser.uid), {
      watchlist: arrayRemove(param)
    })
    updateWatchlist()
  }

  async function handleAdd(param) {
    await updateDoc(doc(db, 'users', user.currentUser.uid), {
      watchlist: arrayUnion(param)
    })
    updateWatchlist()
  }

  if (!data) return null

  return (
    <div className="coins">
      {user.currentUser === null ? <>{data && data.map(coin => <CoinDetailsNotSignedIn key={coin.id} coin={coin}/>)}</>:
      <>{data && data.map(coin => <div className="item">
      <img onClick={() => handleClick(coin.id)} src={coin.image} className='coin-image' alt='/'/>
      <h3 onClick={() => handleClick(coin.id)} className='coin-symbol'>{coin.symbol.toUpperCase()}</h3>
      <p onClick={() => handleClick(coin.id)} className='coin-name'>{coin.name}</p>
      <p onClick={() => handleClick(coin.id)} className='coin-price'>${coin.current_price.toLocaleString()}</p>
      {watchlist == null ? <AiOutlineStar className='star' onClick={() => handleAdd(coin.id)}/> :
      <>{watchlist.map((value) => value.stringValue).includes(coin.id) ? <AiFillStar className='star' onClick={() => handleRemove(coin.id)}/> : <AiOutlineStar className='star' onClick={() => handleAdd(coin.id)}/>}
      </>}
      </div>)}</>}
    </div>
  )
}
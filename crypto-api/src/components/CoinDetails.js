import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import {useAuth} from '../context/AuthContext';
import {db} from '../Firebase'
import { getDoc, updateDoc, doc, arrayRemove, arrayUnion } from 'firebase/firestore'


export default function CoinDetails({coin}) {
  const user = useAuth()
  const history = useNavigate()
  function handleClick(param) {
    history("/coins/"+ param.toLowerCase())
  }
  
  const [watchlist, setWatchlist] = useState(null)
  const docRef = doc(db, "users", user.currentUser.uid)

  useEffect(() => {
    if (user.currentUser !== null) {
      const unsubscribe = getDoc(docRef).then(res => {
        setWatchlist(res._document.data.value.mapValue.fields.watchlist.arrayValue.values)
        })
    }
  }, [watchlist])

  async function handleRemove(param) {
    await updateDoc(doc(db, 'users', user.currentUser.uid), {
      watchlist: arrayRemove(param)
    })
  }

  async function handleAdd(param) {
    await updateDoc(doc(db, 'users', user.currentUser.uid), {
      watchlist: arrayUnion(param)
    })
  }

  if (watchlist === null) return null

  return (
    <>
      <div className="item">
        <img onClick={() => handleClick(coin.name)} src={coin.image} className='coin-image' alt='/'/>
        <h3 onClick={() => handleClick(coin.name)} className='coin-symbol'>{coin.symbol.toUpperCase()}</h3>
        <p onClick={() => handleClick(coin.name)} className='coin-name'>{coin.name}</p>
        <p onClick={() => handleClick(coin.name)} className='coin-price'>${coin.current_price.toLocaleString()}</p>
        {watchlist.map((value) => value.stringValue).includes(coin.id) ? <AiFillStar className='star' onClick={() => handleRemove(coin.id)}/> : <AiOutlineStar className='star' onClick={() => handleAdd(coin.id)}/>}
      </div>
    </>
  )
}

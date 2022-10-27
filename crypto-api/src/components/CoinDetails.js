import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import {useAuth} from '../context/AuthContext';
import {db} from '../Firebase'
import { updateDoc, doc, arrayRemove, arrayUnion } from 'firebase/firestore'


function CoinDetails({coin}, {list}) {
  const user = useAuth()
  const history = useNavigate()
  function handleClick(param) {
    history("/coins/"+ param)
  }
  const watchlist = list
  const docRef = doc(db, "users", user.currentUser.uid)

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

  return (
    <>
      <div className="item">
        <img onClick={() => handleClick(coin.id)} src={coin.image} className='coin-image' alt='/'/>
        <h3 onClick={() => handleClick(coin.id)} className='coin-symbol'>{coin.symbol.toUpperCase()}</h3>
        <p onClick={() => handleClick(coin.id)} className='coin-name'>{coin.name}</p>
        <p onClick={() => handleClick(coin.id)} className='coin-price'>${coin.current_price.toLocaleString()}</p>
        {watchlist == null ? <AiOutlineStar className='star' onClick={() => handleAdd(coin.id)}/> :
        <>{watchlist.map((value) => value.stringValue).includes(coin.id) ? <AiFillStar className='star' onClick={() => handleRemove(coin.id)}/> : <AiOutlineStar className='star' onClick={() => handleAdd(coin.id)}/>}
        </>}
        </div>
    </>
  )
}

export default CoinDetails;
import React, {useEffect, useState} from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore';
import {db} from  '../Firebase';
import { useNavigate } from 'react-router-dom';
import WatchlistCoins from './WatchlistCoins';

function Watchlist() {
  const user = useAuth()
  const [watchlist, setWatchlist] = useState(null)
  const history = useNavigate()
  const docRef = doc(db, "users", user.currentUser.uid)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (user.currentUser !== null) {
      const unsubscribe = getDoc(docRef).then(res => {
        setWatchlist(res._document.data.value.mapValue.fields.watchlist.arrayValue.values)
        })
    }
  }, [n])

  if (!watchlist) {
    return null
  }

  function handleClick(param) {
    history("/coins/"+ param.toLowerCase())
  }

  async function addCoin() {
    await updateDoc( docRef, {
      watchlist: arrayUnion('bitcoin')})
    setN(n+1)
  }
  async function removeCoin() {
    await updateDoc( docRef, {
      watchlist: arrayRemove('bitcoin')})
    setN(n-1)
  }
  

  return (
    <>
      <h2>
        Watchlist
      </h2>
      <div className='coins'>
        {watchlist && watchlist.map((value) => <WatchlistCoins key={value.stringValue} coin={value.stringValue} />)}
      </div>
    </>
  )
}

export default Watchlist
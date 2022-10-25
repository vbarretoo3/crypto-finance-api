import React, {useEffect, useState} from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, arra } from 'firebase/firestore';
import {db} from  '../Firebase';
import WatchlistCoins from './WatchlistCoins';

function Watchlist() {
  const user = useAuth()
  const [watchlist, setWatchlist] = useState(null)
  const docRef = doc(db, "users", user.currentUser.uid)

  useEffect(() => {
    if (user.currentUser !== null) {
      const unsubscribe = getDoc(docRef).then(res => {
        setWatchlist(res._document.data.value.mapValue.fields.watchlist.arrayValue.values)
        })
    }
  }, [watchlist])

  if (!watchlist) {
    return null
  }

  async function handleClick() {
    console.log(watchlist)
    console.log(watchlist.map((value) => value.stringValue).includes('test'))
  }

  return (
    <>
      <h2>
        Watchlist
      </h2>
      <div className='coins-watchlist'>
        {watchlist && watchlist.map((value) => <WatchlistCoins key={value.stringValue} coin={value.stringValue} />)}
      </div>
    </>
  )
}

export default Watchlist
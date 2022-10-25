import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function CoinDetailsNotSignedIn({coin}) {
  const history = useNavigate()
  function handleClick(param) {
    history("/coins/"+ param.toLowerCase())
  }
  
  return (
    <>
      <div className="item">
        <img onClick={() => handleClick(coin.name)} src={coin.image} className='coin-image' alt='/'/>
        <h3 onClick={() => handleClick(coin.name)} className='coin-symbol'>{coin.symbol.toUpperCase()}</h3>
        <p onClick={() => handleClick(coin.name)} className='coin-name'>{coin.name}</p>
        <p onClick={() => handleClick(coin.name)} className='coin-price'>${coin.current_price.toLocaleString()}</p>
      </div>
    </>
  )
}

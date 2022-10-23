import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CoinDetails({coin}) {
  const history = useNavigate()
  function handleClick(param) {
    history("/coins/"+ param.toLowerCase())
  }
  return (
    <>
      <div onClick={() => handleClick(coin.name)} className="item">
        <img src={coin.image} className='coin-image' alt='/'/>
        <h3 className='coin-symbol'>{coin.symbol.toUpperCase()}</h3>
        <p className='coin-name'>{coin.name}</p>
        <p className='coin-price'>${coin.current_price.toLocaleString()}</p>
      </div>
    </>
  )
}

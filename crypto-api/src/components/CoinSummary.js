import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CoinSummary({coin}) {
  const history = useNavigate()
  function handleClick(param) {
    history("/coins/"+ param)
  }
  
  return (
    <>
      <div onClick={() => handleClick(coin.id)} className='row'>
        <img className='image' src={coin.image} alt='/'/>
        <div className='name'>{coin.name}</div>
        <div className='price'>$ {coin.current_price.toLocaleString()}</div>
      </div>
    </>
  )
}

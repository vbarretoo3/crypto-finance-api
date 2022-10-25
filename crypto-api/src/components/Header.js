import React, {useState, useMemo, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Navbar from './Navbar';
import axios from 'axios';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState([])
  const history = useNavigate()
  const [data, setData] = useState(null)
  const [query, setQuery] = useState('')
  const list = []
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${list}&order=market_cap_desc&per_page=100&page=1&sparkline=false`

  
  

  useEffect (() => {
    axios.get(url).then(response => {
      setData(response.data)
      setSearch(data.map((value) => value.id))
    }).catch((error) => {
      console.log(error)
    })
  }, [query])

  if (!data) return null

  const filteredItems = 
    search.filter(item => {
    return item.includes(query.toLowerCase())
  })

  function handleOpenMenu() {
    if (isOpen === false) {
      setIsOpen(true)  
    } else {
      setIsOpen(false)
    }
  }

  function handleClick() {
    history("/")
  }

  return (
    <>
      <div className='header border'>
        <h1 className='logo' onClick={() => handleClick()}> Mock Crypto </h1>
        <div className='header-right'>
          <input className='input' value={query} onChange={e => setQuery(e.target.value)} type='text' placeholder='search coin'/>
          <div onClick={() => handleOpenMenu()} className='hamburguer-menu'>
          {isOpen === true ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
        </div>
      </div>
      <div className={query !== '' ? 'show-menu': 'hide-menu'}>
        <ul>
          {filteredItems.map((item) => <><li key={item}><a href={`/coins/${item}`}>{item}</a></li><br/></>)}
        </ul>
      </div>
      <div className={isOpen === true ? 'show-menu' : 'hide-menu'} >
        <Navbar />
      </div>
    </>
  )
}

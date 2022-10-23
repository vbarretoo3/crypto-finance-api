import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Navbar from './Navbar';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const history = useNavigate()


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
        <img src='https://www.canva.com/design/DAFPz9-rZYE/view' className='logo' onClick={() => handleClick()} alt='Logo'/>
        <div className='header-right'>
          <input className='input' type='text' placeholder='search coin' />
          <div onClick={() => handleOpenMenu()} className='hamburguer-menu'>
          {isOpen === true ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
        </div>
      </div>
      <div className={isOpen === true ? 'show-menu' : 'hide-menu'} >
        <Navbar />
      </div>
    </>
  )
}

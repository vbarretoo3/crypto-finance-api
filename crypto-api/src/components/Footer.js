import React from 'react'
import {useAuth} from '../context/AuthContext';
import SpecialInfo from './SpecialInfo';

export default function Footer() {
  const user = useAuth()
  return (
    <nav className='footer'>
        <ul>
            <h2>Main</h2>
            {user.currentUser ? <SpecialInfo/>: null}
            <li>
                <a href='/coins'>See all coins</a>
            </li>
            {user.currentUser ? null: 
            <>
                <li>
                    <a href='/login'>Log In</a>
                </li>
                <li>
                    <a href='/signup'>Create an Account</a>
                </li>
            </>}
        </ul>
        <ul>
            <h2>About</h2>
            <li>
                <a href='/about'>About Us</a>
            </li>
            <li>
                <a href='/careers'>Careers</a>
            </li>
            <li>
                <a href='/social'>Social</a>
            </li>
        </ul>
        <ul>
            <h2>Support</h2>
            <li>
                <a href='/faq'>FAQ</a>
            </li>
            <li>
                <a href='/contact'>Contact Us</a>
            </li>
            <li>
                <a href='/data'>Our Data</a>
            </li>
            <li>
                <a rel='noopener' href='https://coingecko.com/en/api' target='_blank'>API</a>
            </li>
        </ul>
    </nav>
  )
}

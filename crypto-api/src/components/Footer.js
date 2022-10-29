import React from 'react'
import {useAuth} from '../context/AuthContext';
import SpecialInfo from './SpecialInfo';

export default function Footer() {
  const user = useAuth()
  return (
    <>
        <div className='footer-container'>
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
                        <a rel='noopener' href='https://coingecko.com/en/api' target='_blank'>API</a>
                    </li>
                </ul>
                <ul>
                    <h2>Social</h2>
                    <li>
                        <a rel='noopener' href='https://www.facebook.com/victor.b.deoliveira' target='_blank'>Facebook</a>
                    </li>
                    <li>
                        <a rel='noopener' href='https://www.instagram.com/victorreba/' target='_blank'>Instagram</a>
                    </li>
                    <li>
                        <a rel='noopener' href='https://www.linkedin.com/in/victorbarreto3/' target='_blank'>LinkedIn</a>
                    </li>
                    <li>
                        <a rel='noopener' href='https://github.com/vbarretoo3' target='_blank'>GitHub</a>
                    </li>
                </ul>
            </nav>
            <div className='about-container'>
                <p>
                 © Copyright 2022 Mock Crypto. All rights reserved.
                </p>
            </div>
        </div>
    </>
  )
}

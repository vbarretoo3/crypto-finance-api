import React from 'react';
import {useAuth} from '../context/AuthContext';
import SpecialInfo from './SpecialInfo';

function Navbar() {
    const user = useAuth()
  return (
    <nav>
        <ul>
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
    </nav>
  )
}

export default Navbar
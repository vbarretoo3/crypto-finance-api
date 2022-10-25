import React from 'react';
import {useAuth} from '../context/AuthContext';

export default function SpecialInfo() {
    const user = useAuth()
    const {logout} = useAuth()
    function signOut() {
        logout()
    }
    
    return (
    <>
        <h2 className='nav-title'>Hello, {user.currentUser.displayName === null ? user.currentUser.email : user.currentUser.displayName}</h2>
        <li>
            <a href='/profile'>Edit Profile</a>
        </li>
        <li>
            <a href='/' className='link' onClick={signOut}>Log Out</a>
        </li>
    </>
  )
}

import React from 'react'

function Navbar() {
  return (
    <nav>
        <ul>
            <li>
                <a href='/coins'>See all coins</a>
            </li>
            <li>
                <a href='/login'>Log In</a>
            </li>
            <li>
                <a href='/sign-up'>Create an Account</a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
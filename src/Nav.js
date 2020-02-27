import React from 'react'
import Logo from './Logo.js'
import './Nav.css'

function Nav() {
  return (
    <nav>
      <div className='center'>
        <div className="logo">
          <Logo />
          <h1 className="logo__text">FLIPPER</h1>
        </div>
        <div className="links">
          <a href="#">Search</a> 
          <a href="#">Popular</a> 
          <a href="#">Recent</a> 
          <a href="#">Login</a> 
        </div>
      </div>
    </nav>
  )
}

export default Nav

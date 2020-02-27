import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.js'
import './Nav.css'

function Nav(props) {
  return (
    <nav>
      <div className='center'>
        <div className="logo">
          <Link to="/flipper">
            <Logo />
            <h1 className="logo__text">FLIPPER</h1>
          </Link>
        </div>
        <div className="links">
          <Link to="/flipper/search">Search</Link>
          <Link to="/flipper/popular">Popular</Link>
          <Link to="/flipper/recent">Recent</Link>
          <Link to="/flipper/login">Login</Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav

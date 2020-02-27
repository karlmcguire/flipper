import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.js'
import './Nav.css'

function Nav(props) {
  return (
    <nav>
      <div className='center'>
        <div className="logo">
          <Link to="/">
            <Logo />
            <h1 className="logo__text">FLIPPER</h1>
          </Link>
        </div>
        <div className="links">
          <Link to="/search">Search</Link>
          <Link to="/popular">Popular</Link>
          <Link to="/recent">Recent</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  )
}

export default Nav

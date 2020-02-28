import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.js'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Navbar bg="light" variant="light" expand="lg" fixed="top">
        <Link to="/" className="navbar-brand"><Logo /></Link>
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/items" className="nav-link">Items</Link>
        </Nav>
        <Nav className="ml-auto">
          <Link to="/login" className="nav-link">Login</Link>
        </Nav>
        <Form inline className="ml-3">
          <FormControl type="text" placeholder="Search" />
          <Button variant="outline-success" className="ml-2">Search</Button>
        </Form>
      </Navbar> 
    )
  }
}

export default Header

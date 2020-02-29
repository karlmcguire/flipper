import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Logo from './Logo.js'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {search: '', redirect: false}
  
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({search: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    if(this.state.search != '') {
      this.setState({redirect: true})
    }
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to={'/search/' + this.state.search} />
    }

    return (
      <Navbar bg="light" variant="light" expand="lg" fixed="top">
        <Link to="/" className="navbar-brand"><Logo /> Flipper <span className="text-secondary" style={{fontSize: "12px"}}>Beta</span></Link>
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/items" className="nav-link">Items</Link>
        </Nav>
        <Nav className="ml-auto">
          <Link to="/login" className="nav-link">Login</Link>
        </Nav>
        <Form inline className="ml-3" onSubmit={this.handleSubmit}>
          <FormControl type="text" placeholder="Search" value={this.state.search} onChange={this.handleChange}/>
          <Button type="submit" variant="outline-success" className="ml-2">Search</Button>
        </Form>
      </Navbar> 
    )
  }
}

export default Header

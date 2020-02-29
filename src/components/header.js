import React from "react"

import { Link } from "gatsby"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { BarChartFill } from "react-bootstrap-icons"

import style from "./header.module.css"

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Navbar 
        bg="dark" 
        variant="dark" 
        sticky="top" 
        className="p-0">
        <Link 
          to="/"
          className="col-md-2 p-0">
          <Navbar.Brand className={style.brand}>
            Flipper
          </Navbar.Brand>
        </Link>
        <input
          type="text"
          placeholder="Search"
          aria-label="Search"
          className={style.input + " w-100 form-control"}/>
          <Nav>
            <Nav.Link href="#">About</Nav.Link> 
          </Nav>
      </Navbar>
    )
  }
}

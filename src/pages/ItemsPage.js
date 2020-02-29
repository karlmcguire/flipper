import React from 'react'

import Header from '../Header.js'
import Item from '../Item.js'

import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import FormControl from 'react-bootstrap/FormControl'

const ItemsFilter = () => {
  return (
    <div className="d-flex justify-content-space-between mt-5 mb-5">
      <InputGroup>
        <div className="input-group-prepend">
          <label className="input-group-text">Sort By</label>
        </div>
        <select className="custom-select">
          <option selected>Price: High to Low</option>
          <option>Price: Low to High</option>
          <option>Change: High to Low</option>
          <option>Change: Low to High</option>
        </select>
      </InputGroup>
      <div style={{height: 10, width: 50}}></div>
      <InputGroup>
        <div className="input-group-prepend">
          <label className="input-group-text">Category</label>
        </div>
        <select className="custom-select">
          <option>All</option>
          <option>Electronics</option>
          <option>Books</option>
          <option>Household</option>
          <option>Furniture</option>
          <option>Hygeine</option>
          <option>Sports and Outdoors</option>
          <option>Video Games</option>
          <option>Automotive</option>
          <option>Pet Supplies</option>
          <option>Office Products</option>
        </select>
      </InputGroup>
      <div style={{height: 10, width: 50}}></div>
      <InputGroup>
        <div className="input-group-prepend">
          <label className="input-group-text">Platform</label>
        </div>
        <select className="custom-select">
          <option>All</option>
          <option>Amazon</option>
          <option>Facebook</option>
          <option>Ebay</option>
        </select>
      </InputGroup>
      <div style={{height: 10, width: 50}}></div>
      <Button variant="primary">Update</Button>
    </div>
  )
}

const ItemsPage = () => {
  return (
    <div>
      <Header />
        <div style={{height: 54, display: "block"}}></div>
        <Jumbotron>
          <Container>
            <h1>Items</h1>
          </Container>
        </Jumbotron>
        <Container>
          <ItemsFilter /> 
          <hr />
          <div className="d-flex justify-content-between flex-wrap align-self-baseline mt-2">
            <Item 
              img="https://m.media-amazon.com/images/I/71IQiviMzWL._AC_UY436_FMwebp_QL65_.jpg"
              title="New Apple MacBook Pro (13-inch, 8GB RAM, 128GB Storage) - Space Gray"
              text="$1,199.99"
            /> 
            <Item 
              img="https://m.media-amazon.com/images/I/414qZka1eqL._AC_UL640_FMwebp_QL65_.jpg" 
              title="3M 8210 N95 Particulate Respirator Mask, 1- Box Of 20 MASKS"
              text="$249.79"
            /> 
            <Item 
              img="https://m.media-amazon.com/images/I/81tmZ090L9L._AC_UL640_FMwebp_QL65_.jpg"
              title="PURELL Advanced Hand Sanitizer Refreshing Gel, Clean Scent, 1 Liter Pump Bottle (Pack of 2)"
              text="$69.00"
            /> 
          </div>
          <div className="d-flex justify-content-between flex-wrap align-self-baseline mt-2">
            <Item 
              img="https://m.media-amazon.com/images/I/71IQiviMzWL._AC_UY436_FMwebp_QL65_.jpg"
              title="New Apple MacBook Pro (13-inch, 8GB RAM, 128GB Storage) - Space Gray"
              text="$1,199.99"
            /> 
            <Item 
              img="https://m.media-amazon.com/images/I/414qZka1eqL._AC_UL640_FMwebp_QL65_.jpg" 
              title="3M 8210 N95 Particulate Respirator Mask, 1- Box Of 20 MASKS"
              text="$249.79"
            /> 
            <Item 
              img="https://m.media-amazon.com/images/I/81tmZ090L9L._AC_UL640_FMwebp_QL65_.jpg"
              title="PURELL Advanced Hand Sanitizer Refreshing Gel, Clean Scent, 1 Liter Pump Bottle (Pack of 2)"
              text="$69.00"
            /> 
          </div>
          <div className="d-flex justify-content-between flex-wrap align-self-baseline mt-2">
            <Item 
              img="https://m.media-amazon.com/images/I/71IQiviMzWL._AC_UY436_FMwebp_QL65_.jpg"
              title="New Apple MacBook Pro (13-inch, 8GB RAM, 128GB Storage) - Space Gray"
              text="$1,199.99"
            /> 
            <Item 
              img="https://m.media-amazon.com/images/I/414qZka1eqL._AC_UL640_FMwebp_QL65_.jpg" 
              title="3M 8210 N95 Particulate Respirator Mask, 1- Box Of 20 MASKS"
              text="$249.79"
            /> 
            <Item 
              img="https://m.media-amazon.com/images/I/81tmZ090L9L._AC_UL640_FMwebp_QL65_.jpg"
              title="PURELL Advanced Hand Sanitizer Refreshing Gel, Clean Scent, 1 Liter Pump Bottle (Pack of 2)"
              text="$69.00"
            /> 
          </div>
        </Container>
    </div> 
  )
}

export {ItemsPage, ItemsFilter}

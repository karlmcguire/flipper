import React from 'react'

import Header from '../Header.js'
import Item from '../Item.js'

import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

const HomePage = () => {
  return (
    <div>
      <Header />
        <div style={{height: 54, display: "block"}}></div>
        <Jumbotron>
          <Container>
            <h1>When and where should you buy?</h1>
            <h2 className="text-secondary mt-4">We'll show you.</h2>
          </Container>
        </Jumbotron>
        <Container>
          <div className="d-flex justify-content-between align-items-baseline">
            <h3 className="mt-2">Popular Items</h3>
            <a href="#">See All</a>
          </div>
          <div className="d-flex justify-content-between flex-wrap align-self-baseline">
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
          <hr className="mt-5"/>
          <div className="d-flex justify-content-between align-items-baseline">
            <h3 className="mt-2">Recent Items</h3>
            <a href="#">See All</a>
          </div>
          <div className="d-flex justify-content-between flex-wrap align-self-baseline">
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
          <hr className="mt-5"/>
          <div className="d-flex justify-content-between align-items-baseline">
            <h3 className="mt-2">Volatile Items</h3>
            <a href="#">See All</a>
          </div>
          <div className="d-flex justify-content-between flex-wrap align-self-baseline">
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
        <br /> 
        <br /> 
        <br /> 
        <br /> 
        <br /> 
        <br /> 
        <br /> 
    </div> 
  )
}

export default HomePage

import React from 'react'
import Header from '../Header.js'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Link from 'react-router-dom/Link'
import { FaCartPlus, FaFacebook, FaAmazon, FaEbay, FaArrowAltCircleLeft } from 'react-icons/fa'

import { LineChart } from 'react-chartkick'
import 'chart.js'

const Item = () => {
  return (
    <Card className="mt-5">
      <Card.Body>
        <div className="d-flex">
          <img 
            src="https://m.media-amazon.com/images/I/414qZka1eqL._AC_UL640_FMwebp_QL65_.jpg"
            style={{maxWidth: 150}}
          />
          <div className="p-3">
            <h3>3M 8210 N95 Particulate Respirator Mask, 1- Box Of 20 MASKS</h3>
          </div>
          <div className="p-3" style={{width: 400}}>
            <h2 className="text-success text-right">$249.79</h2>
            <ButtonGroup className="mt-3" size="lg" style={{width: "100%"}}>
              <Button variant="primary">Add to Watchlist</Button>
              <Button variant="warning"><FaCartPlus /></Button>
            </ButtonGroup>
            <ButtonGroup className="mt-3" size="lg" style={{width: "100%"}}>
              <Button variant="secondary"><FaFacebook /></Button>
              <Button variant="secondary"><FaAmazon /></Button>
              <Button variant="secondary"><FaEbay style={{height: "2rem", width: "2rem"}}/></Button>
            </ButtonGroup>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

const Graph = () => {
  return (
    <Card className="mt-4">
      <Card.Header as="h5">Price History</Card.Header>
      <Card.Body>
        <LineChart
          prefix="$"
          legend={true}
          colors={["#FF9900", "#3b5998", "#e53238"]}
          min={100}
          max={300}
          data={[
            {name: "Amazon", data: {
              "2020-02-22": 159, 
              "2020-02-23": 189,
              "2020-02-24": 199, 
              "2020-02-25": 209, 
              "2020-02-26": 225, 
              "2020-02-27": 219, 
              "2020-02-28": 249
            }},
            {name: "Facebook", data: {
              "2020-02-22": 139, 
              "2020-02-23": 159,
              "2020-02-24": 179, 
              "2020-02-25": 219, 
              "2020-02-26": 209, 
              "2020-02-27": 219, 
              "2020-02-28": 239
            }},
            {name: "Ebay", data: {
              "2020-02-22": 199, 
              "2020-02-23": 209,
              "2020-02-24": 169, 
              "2020-02-25": 189, 
              "2020-02-26": 219, 
              "2020-02-27": 229, 
              "2020-02-28": 259
            }}
          ]}/>
      </Card.Body>
    </Card>
  )
}

const ItemPage = () => {
  return (
    <div>
      <Header />
        <div style={{height: 54, display: "block"}}></div>
        <Container>
          <Item />
          <Graph />
        </Container>
    </div> 
  )
}

export default ItemPage

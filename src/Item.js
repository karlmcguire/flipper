import React from 'react'

import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

const Item = (props) => {
  return (
    <Card className="mt-4" style={{ width: '22rem' }}>
      <Card.Img 
        variant="top" 
        src={props.img} 
        style={{
          height: 225,
          maxWidth: 275, 
          width: "auto",
          margin: "auto",
          paddingTop: "2rem",
          paddingBottom: "1rem"}}
        />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{marginBottom: "-1rem"}}>
          <h4 className="text-success">{props.text}</h4>
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem className="d-flex">
          <div>
            <Badge variant="secondary" style={{fontSize: "0.85rem"}}>
              {Math.floor(Math.random() * Math.floor(5))}% Day
            </Badge>
          </div>
          <div className="ml-2">
            <Badge variant="secondary" style={{fontSize: "0.85rem"}}>
              {Math.floor(Math.random() * Math.floor(10))}% Week
            </Badge>
          </div>
          <div className="ml-2">
            <Badge variant="secondary" style={{fontSize: "0.85rem"}}>
              {Math.floor(Math.random() * Math.floor(20))}% Month
            </Badge>
          </div>
        </ListGroupItem>
      </ListGroup>
      <Card.Body className="d-flex justify-content-between">
        <Link className="card-link" to="/item">View</Link>
        <Card.Link href="#">Save</Card.Link>
      </Card.Body>
    </Card> 
  )
}

export default Item

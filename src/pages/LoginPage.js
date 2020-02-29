import React from 'react'

import Header from '../Header.js'

import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const LoginPage = () => {
  return (
    <div>
      <Header />
        <div style={{height: 54, display: "block"}}></div>
        <Container>
          <Card 
            className="mt-5"
            style={{width: "40rem", margin: "auto"}}
          >
            <Card.Header as="h5">Login</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <div className="d-flex justify-content-between align-items-end">
                  <Button variant="primary" type="submit">
                    Login 
                  </Button>
                  <a href="#">Don't have an account? Sign up!</a>
                </div>
              </Form> 
            </Card.Body>
          </Card>  
        </Container>
    </div> 
  )
}

export default LoginPage

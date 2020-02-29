import React from 'react'

import { Redirect } from 'react-router-dom'
import Header from '../Header.js'
import Item from '../Item.js'
import { ItemsFilter } from './ItemsPage.js'

import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: props.match.params.query 
    }
  }

  componentWillReceiveProps(props) {
    if(props.match.params.query != this.state.query) {
      this.state.query = props.match.params.query
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div style={{height: 54, display: "block"}}></div>
        <Jumbotron>
          <Container>
            <h1>Search: <strong>{this.state.query}</strong></h1>
          </Container>
        </Jumbotron>
        <Container>
          <ItemsFilter />
          <hr />
          <div className="d-flex justify-content-between flex-wrap align-self-baseline mt-2">
            <Item 
              img="https://m.media-amazon.com/images/I/414qZka1eqL._AC_UL640_FMwebp_QL65_.jpg" 
              title="3M 8210 N95 Particulate Respirator Mask, 1- Box Of 20 MASKS"
              text="$249.79"
            /> 
          </div>
        </Container>
      </div> 
    )
  }
}

export default SearchPage

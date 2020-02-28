import React from 'react'
import Nav from '../Nav.js'
import './SearchPage.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.input.focus() 
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    alert(this.state.value)
  }

  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit}>
        <input 
          className="search__bar" 
          type="text" 
          placeholder="Item name..." 
          spellCheck="false" 
          tabIndex="1"
          value={this.state.value}
          onChange={this.handleChange}
          ref={(input) => {this.input = input}}
        />
        <input 
          className="search__btn" 
          type="submit"
          value="Search"
          tabIndex="2"
        />
      </form>
    )
  }
}

const SearchPage = () => {
  return (
    <div>
      <Nav />
      <div className="center--main">
        <h1 className="title">Search</h1>
        <SearchBar />
      </div>
    </div>
  )
}

export default SearchPage

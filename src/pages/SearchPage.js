import React from 'react'
import Header from '../Header.js'

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
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          placeholder="Item name..." 
          spellCheck="false" 
          tabIndex="1"
          value={this.state.value}
          onChange={this.handleChange}
          ref={(input) => {this.input = input}}
        />
        <input 
          type="submit"
          value="Search"
          tabIndex="2"
        />
      </form>
    )
  }
}

const items = [1, 2, 3, 4, 5, 6, 7, 8]

class SearchItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.items = items.map((item) =>
      <li key={item.toString()}>
        {item}
      </li>
    )
  }

  render() {
    return (
      <div>
        <ul>
          {this.items} 
        </ul>
      </div>
    )
  }
}

const SearchPage = () => {
  return (
    <div>
      <Header />
      <div>
        <h1>Search</h1>
        <SearchBar />
        <SearchItems />
      </div>
    </div>
  )
}

export default SearchPage

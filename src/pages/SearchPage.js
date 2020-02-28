import React from 'react'
import Nav from '../Nav.js'
import './SearchPage.css'


class SearchBar extends React.Component {
  _input: ?HTMLInputElement

  componentDidMount() {
    this._input.focus()
  }

  render() {
    return (
      <form className="search">
        <input 
          className="search__bar" 
          type="text" 
          placeholder="Item name..." 
          spellCheck="false" 
          tabIndex="1"
          ref={c => (this._input = c)} 
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

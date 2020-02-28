import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage.js'
import SearchPage from './pages/SearchPage.js'
import LoginPage from './pages/LoginPage.js'
import AboutPage from './pages/AboutPage.js'
import ItemsPage from './pages/ItemsPage.js'
import ItemPage from './pages/ItemPage.js'

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/items" component={ItemsPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/item" component={ItemPage} />
    </Switch>
  )
}

export default App

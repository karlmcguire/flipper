import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage.js'
import SearchPage from './pages/SearchPage.js'
import PopularPage from './pages/PopularPage.js'
import RecentPage from './pages/RecentPage.js'
import LoginPage from './pages/LoginPage.js'
import './App.css'

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/popular" component={PopularPage} />
      <Route path="/recent" component={RecentPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  )
}

export default App

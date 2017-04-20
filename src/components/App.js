import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route
} from 'react-router-dom'
import Search from './Search'
import ShowSearch from './ShowSearch'
import Result from './Result'
import NewWord from './NewWord'
// import ShowWord from './ShowWord'
import Letters from './Letters'
import BrowseLetter from './BrowseLetter.js'
const token = 'example'

class App extends Component {
  state = {
    active: [],
    search: []
  }

  loadWords () {
    const url = `https://jabberdexicon.herokuapp.com/entries?access_token=${token}`
    window.fetch(url)
    .then(r => r.json())
    .then(data => {
      this.setState({
        active: data
      })
    })
  }

  componentDidMount () {
    this.loadWords()
  }

  addWord = (newTerm, newDef) => {
    const url = `https://jabberdexicon.herokuapp.com/entries?access_token=${token}`
    window.fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'entry': {
          'term': newTerm,
          'definition': newDef
        }
      })
    }).then(r => r.json())
      .then(data => {
        this.loadWords()
        console.log(data)
      })
  }

  render () {
    return <Router>
      <div className='App'>
        <div className='addItemBtn'>
          <NavLink to='/addword/' className='homeLink'>
            <button className='addInfo'>
              <i className='fa fa-plus' />
            </button>
          </NavLink>
        </div>
        <header>
          <div className='topNav'>
            <NavLink to='/' className='homeLink'>
              <h1>Jabberdexicon</h1>
            </NavLink>
          </div>
        </header>
        <main>
          <Letters />
          <Route exact path='/' />
          <Search />
          <Switch>
            />
            <Route path='/addword'
              render={(props) => { return <NewWord term={this.state.term} addWord={this.addWord} active={this.state.active} /> }}
            />
            <Route path='/entries/:slug' component={Result} />
            <Route path='/browse/:letter' component={BrowseLetter} />
            <Route path='/search/:word' component={ShowSearch} />
          </Switch>
        </main>
        <footer>
          <div className='copyright'>
            {/* <p>&copy; James O'Brien 2017</p> */}
          </div>
        </footer>
      </div>
    </Router>
  }
}

export default App

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
import Letters from './Letters'
import BrowseLetter from './BrowseLetter.js'
const token = 'vorpal'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clicked: false,
      active: [],
      search: []
    }
    this.clicked = this.clicked.bind(this)
  }

  // state = {
  //   active: [],
  //   search: [],
  //   clicked: false
  // }

  clicked () {
    this.setState(prevState => ({
      clicked: !prevState.clicked
    }))
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

  // clicked = () => {
  //   this.setState({ clicked: true })
  // }

  exit = () => {
    this.setState({ clicked: false })
  }

  // _click = () => {
  //   this.clicked()
  // }

  render () {
    return <Router>
      <div className='App'>
        <div className='addItemBtn'>
          <NavLink to='/addword/' className='homeLink'>
            <button onClick={this.clicked} className={this.state.clicked ? 'addInfo addWordRotate open' : 'addInfo addWordRotate'}>
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
          <Search clicked={this.state.clicked} />
          <Switch>
            <Route path='/addword'
              render={(props) => { return <NewWord term={this.state.term} addWord={this.addWord} active={this.state.active} exit={this.exit} clicked={this.state.clicked} /> }}
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

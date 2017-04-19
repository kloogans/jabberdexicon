import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Search from './Search'
import Result from './Result'
import NewWord from './NewWord'
const token = 'example'

class App extends Component {
  state = {
    active: [],
    search: [],
    clicked: false
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

  searchWord = (searchTerm) => {
    const url = `https://jabberdexicon.herokuapp.com/entries?access_token=${token}`
    window.fetch(url)
    .then(r => r.json())
    .then(data => {
      const searchFilter = data.filter(item => item.term.includes(searchTerm))
      console.log(searchFilter)
    })
  }

  _click = () => {
    this.setState({ clicked: true })
    console.log('click')
  }

  exit = () => {
    this.setState({ clicked: false })
  }

  render () {
    return <Router>
      <div className='App'>
        <div className='addItemBtn'>
          <button className='addInfo' onClick={this._click}>
            <i className='fa fa-plus' />
          </button>
        </div>
        <header>
          <div className='topNav'>
            <h1>Jabberdexicon</h1>
          </div>
        </header>
        <main>
          <Route exact path='/' render={() => <Search searchWord={this.searchWord} clicked={this.state.clicked} />} />
          <NewWord term={this.state.term} addWord={this.addWord} active={this.state.active} clicked={this.state.clicked} exit={this.exit} />
          {/* <Search searchWord={this.searchWord} clicked={this.state.clicked} /> */}
          {/* <Route exact path='/' component={Search} /> */}
          {/* <Route path='/entries/:id' component={Result} /> */}
          <Route path='/entries/:id' render={() => <Result term={this.state.active.term} def={this.state.definition} clicked={this.state.clicked} active={this.state.active} />} />
          {/* <Result term={this.state.active.term} def={this.state.active.definition} clicked={this.state.clicked} active={this.state.active} /> */}
        </main>
        <footer>
          <div className='copyright'>
            {/* <p>&copy; James O'Brien 2017 Fuck Yea</p> */}
          </div>
        </footer>
      </div>
    </Router>
  }
}

export default App

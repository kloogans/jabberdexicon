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

  // When this react component mounts
  componentDidMount () {
    // the URL to "get" todo items
    const url = `https://jabberdexicon.herokuapp.com/entries?access_token=${token}`
    // make an AJAX request to that URL
    window.fetch(url)
      // fetch returns a promsise, which yeilds the "response", we call it 'r'
      // The response has a method json(), that returns another promise
      .then(r => r.json())
      // then JSON is done parsing, the promise will yeild the "data"
      .then(data => {
        // use the data as the state for our items
        this.setState({
          active: data
        })
        console.log(data)
      })
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
        this.setState({
          active: data
        })
        console.log(data)
      })
  }

  searchWord = searchTerm => {
    const url = `https://jabberdexicon.herokuapp.com/entries?access_token=${token}`
    window.fetch(url)
    .then(r => r.json())
    .then(data => {
      console.log(data)
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
          <Search searchWord={this.searchWord} clicked={this.state.clicked} />
          <NewWord term={this.state.term} addWord={this.addWord} clicked={this.state.clicked} exit={this.exit} />
          <Result term={this.state.active.term} def={this.state.active.definition} clicked={this.state.clicked} />
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

import React, { Component } from 'react'
// import { BrowserRouter as Router } from 'react-router-dom'
import Search from './Search'
import Definition from './Definition'
import NewWord from './NewWord'
import styles from '../styles/App.scss'
const token = 'example'

class App extends Component {
  state = {
    active: [],
    search: []
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

  render () {
    return <div className={styles.App}>
      <header>
        <h1>Jabberdexicon</h1>
      </header>
      <main>
        <NewWord term={this.state.term} addWord={this.addWord} />
        <Search searchWord={this.searchWord} />
        <Definition term={this.state.active.term} def={this.state.active.definition} />
      </main>
      <footer>
        <div className={styles.copyright}>
          <p>&copy; James O'Brien 2017 Fuck Yea</p>
        </div>
      </footer>
    </div>
  }
}

export default App

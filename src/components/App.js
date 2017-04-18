import React, { Component } from 'react'

class App extends Component {
  state = {
    items: []
  }

  // When this react component mounts
  componentDidMount () {
    // the URL to "get" todo items
    const url = 'https://jabberdexicon.herokuapp.com/entries?access_token=banapple'
    // make an AJAX request to that URL
    window.fetch(url)
      // fetch returns a promsise, which yeilds the "response", we call it 'r'
      // The response has a method json(), that returns another promise
      .then(r => r.json())
      // then JSON is done parsing, the promise will yeild the "data"
      .then(data => {
        // use the data as the state for our items
        this.setState({
          info: data
        })
      })
  }

  addItem (newItem) {
    const url = 'https://one-list-api.herokuapp.com/items?access_token=banapple'
    window.fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item: {
          text: newItem
        }
      })
    }).then(r => r.json())
      .then(data => {
        this.setState({
          items: [...this.state.items, data]
        })
      })
  }

  _submit = (event) => {
    event.preventDefault()
    const input = this.refs.definition
    this.addItem(input.value)
    input.value = ''
  }

  render () {
    return <div className='App'>
      <header>
        <h1>Jabberdexicon</h1>
      </header>
      <main>
        <div className='forms'>
          <div className='userInput'>
            <form onSubmit={this._submit}>
              <input type='text' name='word' placeholder='Word' ref='word' />
              <textarea name='definition' placeholder='Definition' ref='definition' />
              <input type='submit' />
            </form>
          </div>
          <div className='userSearch'>
            <form>
              <input type='text' name='search' placeholder='Search' />
              <input type='submit' value='Go' />
            </form>
          </div>
        </div>
        <div className='info'>
          <h3>Word:</h3>
          <p>Definition</p>
        </div>
      </main>
      <footer>
        <div className='copyright'>
          <p>&copy; James O'Brien 2017 Fuck Yea</p>
        </div>
      </footer>
    </div>
  }
}

export default App

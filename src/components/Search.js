import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
const token = 'vorpal'

class Search extends Component {
  state={
    input: null
  }

  update = (query) => {
    this.setState({ input: query })
  }

  _go = e => {
    e.preventDefault()
    const query = this.refs.query.value
    const path = query.length > 0 ? `/search/${query}` : '/'
    this.props.history.push(path)
    this.update(query)
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

  _submit = e => {
    e.preventDefault()
    this.searchWord(this.refs.searchText.value)
  }

  _focus = (e) => {
    e.preventDefault()
    e.target.setSelectionRange(0, e.target.value.length)
  }

  render () {
    return (
      <div className={this.props.clicked ? 'hidden' : 'userSearch'}>
        <form onChange={this._go}>
          <input type='search' className='searchBox' onFocus={this._focus} onSubmit={this.preventDefault} ref='query' placeholder='Search' />
          {/* <button className='searchBtn' type='submit'>Go </button> */}
        </form>
        <Route path='/search/' />
        <p className={this.props.active === {} ? 'welcome' : 'hidden'}>Welcome to the Jabberdexicon.</p>
      </div>
    )
  }
}

export default withRouter(Search)

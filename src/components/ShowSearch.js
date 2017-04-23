import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
const token = 'vorpal'

class ShowSearch extends Component {
  state = {
    active: []
  }

  componentDidMount () {
    const url = `https://jabberdexicon.herokuapp.com/entries?access_token=${token}`
    window.fetch(url)
    .then(r => r.json())
    .then(data => {
      this.setState({
        active: data
      })
    })
  }

  render () {
    const filtered = this.state.active.filter(item => {
      if (this.props.match.params.word.length !== 0) {
        return item.term.toLowerCase().includes(this.props.match.params.word.toLowerCase())
      }
    })
    const words = filtered.map(word => {
      return <li className='searchResult' key={word.id}>
        <NavLink to={`/entries/${word.slug}`} className='searchLinks'>{word.term}</NavLink>
      </li>
    })

    let noMatch

    if (filtered.length === 0) {
      noMatch = <div>
        <p>Sorry, no matches found.</p>
      </div>
    }

    return <ul className='ShowSearch'>
      {words}
      {noMatch}
    </ul>
  }
}

export default ShowSearch

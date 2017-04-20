import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
const token = 'example'

class BrowseLetter extends Component {
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
      if (this.props.match.params.letter === 'numbers') {
        return item.term.match(/^\d/)
      } else {
        return item.term[0].toLowerCase() === this.props.match.params.letter
      }
    })

    const words = filtered.map(word => {
      return <li key={word.id} className='wordBlock'>
        <NavLink to={`/entries/${word.slug}`} className='word'>{word.term}</NavLink>
      </li>
    })

    return <div className='wordList'>
      <div className='selectedLetter'>&nbsp;{this.props.match.params.letter.toUpperCase()}</div>
      <hr />
      <ul className='BrowseLetter'>
        {words}
      </ul>
    </div>
  }
}

export default BrowseLetter

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
const token = 'example'

class ShowWord extends Component {
  state = {
    active: {}
  }

  updateWord (slug) {
    this.setState({active: []})
    const url = `https://jabberdexicon.herokuapp.com/entries/${slug}?access_token=${token}`
    window.fetch(url)
    .then(r => r.json())
    .then(data => {
      this.setState({
        active: data
      })
    })
  }

  componentDidMount () {
    this.updateWord(this.props.match.params.slug)
  }

  _delete = () => {
    const url = `https://jabberdexicon.herokuapp.com/entries/${this.state.active.slug}?access_token=${token}`
    window.fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).then(this.setState({active: {}}))
  }

  render () {
    return <div>
      <div className='ShowWord'>
        <div className='word'>
          {this.state.active.term}:
      </div>
        <div className='definition'>
          <div dangerouslySetInnerHTML={{__html: `${this.state.active.formatted_definition}`}} />
        </div>
      </div>
      <NavLink to='/'>
        <input className='deleteButton' onClick={this._delete} type='submit' value='Delete this entry' />
      </NavLink>
    </div>
  }
}

export default ShowWord

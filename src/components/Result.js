import React, { Component } from 'react'
const token = 'test'

class Result extends Component {
  state={ active: {} }
  updateEntry () {
    const slug = this.props.match.params.slug
    if (slug !== this.state.slug) {
      window.fetch(`https://jabberdexicon.herokuapp.com/entries/${slug}?access_token=${token}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        ...data
      })
    })
    }
  }

  componentDidMount () {
    this.updateEntry()
  }

  componentDidUpdate () {
    this.updateEntry()
  }

  _delete = () => {
    if (window.confirm('Are you sure?')) {
      const slug = this.props.match.params.slug
      const url = `https://jabberdexicon.herokuapp.com/entries/${slug}?access_token=${token}`
      window.fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }).then(this.setState({active: {}}))
     .then(this.props.history.push('/'))
    }
  }
  render () {
    const { active } = this.state
    if (active) {
      return <div className='info'>
        <label>{this.state.term}</label>
        <hr />
        <p dangerouslySetInnerHTML={{__html: `${this.state.formatted_definition}`}} />
        {/* <p dangerouslySetInnerHTML={{__html: `${this.state.active.formatted_definition}`}} /> */}
        <button className='deleteBtn' onClick={this._delete}>
          <i className='fa fa-trash' />
        </button>
      </div>
    } else {
      return <p> Loading... </p>
    }
  }
}

export default Result

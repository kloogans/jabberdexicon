import React, { Component } from 'react'
const token = 'example'

class Result extends Component {
  state={}
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
  render () {
    return <div className='info'>
      <h1>{this.state.term}</h1>
      <p>{this.state.definition}</p>
    </div>
  }
}

export default Result

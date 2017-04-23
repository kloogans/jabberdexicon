import React, { Component } from 'react'
const token = 'vorpal'

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
  render () {
    const { active } = this.state
    if (active) {
      return <div className='info'>
        <h1>{this.state.term}</h1>
        <hr />
        <p dangerouslySetInnerHTML={{__html: `${this.state.formatted_definition}`}} />
        {/* <p dangerouslySetInnerHTML={{__html: `${this.state.active.formatted_definition}`}} /> */}
      </div>
    } else {
      return <p> Loading... </p>
    }
  }
}

export default Result

import React, { Component } from 'react'
import { FacebookButton, TwitterButton, RedditButton } from 'react-social'
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

  _edit = () => {
    this.props.history.push(`/edit/${this.props.match.params.slug}`)
    console.log('click')
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
    const url = `http://jabberdexicon.jamesobrien.surge.sh/entries/${this.state.slug}`
    if (active) {
      return <div className='info'>
        <div className='titleBar'>
          <h1>{this.state.term}</h1>
        </div>
        <hr />
        <p dangerouslySetInnerHTML={{__html: `${this.state.formatted_definition}`}} />
        <div className='lowerButtons'>
          <div className='socialButtons'>
            <FacebookButton url={url} appId={419861715049229} className='facebookButton'>
              <i className='fa fa-facebook' />
            </FacebookButton>
            <TwitterButton url={url} className='twitterButton'>
              <i className='fa fa-twitter' />
            </TwitterButton>
            <RedditButton title={`The meaning of ${this.state.term} on Jabberdexicon`} url={url} className='redditButton'>
              <i className='fa fa-reddit-alien' />
            </RedditButton>
          </div>
          <div className='editDeleteBtns'>
            <button className='editBtn' onClick={this._edit}>
              <i className='fa fa-pencil' />
            </button>
            <button className='deleteBtn' onClick={this._delete}>
              <i className='fa fa-trash' />
            </button>
          </div>
        </div>
      </div>
    } else {
      return <p> Loading... </p>
    }
  }
}

export default Result

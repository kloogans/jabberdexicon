import React, { Component } from 'react'

class Info extends Component {
  render () {
    return <div className={this.props.infoClicked ? 'welcomeText' : 'hidden'}>
      <p className='welcome'>
        Welcome to the Jabberdexicon. Search, browse, or submit
        terms and jargon commonly used in the tech industry. Hear a word
        or phrase that you're too embarrassed to ask the meaning of?
        Jabberdexicon is here to solve that problem.
      </p>
    </div>
  }
}

export default Info

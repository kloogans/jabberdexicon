import React, { Component } from 'react'

class Definition extends Component {
  render () {
    return (
      <div className='info'>
        <h3>Word: {this.props.term}</h3>
        <p> Definition: {this.props.def}</p>
      </div>
    )
  }
}

export default Definition

import React, { Component } from 'react'

class Result extends Component {
  render () {
    return (
      <div className={this.props.clicked ? 'hidden' : 'info'}>
        <h3>Word: {this.props.term}</h3>
        <p> Definition: {this.props.def}</p>
      </div>
    )
  }
}

export default Result

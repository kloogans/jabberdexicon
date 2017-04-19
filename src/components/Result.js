import React, { Component } from 'react'

class Result extends Component {
  render () {
    const showWord = this.props.active.map((item) => {
      return <div className={this.props.clicked ? 'hidden' : 'info'}>
        <h3 key={item.id}>{item.term}</h3>
      </div>
    })
    return (
      <div>
        {showWord[1]}
      </div>
    )
  }
}

export default Result

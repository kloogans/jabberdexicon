import React, { Component } from 'react'

class Result extends Component {
  render () {
    const showWord = this.props.active.map((item) => {
      return <h3 key={item.id}>{item.term}</h3>
    })
    return (
      <div className={this.props.clicked ? 'hidden' : 'info'}>
        {showWord}
      </div>
    )
  }
}

export default Result

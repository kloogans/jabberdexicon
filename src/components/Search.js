import React, { Component } from 'react'

class Search extends Component {
  _submit = e => {
    e.preventDefault()
    this.props.searchWord(this.refs.searchText.value)
  }

  _focus = (e) => {
    e.target.setSelectionRange(0, e.target.value.length)
  }
  render () {
    return (
      <div className={this.props.clicked ? 'hidden' : 'userSearch'}>
        <form onSubmit={this._submit}>
          <textarea className='searchBox' onFocus={this._focus} ref='searchText' placeholder='Search' />
          <button className='searchBtn' type='submit'>Go </button>
        </form>
      </div>
    )
  }
}

export default Search

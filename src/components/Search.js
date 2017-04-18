import React, { Component } from 'react'
import styles from '../styles/Search.scss'

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
      <div className={styles.userSearch}>
        <form onFocus={this._focus}>
          <input onFocus={this._submit} type='text' ref='searchText' placeholder='Search' />
          <input type='submit' value='Go' />
        </form>
      </div>
    )
  }
}

export default Search

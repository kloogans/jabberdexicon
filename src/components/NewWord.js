import React, { Component } from 'react'
import styles from '../styles/NewWord.scss'

class NewWord extends Component {
  _submit = e => {
    e.preventDefault()
    this.props.addWord(this.refs.addWord.value, this.refs.addDef.value)
  }

  _focus = (e) => {
    e.target.setSelectionRange(0, e.target.value.length)
  }
  render () {
    return (
      <div className={styles.forms}>
        <div className={styles.userInput}>
          <form onSubmit={this._submit}>
            <input onFocus={this._focus} type='text' ref='addWord' placeholder='Word' />
            <textarea onFocus={this._focus} ref='addDef' placeholder='Definition' />
            <input type='submit' value='Submit' />
          </form>
        </div>
      </div>
    )
  }
}

export default NewWord

import React, { Component } from 'react'

class NewWord extends Component {
  _submit = e => {
    e.preventDefault()
    this.props.addWord(this.refs.addWord.value, this.refs.addDef.value)
    this.refs.addWord.value = ''
    this.refs.addDef.value = ''
  }

  _exit = () => {
    this.props.exit()
  }

  _focus = (e) => {
    e.target.setSelectionRange(0, e.target.value.length)
  }
  render () {
    return (
      <div className={this.props.clicked ? 'addWordDef' : 'addWordDef hidden'}>
        <div className='overlay'>
          <div className='forms'>
            <div className='userInput'>
              <form onSubmit={this._submit}>
                <textarea className='wordInput' onFocus={this._focus} ref='addWord' placeholder='Word' />
                <textarea className='defInput' onFocus={this._focus} ref='addDef' placeholder='Definition' />
                <button className='defSubmit' onClick={this._exit} type='submit'>Submit</button>
                <button onClick={this._exit} className='exitBtn'><i className='fa fa-close' /></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewWord

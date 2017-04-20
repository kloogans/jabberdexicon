import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class NewWord extends Component {
  _submit = e => {
    e.preventDefault()
    this.props.addWord(this.refs.addWord.value, this.refs.addDef.value)
    this.refs.addWord.value = ''
    this.refs.addDef.value = ''
  }

  _focus = (e) => {
    e.target.setSelectionRange(0, e.target.value.length)
  }
  _exit = () => {
    this.props.exit()
  }
  render () {
    return (
      <div className='addWordDef'>
        <div className='overlay'>
          <div className='forms'>
            <div className='userInput'>
              <form onSubmit={this._submit}>
                <textarea className='wordInput' onFocus={this._focus} ref='addWord' placeholder='Word' />
                <textarea className='defInput' onFocus={this._focus} ref='addDef' placeholder='Definition' />
                <div className='controlBtns'>
                  <button className='defSubmit' type='submit'><i className='fa fa-check' /></button>
                  <NavLink to='/' className='exit'>
                    <button onClick={this._exit} className='exitBtn'><i className='fa fa-close' /> </button>
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewWord

import React, { Component } from 'react'
const token = 'test'

class EditWord extends Component {
  state = {}

  slug = this.props.match.params.slug

  componentDidMount () {
    const url = `https://jabberdexicon.herokuapp.com/entries/${this.slug}?access_token=${token}`
    window.fetch(url)
    .then(r => r.json())
    .then(data => {
      this.setState({
        ...data
      })
    })
  }

  _submit = e => {
    e.preventDefault()
    this.editWord(this.refs.editedDef.value)
  }

  editWord = editedDef => {
    const url = `https://jabberdexicon.herokuapp.com/entries/${this.slug}?access_token=${token}`
    window.fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'entry': {
          'definition': editedDef
        }
      })
    })
    this.props.history.push(`/entry/${this.slug}`)
  }

  _focus = e => {
    e.target.setSelectionRange(0, e.target.value.length)
  }

  _change = () => {
    this.setState({
      definition: this.refs.editedDef.value
    })
  }

  render () {
    return <div className='EditWordAll'>
      <div className='overlay'>
        <div className='forms'>
          <div className='userInput'>
            <form onSubmit={this._submit}>
              <div className='wordInput'>
                {this.state.term}
              </div>
              <textarea className='defInput' onFocus={this._focus} onChange={this._change} ref='editedDef' placeholder='New Definition' />
              <div className='controlBtns'>
                <button className='defSubmit' type='submit'><i className='fa fa-check' /></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  }
}

export default EditWord

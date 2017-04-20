import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Home extends Component {
  render () {
    return <div>
      <div className='addItemBtn'>
        <NavLink to='/addword/' className='homeLink'>
          <button className='addInfo'>
            <i className='fa fa-plus' />
          </button>
        </NavLink>
      </div>
      <header>
        <div className='topNav'>
          <NavLink to='/' className='homeLink'>
            <h1>Jabberdexicon</h1>
          </NavLink>
        </div>
      </header>
    </div>
  }
}

export default Home

import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route
} from 'react-router-dom'
// import Info from './Info'
import Search from './Search'
import ShowSearch from './ShowSearch'
import Result from './Result'
import NewWord from './NewWord'
import Letters from './Letters'
import BrowseLetter from './BrowseLetter'
import EditItem from './EditItem'
const token = 'vorpal'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clicked: false,
      active: {},
      info: false
    }
    this.clicked = this.clicked.bind(this)
  }
  // Toggle click true/false
  clicked () {
    this.setState(prevState => ({
      clicked: !prevState.clicked,
      info: false
    }))
  }
  // Fills empty object in 'active' state
  loadWords () {
    const url = `https://jabberdexicon.herokuapp.com/entries?access_token=${token}`
    window.fetch(url)
    .then(r => r.json())
    .then(data => {
      this.setState({
        active: data
      })
    })
  }

  componentDidMount () {
    this.loadWords()
  }

  addWord = (newTerm, newDef) => {
    const url = `https://jabberdexicon.herokuapp.com/entries?access_token=${token}`
    window.fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        entry: {
          term: newTerm,
          definition: newDef
        }
      })
    }).then(r => r.json())
      .then(data => {
        if (data.term[0] === 'has already been taken') {
          window.alert(`${newTerm} already exists!`)
        } else {
          window.alert(`${newTerm} was created successfully`)
          this.props.history.push(`/entry/${data.slug}`)
        }
      })
  }

  // Exit NewWord component
  exit = () => {
    this.setState({
      clicked: false
    })
  }

  infoClick = () => {
    this.setState({ info: true })
    console.log('click')
  }

  render () {
    return <Router>
      <div className='App'>
        <div className='addItemBtn'>
          {/* <button onClick={this.infoClick} className='infoBtn'>
            <i className='fa fa-info' />
          </button> */}
          <NavLink to={this.state.clicked ? '/' : '/addword/'} className='homeLink'>
            <button onClick={this.clicked}
              className={this.state.clicked ? 'addInfo addWordRotate open' : 'addInfo addWordRotate'
            }>
              <i className='fa fa-plus' />
            </button>
          </NavLink>
        </div>
        <header>
          <div className='topNav'>
            <NavLink to='/' className='homeLink' onClick={this.exit}>
              <h1>Jabberdexicon</h1>
            </NavLink>
          </div>
        </header>
        <main>
          <Letters />
          <Route exact path='/' />
          <Search clicked={this.state.clicked} />
          {/* <Info infoClicked={this.state.info} /> */}
          <Switch>
            <Route path='/addword'
              render={(props) => {
                return <NewWord
                  term={this.state.term}
                  addWord={this.addWord}
                  active={this.state.active}
                  exit={this.exit}
                  clicked={this.state.clicked} />
              }
            }
            />
            <Route path='/entries/:slug' component={Result} />
            <Route path='/browse/:letter' component={BrowseLetter} />
            <Route path='/search/:word' component={ShowSearch} />
            <Route path='/edit/:slug' component={EditItem} />
          </Switch>
        </main>
        <footer>
          <div className='copyright'>
            <p>&copy; James O'Brien 2017</p>
          </div>
        </footer>
      </div>
    </Router>
  }
}

export default App

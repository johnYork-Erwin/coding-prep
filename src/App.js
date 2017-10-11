import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Splash from './components/Splash.js';
import NewQ from './components/NewQ.js';
import specificQ from './components/specificQ.js';
import LogIn from './components/LogIn.js';
import axios from 'axios';

function Head(props) {
  return (
    <header>
      <button className="right" onClick={() => {props.logIn()}}>{props.loggedIn ? 'Log Out' : 'Log In'}
      </button>
    </header>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
    this.logIn = this.logIn.bind(this);
  }

  logIn() {
    if (!this.state.loggedIn) {
      window.location.href='/login';
    } else {
      axios.delete('/token')
        .then((result) => {
          this.setState({
            loggedIn: false
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  componentWillMount() {
    axios.get('/token')
      .then((response) => {
        this.setState({
          loggedIn: response.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path="/" exact={true} render={() => (
              <div>
                <Head loggedIn={this.state.loggedIn} logIn={this.logIn}></Head>
                <Splash loggedIn={this.state.loggedIn}></Splash>
              </div>
            )} />
            <Route path="/login" component={LogIn} />
            <Route path="/newQ" exact={true} component={NewQ} />
            <Route path="/:id" component={specificQ}/>
          </div>
        </Router>
      </div>
    );
  }
}



export default App;

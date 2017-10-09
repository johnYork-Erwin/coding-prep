import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Splash from './components/Splash.js';
import Head from './components/Head.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
    this.logIn = this.logIn.bind(this);
  }


  logIn() {
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    }))
  }

  render() {
    return (
      <div>
        <Head loggedIn={this.state.loggedIn} logIn={this.logIn}></Head>
        <Router>
          <div>
            <Route path="/" exact={true} render={() => (
              <Splash loggedIn={this.state.loggedIn}></Splash>
            )} />
          </div>
        </Router>
      </div>
    );
  }
}



export default App;

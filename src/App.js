import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Splash from './components/Splash.js';
import Head from './components/Head.js';
import NewQ from './components/NewQ.js';
import specificQ from './components/specificQ.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
    this.logIn = this.logIn.bind(this);
  }


  logIn() {
    this.setState({
      loggedIn: !this.state.loggedIn
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
            <Route path="/newQ" exact={true} component={NewQ} />
            <Route path="/:id" component={specificQ}/>
          </div>
        </Router>
      </div>
    );
  }
}



export default App;

import React from 'react';
import Stats from './Stats.js';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'


class Splash extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    let subSection = 'Not Logged In'
    if (this.props.loggedIn) {
      subSection = <Stats/>;
    }
    return(
      <div>
        <h1 className="center">Welcome!</h1>
        <h2 className="center">Lets get you a problem...</h2>
        <button><Link to={'/1/prompt'}>Get Question</Link></button>
        <div>{subSection}</div>
      </div>
    );
  }
}


export default Splash;

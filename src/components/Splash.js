import React from 'react';
import Stats from './Stats.js';

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
        <h2>Lets get you a problem...</h2>
        <div>{subSection}</div>
      </div>
    );
  }
}


export default Splash;

import React from 'react';
import Stats from './Stats.js';
import {Link} from 'react-router-dom'


class Splash extends React.Component {
  render(){
    let subSection = 'Not Logged In'
    if (this.props.loggedIn) {
      subSection = <Stats/>;
    }
    return(
      <div>
        <h1 className="center">Welcome!</h1>
        <h2 className="center">Lets get you a problem...</h2>
        <form name="form">
          <label>
            Duration:
          </label>
          <input type="number" name="duration" placeholder="duration"/>
          <label>
            Difficulty:
          </label>
          <select name="difficulty">
            <option value="Easy">Casual</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Brutal</option>
          </select>
          <label>
            Language:
          </label>
          <select name="language">
            <option value="JavaScript">JavaScript</option>
          </select>
        </form>
        <button><Link to={'/1/prompt'}>Get Question</Link></button>
        <h4 className="center">Personal Progress</h4>
        <div>{subSection}</div>
      </div>
    );
  }
}


export default Splash;

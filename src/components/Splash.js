import React from 'react';
import Stats from './Stats.js';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class Splash extends React.Component {

  constructor(props) {
    super(props);
    this.getQuestion = this.getQuestion.bind(this)
    this.thisQuestion = this.thisQuestion.bind(this)
  }

  getQuestion() {
    axios.get('/questions')
      .then((response) => {
        console.log(response.data)
        let index = Math.floor(Math.random()*response.data.length)
        let id = response.data[index].id;
        window.location.href = `/${id}/prompt`;
      })
      .catch((err) => {
        console.log(err)
      })
  }

  thisQuestion() {

  }

  render(){
    return(
      <div>
        <h1 className="center">Welcome!</h1>
        <h2 className="center">Lets get you a problem...</h2>
        <form name="form" onSubmit={this.thisQuestion}>
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
          <button type="submit">Get a Question Like THIS!</button>
        </form>
        <button onClick={this.getQuestion}>Get Question</button>
        <h4 className="center">Personal Progress</h4>
        {
          this.props.loggedIn &&
          <Stats loggedIn={this.props.loggedIn}/>
        }
        {
          !this.props.loggedIn &&
          <div>Not Logged In</div>
        }
      </div>
    );
  }
}


export default withRouter(Splash);

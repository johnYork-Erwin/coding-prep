import React from 'react';
import Stats from './Stats.js';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class Splash extends React.Component {

  constructor(props) {
    super(props);
    this.getQuestion = this.getQuestion.bind(this)
    this.thisQuestion = this.thisQuestion.bind(this)
    this.state = {
      thereAreNone: ''
    }
  }

  getQuestion() {
    axios.get('/questions')
      .then((response) => {
        let index = Math.floor(Math.random()*response.data.length)
        let id = response.data[index].id;
        window.location.href = `/${id}/prompt`;
      })
      .catch((err) => {
        console.log(err)
      })
  }

  thisQuestion(event) {
    event.preventDefault();
    let duration = event.target.duration.value;
    let language = event.target.language.value;
    let difficulty = event.target.difficulty.value;
    axios.get(`/questions/${duration}/${language}/${difficulty}`)
      .then((response) => {
        if (response.data.length === 0) {
          this.setState({
            thereAreNone: 'There are no questions which match those parameters'
          })
        } else {
          let index = Math.floor(Math.random()*response.data.length);
          let id = response.data[index].id;
          window.location.href = `/${id}/prompt`;
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render(){
    return(
      <div>
        <h1 className="center">Welcome!</h1>
        <h2 className="center">Lets get you a problem...</h2>
        <form name="form" onSubmit={this.thisQuestion}>
          <label>
            How many minutes do you have?
          </label>
          <select name="duration">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </select>
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
            <option value="Ruby">Ruby</option>
          </select>
          <button type="submit">Get a Question Like THIS!</button>
        </form>
        <div className="center">{this.state.thereAreNone}</div>
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

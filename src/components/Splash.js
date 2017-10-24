import React from 'react';
import Stats from './Stats.js';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Splash extends React.Component {

  constructor(props) {
    super(props);
    this.getQuestion = this.getQuestion.bind(this)
    this.thisQuestion = this.thisQuestion.bind(this)
    this.postLoad = this.postLoad.bind(this)
    this.state = {
      thereAreNone: '',
      username: undefined,
    }
  }

  getQuestion() {
    if (this.state.username) {
      axios.get('/results/failures')
        .then((results) => {
          console.log(results, 'in results failures')
          if (results.data.length > 0) {
            let index = Math.floor(Math.random()*results.data.length)
            let id = results.data[index].id
            window.location.href = `/${id}/prompt`;
          } else {
            axios.get('/questions/none')
              .then((results) => {
                console.log(results, 'inresults none')
                if (results.data.length > 0) {
                  let index = Math.floor(Math.random()*results.data.length)
                  let id = results.data[index].id
                  window.location.href = `/${id}/prompt`;
                } else {
                  axios.get('/questions')
                  .then((response) => {
                    console.log(response, '/questions')
                    let index = Math.floor(Math.random()*response.data.length)
                    let id = response.data[index].id;
                    window.location.href = `/${id}/prompt`;
                  })
                  .catch((err) => {
                    console.log(err)
                  })
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios.get('/questions')
      .then((response) => {
        console.log(response, '/questions')
        let index = Math.floor(Math.random()*response.data.length)
        let id = response.data[index].id;
        window.location.href = `/${id}/prompt`;
      })
      .catch((err) => {
        console.log(err)
      })
    }
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

  postLoad() {
    if (this.props.loggedIn) {
      axios.get('/users/username').then((result) => {
        this.setState({
          username: result.data[0].username,
        })
      }).catch((err) => console.log(err))
    }
  }

  render(){
    if (this.props.loggedIn && !this.state.username) {
      this.postLoad();
    }
    return(
      <div>
        {this.props.loggedIn ?
          <h1 className="center">Welcome "{this.state.username}"!</h1> :
          <h1 className="center">Hello stranger!</h1>
        }
        <h2 className="center">Lets get you a problem...</h2>
        <form id="wrapperSpecificQ" name="form" onSubmit={this.thisQuestion}>
          <div id="specificQSelectors">
            <label className="center">
              How many minutes do you have?
            </label>
            <select name="duration">
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
            <label className="center">
              Difficulty:
            </label>
            <select name="difficulty">
              <option value="Easy">Casual</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Brutal</option>
            </select>
            <label className="center">
              Language:
            </label>
            <select name="language">
              <option value="JavaScript">JavaScript</option>
              <option value="Ruby">Ruby</option>
            </select>
          </div>
          <button id="specificQSubmit" type="submit">Get This Question</button>
          <button id="randomQSubmit" onClick={this.getQuestion}>Get Some Question</button>
          <div id="none" className="center">{this.state.thereAreNone}</div>
        </form>
        <h4 className="center">Personal Progress</h4>
        {
          this.props.loggedIn ?
          <Stats loggedIn={this.props.loggedIn}/> :
          <div className="center">Not Logged In</div>
        }
      </div>
    );
  }
}


export default withRouter(Splash);

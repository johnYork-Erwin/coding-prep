import React from 'react';
import axios from 'axios';

class LogIn extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange = function(e) {
    const object = {}
    const title = e.target.name;
    object[title] = e.target.value;
    this.setState(object);
  }

  handleSubmit(event) {
    event.preventDefault()
    let action = event.target.name;
    if (action === 'create') {
      return axios.post('/users', this.state)
        .then((response) => {
          return axios.post('/token', this.state)
            .then((response) => {
              window.location.href="/"
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    }
    return axios.post('/token', this.state)
      .then((response) => {
        window.location.href="/";
      })
      .catch((err) => {
        console.log(err)
      })

  }

  render(){
    let styles = {
      justifySelf: 'center',
      marginTop: 5,
      marginBottom: 5,
      borderRadius: 5,
      gridColumn: 2/3,
    }
    return(
      <div id="wrapperLogIn">
        <h2 id="titleLogIn">Welcome, log in or create user here.</h2>
        <form name="form" id="formLogIn">
          <label>
            Username:
          </label>
          <input type="text" name="username" value={this.state.username} placeholder="username" onChange={this.handleChange}/>
          <br></br>
          <label>
            Password:
          </label>
          <input type="text" name="password" value={this.state.password} placeholder="password" onChange={this.handleChange}/>
          <button style={styles} type="submit" name="create" onClick={this.handleSubmit}> Create User </button>
          <button style={styles} type="submit" name="login" onClick={this.handleSubmit}> Log In </button>
        </form>
      </div>
    );
  }
}

export default LogIn;

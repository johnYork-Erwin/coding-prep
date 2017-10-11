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
          console.log(response);
          return axios.post('/token', this.state)
            .then((response) => {
              window.location.href="/"
            })
            .catch((err) => {
              console.log(err, 'Error')
            })
        })
        .catch((err) => {
          console.log(err)
        })
    }
    console.log('logging in', this.state)
    return axios.post('/token', this.state)
      .then((response) => {
        window.location.href="/";
      })
      .catch((err) => {
        console.log(err)
      })

  }

  render(){
    return(
      <div>
        <h1>Hello LogIn </h1>
        <form name="form">
          <label>
            Username:
          </label>
          <input type="text" name="username" value={this.state.username} placeholder="username" onChange={this.handleChange}/>
          <label>
            Password:
          </label>
          <input type="text" name="password" value={this.state.password} placeholder="password" onChange={this.handleChange}/>
          <button type="submit" name="create" onClick={this.handleSubmit}> Create User </button>
          <button type="submit" name="login" onClick={this.handleSubmit}> Log In </button>
        </form>
      </div>
    );
  }
}

export default LogIn;

import React from 'react';
import axios from 'axios';

class NewQ extends React.Component {
  constructor() {
    super();
    this.state = {
      answer: undefined,
      prompt: undefined,
      expected_outputs: undefined,
      difficulty: undefined,
      language: undefined,
      title: undefined,
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.back = this.back.bind(this)
  }

  back () {
    window.location.href = '/'
  }

  handleChange = function(e) {
    const object = {}
    const title = e.target.name;
    object[title] = e.target.value;
    this.setState(object);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    for (let key in this.state) {
      if (!this.state[key]) valid = false;
    }
    if (valid) {
      axios.post('/questions', this.state)
      .then((response) => {
        window.location.href="/";
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  render() {
    const style = {
      width: 100,
      height: 40,
    }
    return (
      <div id="wrapperNewQ">

        <h3 id="newQTitle">Submit your own question!</h3>

        <form id="newQForm" name="form" onSubmit={ (event) => this.handleSubmit(event) }>

          <div id="newQtop">
            <label>
              Title:
            </label>
            <input type="text" name="title" value={this.state.title} placeholder="title" onChange={this.handleChange}/>

          </div>

          <div id="newQleft">
            <label>
              Difficulty:
            </label>
            <select name="difficulty" value={this.state.difficulty} placeholder="difficulty" onChange={this.handleChange}>
              <option value="Easy">Casual</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Brutal</option>
            </select>

            <label>
              Language:
            </label>
            <select name="language" value={this.state.language} placeholder="language" onChange={this.handleChange}>
              <option value="JavaScript">JavaScript</option>
              <option value="Ruby">Ruby</option>
            </select>

            <label>
              Duration:
            </label>
            <select name="duration" value={this.state.duration} placeholder="duration" onChange={this.handleChange}>
              <option value="10">10 Minutes</option>
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
            </select>
          </div>

          <div id="newQright">
            <label>
              Prompt:
            </label>
            <textarea type="text" style={style} name="prompt" value={this.state.prompt} placeholder="prompt" onChange={this.handleChange}/>

            <label>
              Example Outputs:
            </label>
            <textarea type="text" style={style} name="expected_outputs" value={this.state.expected_outputs} placeholder="outputs" onChange={this.handleChange}/>

            <label>
              Answer:
            </label>
            <textarea type="text" style={style} name="answer" value={this.state.answer} placeholder="answer" onChange={this.handleChange}/>
          </div>

          <button id="newQSubmit" type="submit"> Submit! </button>

        </form>
        <button id="newQBack" onClick={this.back}>Back</button>
      </div>
    );
  }
}

export default NewQ;

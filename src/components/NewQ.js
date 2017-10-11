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
        console.log('success!')
        window.location.href="/";
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  render() {

    return (
      <div>

        <form name="form" onSubmit={ (event) => this.handleSubmit(event) }>

          <label>
            Title:
          </label>
          <input type="text" name="title" value={this.state.title} placeholder="title" onChange={this.handleChange}/>

          <label>
            Prompt:
          </label>
          <input type="text" name="prompt" value={this.state.prompt} placeholder="prompt" onChange={this.handleChange}/>

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

          <label>
            Example Outputs:
          </label>
          <input type="text" name="expected_outputs" value={this.state.expected_outputs} placeholder="outputs" onChange={this.handleChange}/>

          <label>
            Answer:
          </label>
          <input type="text" name="answer" value={this.state.answer} placeholder="answer" onChange={this.handleChange}/>

          <button type="submit"> Submit! </button>

        </form>

      </div>
    );
  }
}

export default NewQ;

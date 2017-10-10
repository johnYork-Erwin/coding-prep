import React, { Component } from 'react';

class NewQ extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault();
    //the data from the form is available here
    let form = event.target;
    console.log(form.difficulty.value);
    window.location.href="/";
  }

  render() {

    return (
      <div>

        <form name="form" onSubmit={ (event) => this.handleSubmit(event) }>

          <label>
            Title:
          </label>
          <input type="text" name="title" />

          <label>
            Prompt:
          </label>
          <input type="text" name="prompt" />

          <label>
            Difficulty:
          </label>
          <select name="difficulty">
            <option value="Easy">Casual</option>
            <option value="Medium">Medium</option>
            <option selected value="Hard">Brutal</option>
          </select>

          <label>
            Language:
          </label>
          <select name="language">
            <option selected value="JavaScript">JavaScript</option>
          </select>

          <label>
            Duration:
          </label>
          <select name="duration">
            <option value="10">10 Minutes</option>
            <option selected value="15">15 Minutes</option>
            <option value="30">30 Minutes</option>
          </select>

          <label>
            Example Outputs:
          </label>
          <input type="text" name="outputs" />

          <button type="submit"> Submit! </button>

        </form>

      </div>
    );
  }
}

export default NewQ;

import React, { Component } from 'react';

class Results extends React.Component {

  constructor() {
    super();
    this.back = this.back.bind(this);
  }

  back() {
    window.location.href="/";
  }

  render() {
    return (
      <div>
        <h1 className="center">How did you do?</h1>
        <form name="form" onSubmit={ (event) => this.handleSubmit(event) }>
          <label>
            Success?
          </label>
          <select name="success">
            <option value="Yes">Yes</option>
            <option selected value="No">No</option>
          </select>

          <label>
            Minutes Spent
          </label>
          <input type="number" name="duration"/>

        </form>

        <h4 className="center">Example Solution</h4>
        <div>
        </div>
        <button onClick={this.back}>Done</button>
      </div>
    );
  }
}

export default Results;

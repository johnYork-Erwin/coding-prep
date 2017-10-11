import React, { Component } from 'react';
import axios from 'axios';

function ExtraInfo(props) {
  if (props.extraInfo) {
    return (
      <div>
        <p>Difficulty: {props.question.difficulty}</p>
        <p>Language: {props.question.language}</p>
        <p>Created By: {props.question.created_by}</p>
      </div>
    )
  } else {
    return null;
  }
}

class Prompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {
        'prompt': "Write a function that accepts an integer and returns a boolean expressing whether or not that number is prime.",
        'answer': "function isPrime(int) {let end = Math.floor(Math.sqrt(int)); for (let i = 2; i < end; i++) {if (int/i % 1 === 0) return true}; return false;}",
        'expected_outputs': "5 => true, 6 => false, 1 => false, 2 => false",
        'difficulty': 'casual',
        'language': 'JavaScript',
        'title': 'Is It Prime?',
        'created_by': null
      },
      extraInfo: false
    }
    this.extras = this.extras.bind(this);
    this.finished = this.finished.bind(this);
    this.getQuestion = this.getQuestion.bind(this);

  }

  finished(event) {
    event.preventDefault();
    let questionId = this.props.match.params.id;
    window.location.href=`/${questionId}/results`;
  }

  getQuestion() {
    let questions;
    return axios.get('/questions')
      .then((response) => {
        let length = response.data.length;
        let index = Math.floor(Math.random()*length);
        console.log(index)
        this.setState({
          question: response.data[index]
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  extras() {
    this.setState({
      extraInfo: !this.state.extraInfo
    })
  }

  render() {
    return (
      <div className="container">
        <h3 className="center">Title: {this.state.question.title}</h3>
        <p>Prompt: {this.state.question.prompt}</p>
        <p>Example Outputs: {this.state.question.expected_outputs}</p>
        <ExtraInfo extraInfo={this.state.extraInfo} question={this.state.question}/>
        <button onClick={this.extras}> See More </button>
        <button onClick={this.finished}> Did It! </button>
        <button onClick={this.getQuestion}> Reroll </button>
      </div>

    );
  }
}

export default Prompt;

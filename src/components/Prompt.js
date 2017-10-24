import React from 'react';
import axios from 'axios';

function ExtraInfo(props) {
  if (props.extraInfo) {
    return (
      <div id="promptExtras">
        <p>Difficulty: {props.question.difficulty}</p>
        <p>Language: {props.question.language}</p>
        <p>Created By: "{props.question.created_by}"</p>
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
      extraInfo: false,
    }
    this.extras = this.extras.bind(this);
    this.finished = this.finished.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
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

  finished(event) {
    event.preventDefault();
    let questionId;
    if (this.props.historic) {
      questionId = this.props.qId
    } else {
      questionId = this.props.match.params.id;
    }
    window.location.href=`/${questionId}/results`;
  }

  extras() {
    this.setState({
      extraInfo: !this.state.extraInfo
    })
  }

  componentWillMount() {
    let qId;
    if (this.props.historic) {
      qId = this.props.qId;
    } else {
      qId = this.props.match.params.id;
    }
    return axios.get(`/questions/${qId}`)
      .then((result) => {
        this.setState({
          question: result.data[0],
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    if (this.state.question === undefined) {
      return null
    }
    return (
      <div id="wrapperPrompt">
        <h3 id="promptTitle">Title: {this.state.question.title}</h3>
        <p id="promptPrompt">Prompt: {this.state.question.prompt}</p>
        <p id="promptOutputs">Example Outputs: {this.state.question.expected_outputs}</p>
        <ExtraInfo extraInfo={this.state.extraInfo} question={this.state.question}/>
        <div id="promptButtons">
          {
            this.state.extraInfo ?
            <button onClick={this.extras}> See Less </button> :
            <button onClick={this.extras}> See More </button>
          }
          {  !this.props.historic ?
            <div>
              <button onClick={this.finished}> Did It! </button>
              <button onClick={this.getQuestion}> Reroll </button>
            </div> :
            <div>
              <button onClick={this.finished}> Redid it! </button>
            </div>
          }
        </div>
        <button id="promptBack" onClick={() => window.location.href='/'}>Back</button>
      </div>
    );
  }
}

export default Prompt;

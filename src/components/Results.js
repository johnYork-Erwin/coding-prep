import React from 'react';
import axios from 'axios'

class Results extends React.Component {

  constructor() {
    super();
    this.state = {
      question: undefined,

    };
    this.back = this.back.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    let questionId = this.props.match.params.id;
    axios.get(`/questions/${questionId}`)
      .then((response) => {
        this.setState({
          question: response.data[0]
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleSubmit(event) {
    event.preventDefault()
    let form = event.target
    if (form.success.value && form.duration.value) {
      let answer = null;
      if (form.answer.value !== "") {
        answer = form.answer.value
      }
      let object = {
        'question_id': this.state.question.id,
        'time_taken': form.duration.value,
        'correct': form.success.value,
        'attempted_at': new Date(),
        'answer': answer,
      }
      axios.post('/results', object)
        .then(() => this.back())
        .catch((err) => console.log(err))
    }
  }

  back() {
    window.location.href="/";
  }

  render() {
    if (this.state.question === undefined) {
      return null
    }
    return (
      <div>
        <h1 className="center">How did you do?</h1>
        <h4 className="center">Title: {this.state.question.title}</h4>
        <h5 className="center">Prompt:</h5>
        <div className="center sizedResults">
          {this.state.question.prompt}
        </div>
        <h4 className="center">Example Solution</h4>
        <div className="center sizedResults">
          {this.state.question.answer}
        </div>
        <br/>
        <form id="wrapperResults" name="form" onSubmit={ (event) => this.handleSubmit(event) }>
          <div id="resultsSuccess">
            <label>
              Success?
            </label>
            <select name="success">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div id="resultsMinutes">
            <label>
              Minutes Spent
            </label>
            <input type="number" name="duration"/>
          </div>

          <div id="resultsAnswer">
            <label>
              Your answer
            </label>
            <textarea type="text" name="answer"/>
          </div>
          <button id="resultsSubmit" type="submit">Submit</button>

        </form>
        <button className="center sizedResults" onClick={this.back}>Back</button>
      </div>
    );
  }
}

export default Results;

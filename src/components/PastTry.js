import React from 'react';
import Prompt from './Prompt.js';

class PastTry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {
        answer: this.props.location.state.result_answer,
        correct: this.props.location.state.correct,
        time_taken: this.props.location.state.time_taken,
        attempted_at: this.props.location.state.attempted_at,
      }
    }
  }
  

  render() {
    return (
      <div>
        <Prompt qId={this.props.match.params.id} historic={true}/>
        <div id="wrapperPast">
          <h4 id="pastTitle">Your Last Result</h4>
          <div id="pastAnswer">{
            this.state.result.answer ?
            <p>Your answer: {this.state.result.answer}</p> :
            <p>You didn't input your answer last time you tried this question</p>
          }
          </div>
          <div id="pastResult">
          {
            !this.state.result.correct ?
            <p><strong>You got it wrong</strong></p> :
            <p><strong>You got it right!</strong></p>
          }
          </div>
          <p id="pastInfo">This attempt occured on {this.state.result.attempted_at} and it took {this.state.result.time_taken} minutes to complete.</p>
        </div>
      </div>
    );
  }
}

export default PastTry;

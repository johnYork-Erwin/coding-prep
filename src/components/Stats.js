import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Chart from './Chart.js'

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'succeeded': undefined,
      'failed': undefined,
    }
    this.newQ = this.newQ.bind(this);
  }

  newQ() {
    window.location.href="/newQ"
  }

  componentWillMount() {
    axios.get('/results/user')
      .then((response) => {
        this.setState({
          pieData: response.data
        })
        let succeeded = response.data.filter(attempt => attempt.correct)
        succeeded = succeeded.map((success, index) => {
          let location = {
            pathname: `/${success.question_id}/history`,
            state: success,
          }
          return <li key={index}><Link to={location}>{success.title}</Link></li>
        })
        let failed = response.data.filter(attempt => !attempt.correct)
        failed = failed.map((failure, index) => {
          let location = {
            pathname: `/${failure.question_id}/history`,
            state: failure,
          }
          return <li key={index}><Link to={location}>{failure.title}</Link></li>
        })
        this.setState({
          'succeeded': succeeded,
          'failed': failed,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {

    if (this.state.succeeded === undefined && this.state.failed === undefined) {
      return null
    }
    return (
      <div id="wrapperStats">
        <div id="statsSuccesses">
          <h4 className="center">Successes</h4>
          <ul>
            {this.state.succeeded}
          </ul>
        </div>
        <div id="statsPie">
          <Chart pieData={this.state.pieData}/>
        </div>
        <div id="statsFailures">
          <h4 className="center">Failures</h4>
          <ul>
            {this.state.failed}
          </ul>
        </div>
        <button onClick={this.newQ} id="addQ">Add A New Question!</button>
      </div>
    )
  }
}

export default Stats;

import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
// import {PieChart} from 'react-d3';
// var PieChart = require('react-d3').PieChart;
console.log(React.PropTypes);
//
// class Chart extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     console.log(this.props.pieData)
//     return  (
//     	<PieChart
//         data={this.props.pieData}
//         width={450}
//         height={400}
//         radius={110}
//         innerRadius={20}
//         sectorBorderColor="white"
//         title="Pie Chart" />
//   )}
// }


class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'succeeded': undefined,
      'failed': undefined,
    }
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
    console.log(this.state.attempts)
    return (
      <div>
        <h4 className="center">Successes</h4>
        <ul>
          {this.state.succeeded}
        </ul>
        {/* <Chart pieData={this.state.pieData}/> */}
        <h4 className="center">Failures</h4>
        <ul>
          {this.state.failed}
        </ul>
        <Link to={'/newQ'}>Add A New Question!</Link>
      </div>
    )
  }
}

export default Stats;

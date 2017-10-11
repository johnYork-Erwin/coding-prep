import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'userResults': undefined,
    }
  }

  componentWillMount() {
    axios.get('/results/user')
      .then((response) => {
        this.setState({
          userResults: response.data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    if (this.state.userResults === undefined) {
      return null
    }
    return (
      <div>
        <div>
          {this.state.userResults[0].correct}
        </div>
        <Link to={'/newQ'}>Add A New Question!</Link>
      </div>
    )
  }
}

export default Stats;

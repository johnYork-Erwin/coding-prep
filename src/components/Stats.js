import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'


class Stats extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div>
        <h1 className="center">You have some stats!</h1>
        <Link to={'/newQ'}>Add A New Question!</Link>
      </div>
    )
  }
}

export default Stats;

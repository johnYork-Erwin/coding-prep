import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Results from './Results.js';
import PastTry from './PastTry.js';
import Prompt from './Prompt.js';


class SpecificQ extends React.Component {

  render() {
    return(
      <Router>
        <div>
          <Route path="/:id/history" component={PastTry}/>
          <Route path="/:id/results" component={Results}/>
          <Route path="/:id/prompt" component={Prompt}/>
        </div>
      </Router>
    )
  }
}

export default SpecificQ;

import React from 'react';

class Head extends React.Component {

  render() {
    return (
      <header>
        <button className="right" onClick={() => {this.props.logIn()}}>{this.props.loggedIn ? 'Log Out' : 'Log In'}
        </button>
      </header>
    );
  }
}

export default Head;

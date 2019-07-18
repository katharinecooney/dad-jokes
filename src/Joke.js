import React, { Component } from 'react';
import "@fortawesome/fontawesome-free/css/all.css";
import './Joke.css';

class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
        <i className="fas fa-arrow-up"></i>
          <span>{this.props.votes}</span>
          <i className="fas fa-arrow-down"></i>
        </div>
        <div className="Joke-text">
          {this.props.text}
        </div>
      </div>
    )
  }
}

export default Joke;
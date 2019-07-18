import React, { Component } from 'react';
import "@fortawesome/fontawesome-free/css/all.css";
import './Joke.css';

class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
        <i class="fas fa-arrow-up"></i>
          <p>{this.props.rating}</p>
          <i class="fas fa-arrow-down"></i>
        </div>
        <p>{this.props.joke}</p>
      </div>
    )
  }
}

export default Joke;
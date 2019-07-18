import React, { Component } from 'react';
import "@fortawesome/fontawesome-free/css/all.css";
import './Joke.css';

class Joke extends Component {
  constructor(props) {
    super(props);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  handleUpVote(){
    let {id, upChange, handleVote} = this.props;
    handleVote(id, upChange);
  }

  handleDownVote(){
    let {id, downChange, handleVote} = this.props;
    handleVote(id, downChange);
  }

  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
        <i className="fas fa-arrow-up" onClick={this.handleUpVote}></i>
          <span className="Joke-votes">{this.props.votes}</span>
          <i className="fas fa-arrow-down" onClick={this.handleDownVote}></i>
        </div>
        <div className="Joke-text">
          {this.props.text}
        </div>
        <div className="Joke-smiley">
          <i class="em em-rolling_on_the_floor_laughing"></i>
        </div>
      </div>
    )
  }
}

export default Joke;
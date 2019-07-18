import React, { Component } from 'react';
import axios from 'axios';
import './JokeList.css';
import Joke from './Joke';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  }

  constructor(props){
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]")
    }
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount(){
    // check if any jokes are saved in localStorage
    // if no jokes, request jokes
    if(this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes(){
    let jokes = [];
    while(jokes.length < this.props.numJokesToGet){
      let response = await axios.get('https://icanhazdadjoke.com/', {headers: {Accept: 'application/json'}});
      jokes.push({text: response.data.joke, votes: 0, id: response.data.id});
      
    }
    
    this.setState({
      jokes: jokes
    })
    window.localStorage.setItem(
      "jokes",
      JSON.stringify(jokes)
    )
  }

  handleVote(id, change) {
    this.setState(st => ({
      jokes: st.jokes.map( j =>
        j.id === id ? { ...j, votes: j.votes + change } : j
      )
    }))
  }
  





  render() {
    let allJokes = this.state.jokes.map(joke => <Joke key={joke.id} votes={joke.votes} text={joke.text} handleVote={this.handleVote} id={joke.id} upChange={1} downChange={-1}/>)
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title"><span>Dad </span>Jokes!</h1>
          <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="Crying laughter face" />
          <button className="JokeList-getmore">New Jokes</button>

        </div>
        
        <div className="JokeList-jokes">
          {allJokes}
        </div>
      </div>
    )
  }
}

export default JokeList;
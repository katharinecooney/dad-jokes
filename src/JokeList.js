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
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      isLoading: false
    }
    this.seenJokes = new Set(this.state.jokes.map(j => j.text));
    console.log(this.seenJokes)
    this.handleVote = this.handleVote.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
      let newJoke = response.data.joke;
      if(!this.seenJokes.has(newJoke)){
        jokes.push({text: newJoke, votes: 0, id: response.data.id});
      } else {
        console.log("found a duplicate! ", newJoke)
      }
      
    }
    this.setState(st => ({
      jokes: [...st.jokes, ...jokes],
      isLoading: false
    }),
      // this anon function runs after the state is set
      // it will save each joke in localStorage
      () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
    
  }

  handleVote(id, change) {
    this.setState(st => ({
      jokes: st.jokes.map( j =>
        j.id === id ? { ...j, votes: j.votes + change } : j
      )
    }),
      // this anon function runs after the state is set
      // it will save the votes for each joke in localStorage
      () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    )
  }

  handleClick(){
    this.setState({isLoading: true}, this.getJokes)
  }

  render() {
    if(this.state.isLoading){
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="JokeList-title">Loading...</h1>
        </div> 
      )
    }


    let allJokes = this.state.jokes.map(joke => <Joke key={joke.id} votes={joke.votes} text={joke.text} handleVote={this.handleVote} id={joke.id} upChange={1} downChange={-1}/>)
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title"><span>Dad </span>Jokes!</h1>
          <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="Crying laughter face" />
          <button onClick={this.handleClick} className="JokeList-getmore">New Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {allJokes}
        </div>
      </div>
    )
  }
}

export default JokeList;
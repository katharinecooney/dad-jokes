import React, { Component } from 'react'
import axios from 'axios'
import './DadJokeList.css'

class DadJokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  }

  constructor(props){
    super(props);
    this.state = {
      jokes: []
    }
  }

  async componentDidMount(){
    let jokes = [];
    while(jokes.length < this.props.numJokesToGet){
      let response = await axios.get('https://icanhazdadjoke.com/', {headers: {Accept: 'application/json'}});
      jokes.push(response.data.joke);
    }
    this.setState({
      jokes: jokes
    })
    
    }
  

  render() {
    let allJokes = this.state.jokes.map(joke => <p>{joke}</p>)
    return (
      <div className="DadJokeList">
        <h1>Dad Jokes!</h1>
        <div className="DadJokeList">
        {allJokes}
        </div>
      </div>
    )
  }
}

export default DadJokeList;
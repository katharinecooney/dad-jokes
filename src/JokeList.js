import React, { Component } from 'react'
import axios from 'axios'
import './JokeList.css'

class JokeList extends Component {
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
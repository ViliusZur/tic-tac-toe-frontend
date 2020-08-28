import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      log: [],
      xIsNext: true, // change between X and O
      winner: false,
    };
  }

  componentDidMount = async () => {
    console.log("component did mount");
    await this.getLogs();
    console.log("got logs");
  }

  handleClick = async (i) => {
    if(this.state.winner || this.state.squares[i] || this.state.winner === null){
      return;
    }
    const value = this.state.xIsNext ? 'X' : 'O';
    const data = {
      "square":i,
      "value":value,
      "newGame":false
    }
    const query = 'http://localhost:8080/api/log';
    // send a request to log an event
    await fetch(query, {
      credentials: 'include',
      method: "POST",
      headers:
      {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    this.setState({
      xIsNext: !this.state.xIsNext,
    });
    await this.getLogs();
  }

  getLogs = async () => {
    const query = 'http://localhost:8080/api/getLogs';
    await fetch(query, {
      credentials: 'include',
      method: "GET",
      headers:
      {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      if(res.ok) {
        res.json().then(json => {

          this.setState({
            squares: json.squares,
            log: json.log,
            winner: json.winner,
          });
          console.log(json.squares, json.log, json.winner, this.state.xIsNext);
        });
      } else {
        console.log("error in fetching search query");
      }
    });
    
  }

  newGame = async () => {
    // creates a new game
    const data = {
      "square":null,
      "value":null,
      "newGame":true
    }
    const query = 'http://localhost:8080/api/log';
    // send a request to log an event
    await fetch(query, {
      credentials: 'include',
      method: 'POST',
      headers:
      {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    this.setState({
      xIsNext: 'X',
    });
    await this.getLogs();
  }

  newSession = async () => {
    // creates a new session in the backend
    const query = 'http://localhost:8080/api/closeSession';
    await fetch(query, {
      credentials: 'include',
      method: 'POST',
      headers:
      {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    this.setState({
      xIsNext: 'X',
    });
    await this.getLogs();
  }

  renderSquare(i) {
    return (
    <Square 
      value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)}
    />
    );
  }

  render() {
    let status;
    if (this.state.winner) {
      status = 'Winner: ' + this.state.winner;
    } else if (this.state.winner === null) {
      status = 'Nobody won the game.';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <button className="newGame" onClick={() => this.newGame()}>New Game</button>
          <br></br>
          <button className="newSession" onClick={() => this.newSession()}>New Session</button>
        </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

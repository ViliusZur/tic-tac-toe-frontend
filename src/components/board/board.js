import React from 'react';
import './board.css';
import api from '../../utils/fetch_functions/fetch_functions';

const Square = ({ value, onClick, num }) => {
  return (
    <button className='square' data-testid={'square'+num} onClick={onClick}>
      {value}
    </button>
  );
}

export default class Board extends React.Component {

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
    // retrieve logs from the API when website opens up
    await this.getLogs();
  }

  handleClick = async (i) => {
    if(this.state.winner || this.state.squares[i] || this.state.winner === null){
      // if there is a winner, the square already has X or O, or if the game is finished without a winner - do nothing
      return;
    }
    const value = this.state.xIsNext ? 'X' : 'O';
    const data = {
      "square":i,
      "value":value,
      "newGame":false,
    }
    // send data to API
    await api.postData(data);
    // change the value for the next click
    this.setState({
      xIsNext: !this.state.xIsNext,
    });
    await this.getLogs();
  }

  getLogs = async () => {
    // retrieves logs from API
    const response = await api.retrieveLogs();
    let xState;
    if(response.log[0] && response.log[0].includes('X')) xState = false;
    else xState = true;
    this.setState({
      squares: response.squares,
      log: response.log,
      winner: response.winner,
      xIsNext: xState,
    });
  }

  newGame = async () => {
    // creates a new game
    const data = {
      "square":null,
      "value":null,
      "newGame":true
    }
    await api.postData(data);
    // set the state so X would always be the starting value
    this.setState({
      xIsNext: 'X',
    });
    await this.getLogs();
  }

  newSession = async () => {
    // creates a new session in the API
    await api.closeSession();
    // set the state so X would always be the starting value
    this.setState({
      xIsNext: true,
    });
    await this.getLogs();
  }

  renderSquare(i) {
    return (
    <Square 
      value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)}
      num={i}
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
      <>
        <div>
          <div className="status" data-testid="status">{status}</div>
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
          <button className="newButton" data-testid="newGame" onClick={() => this.newGame()}>New Game</button>
          <br></br>
          <button className="newButton" data-testid="newSession" onClick={() => this.newSession()}>Clear Logs</button>
        </div>
        <div className="logs" data-testid="logs">
          Logs:
          {this.state.log.map((txt, index) => <p key={index}>{index+1}. {txt}</p>)}
        </div>
      </>
    );
  }
}
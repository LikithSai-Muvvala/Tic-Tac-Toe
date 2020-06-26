import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      winner: "No One is Winner",
      currentPlayer:"X",
      sqrValues: [
        null, null, null,
        null, null, null,
        null, null, null
      ]
    };
  }

  render() {
    return (
      <div>
        <h5> Current Player:  {this.state.currentPlayer} </h5>
        <h5> Winner:  {this.state.winner} </h5>
        <div className="board-row">
          <button className="btnStyle" onClick={()=>this.handler(0)}>{this.state.sqrValues[0]} </button>
          <button className="btnStyle" onClick={()=>this.handler(1)}>{this.state.sqrValues[1]} </button>
          <button className="btnStyle" onClick={()=>this.handler(2)}>{this.state.sqrValues[2]} </button>
        </div>
        <div className="board-row">
          <button className="btnStyle" onClick={()=>this.handler(3)}>{this.state.sqrValues[3]} </button>
          <button className="btnStyle" onClick={()=>this.handler(4)}>{this.state.sqrValues[4]} </button>
          <button className="btnStyle" onClick={()=>this.handler(5)}>{this.state.sqrValues[5]} </button>
        </div>
        <div className="board-row">
          <button className="btnStyle" onClick={()=>this.handler(6)}>{this.state.sqrValues[6]} </button>
          <button className="btnStyle" onClick={()=>this.handler(7)}>{this.state.sqrValues[7]} </button>
          <button className="btnStyle" onClick={()=>this.handler(8)}>{this.state.sqrValues[8]} </button>
        </div>
        <div>
          <br/>
          <button  onClick={()=> this.resetGame()}> Reset </button>
        </div>
      </div>
    );
  }

  async resetGame() {
    await this.setState({
      winner: "No One is Winner",
      currentPlayer:"X",
      sqrValues: [
        null, null, null,
        null, null, null,
        null, null, null
      ]
    })
  }

  async handler(idx) {
    debugger
    let winnerName = "";
    let vals = this.state.sqrValues;
    let currentPlr = this.state.currentPlayer;
    if(vals[idx]) {
      alert("Already Filled")
      return;
    }
    vals[idx] = currentPlr;
    let res = await this.winnerRes(currentPlr, vals);
    winnerName = res;
    currentPlr = (currentPlr === "X")?"O":"X"
    await this.setState({winner: winnerName,currentPlayer: currentPlr, sqrValues:vals});
  }

  winnerRes(curPly, vals) {
    let res = "No One is Winner";
    const options = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for(let rowIdx=0; rowIdx < options.length; rowIdx++) {
      let [a,b,c] = options[rowIdx]
      if((curPly === vals[a]) &&(curPly === vals[b]) &&(curPly === vals[c])) {
        res = curPly
        break;
      }
    }
    return res;
  }
}

render(<App />, document.getElementById("root"));

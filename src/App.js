import React, { Component } from 'react';
import './App.css';
import Cell from './components/cell';


const deflatten = (arr) => {
  let deflattened = [];
  let row = [];

  for (let index = 0; index < arr.length; index++) {
    row.push(arr[index]);
    if (((index + 1) % 4) === 0 ){
      deflattened.push(row);
      row = [];
    }   
  }

  return deflattened;
}

const random = (arr) => {
  const output = [...arr];
  let ran1 = Math.floor(Math.random() *16);
  let ran2 = Math.floor(Math.random() *16);
  while (ran1 === ran2){
    ran2 = Math.floor(Math.random() *16);
  }
  output[ran1] = output[ran2] = 2;
  
  return deflatten(output);
}
const createGridArray = () => {
  let grid = []
  for (let i = 0; i < 4; i++) {
    let col = []
    for (let j = 0; j < 4; j++) {
      col[j] = 0;
    }
    grid.push(col);
  }
  return random(grid.flat());
}

const isDirectinalKey = (code) => {
  return code >= 37 && code <= 40 
}
class App extends Component {
  // draw grid
  // add event listner
  // update grid on event

  componentDidMount(){
    window.addEventListener("keydown",(e) => {
      if(isDirectinalKey(e.keyCode)) {
        this.handleKeyPress(e) 
      }
    })
  }

  
  handleKeyPress = (e) => {
    console.log(e);
    switch(e.keyCode){
      case 37:
        this.handleHorizontal();
        break;
      default:
    }
  }

  state = {
    grid: createGridArray()
  }

  createGrid = ()=> {
    return this.state.grid.map((row, r) => <div key={`row-${r+1}`} className="grid-row">{ 
        row.map((cell, c) => <Cell key={`${r+1}-${c+1}`} value={cell}/>)}</div>)
  }
  

  handleHorizontal = () => {
    console.log('Left');
  }
  
  render() {
    // console.log(this.state);
    
    return (
        <div className="container">
          <div className="heading">
            <h1 className="title">2048</h1>
            <div className="score-container">0</div>
          </div>
          <p className="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>

          <div className="game-container">
            <div className="game-message">
              <p></p>
              <div className="lower">
                <a className="retry-button">Try again</a>
              </div>
            </div>

            <div className="grid-container">
              { this.createGrid() }
            </div>

            <div className="tile-container">

            </div>
          </div>
        </div>

  )
    ;
  }
}

export default App;

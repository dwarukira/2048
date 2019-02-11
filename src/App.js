import React, { Component } from 'react';
import './App.css';
import Cell from './components/cell';
import _ from 'lodash';

// Using destructing
const transpose = m => m.map((x,i) => m.map(x => x[i]));

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
};

const random = (arr) => {
  const output = [...arr];
  let ran1 = Math.floor(Math.random() *16);
  let ran2 = Math.floor(Math.random() *16);
  while (ran1 === ran2){
    ran2 = Math.floor(Math.random() *16);
  }
  output[ran1] = output[ran2] = 2;

  return deflatten(output);
};

const createGridArray = () => {
  let grid = [];
  for (let i = 0; i < 4; i++) {
    let col = [];
    for (let j = 0; j < 4; j++) {
      col[j] = 0;
    }
    grid.push(col);
  }
  return random(grid.flat());
};

const isDirectionalKey = (code) => {
  return code >= 37 && code <= 40
};


const merge = (row, indexComputation) => {
  console.log(indexComputation, row);
  let outputRow = [];
  for (let j = 0; j < row.length; j++) {
    if (row[j] === row[j+1]){
      outputRow.push(row[j]+row[j+1]);
      row.splice(j+1, 1);
    }else{
      outputRow.push(row[j]);
    }
  }
  if (outputRow.length < 4){
    const a = new Array((4 - outputRow.length)).fill(0);
    switch (indexComputation) {
      case 'left':
        return outputRow.concat(a);
      case 'right':
        return a.concat(outputRow);
      case 'up':
        return outputRow.concat(a);
      case 'down':
        return a.concat(outputRow);
      default:
    }
  }
  return outputRow;
};

class App extends Component {
  // draw grid
  // add event listner
  // update grid on event

  componentDidMount(){
    window.addEventListener("keydown",(e) => {
      if(isDirectionalKey(e.keyCode)) {
        this.handleKeyPress(e)
      }
    })
  }


  handleKeyPress = (e) => {
    switch(e.keyCode){
      case 37:
        this.handleHorizontal('left');
        break;
      case 39:
        this.handleHorizontal('right');
        break;
      case 38:
        this.handleVertical('up');
        break;
      case 40:
        this.handleVertical('down');
        break;
      default:
    }
  };

  state = {
    grid: createGridArray()
  };

  createGrid = ()=> {
    return this.state.grid.map((row, r) => <div key={`row-${r+1}`} className="grid-row">{
        row.map((cell, c) => <Cell key={`${r+1}-${c+1}`} value={cell}/>)}</div>)
  };

  handleMovement = (grid, indexComputation) => {
    const newGrid = [];
    let row = [];
    for (let i = 0; i < grid.length; i++) {
      row = [];
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] !== 0){
          row.push(grid[i][j]);
        }
      }
      newGrid.push(merge(row, indexComputation));
    }

    // TODO Check to remove flat()
    if(_.isEqual(newGrid.flat(), grid.flat())){
      return newGrid;
    }

    const flatGrid = newGrid.flat();
    let ranIndex = Math.floor(Math.random() * flatGrid.length);

    let count = 0;
    while (flatGrid[ranIndex] !== 0) {
      ranIndex = Math.floor(Math.random() * flatGrid.length);
      count ++;
      if (count >  16){
        // TODO Game over on illegal move
        return newGrid;
      }
    }

    const ranFloat = Math.random();
    if (ranFloat < 0.5){
      flatGrid[ranIndex] = 2;
    } else {
      flatGrid[ranIndex] = 4;
    }

    return deflatten(flatGrid);
  };


  handleHorizontal = (indexComputation) => {
    const { grid } = this.state;

    this.setState({ grid: this.handleMovement(grid, indexComputation)});
  };

  handleVertical = (indexComputation) => {
    const { grid } = this.state;
    const newGrid = this.handleMovement(transpose(grid), indexComputation);
    this.setState({ grid: transpose(newGrid)});
  };

  render() {
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

import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
              <div className="grid-row">
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
              </div>
              <div className="grid-row">
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
              </div>
              <div className="grid-row">
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
              </div>
              <div className="grid-row">
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
              </div>
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

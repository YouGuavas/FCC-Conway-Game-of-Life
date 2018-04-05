import React, { Component } from 'react';
import './App.css';
import { Game } from './Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><a href="https://www.math.cornell.edu/~lipa/mec/lesson6.html" target="_blank" rel="noopener noreferrer">Conway's Game of Life</a></h1>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;

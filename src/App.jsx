import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import './App.css';
import 'react-materialize'

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
      </div>
    );
  }
}

export default App;

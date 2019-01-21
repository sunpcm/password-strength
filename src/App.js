import React, { Component } from 'react';

import PasswordStrength from './PasswordStrength'

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <PasswordStrength />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

import PasswordStrength from './PasswordStrength'

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <PasswordStrength
          changeCallback={() => { }}
          minScore={2}
          minLength={6}
          scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
        />
      </div>
    );
  }
}

export default App;

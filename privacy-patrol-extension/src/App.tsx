import React, { useState } from 'react';
import './App.css';
import HomePage from './pages/InitialPage';

function App() {
  return (
    <div className="App">
      <body>
        <h1>Privacy Patrol</h1>
        <div className="HomePage">
          <HomePage />
        </div>
      </body>
    </div>
  );
}

export default App;

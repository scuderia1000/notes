import React from 'react';
import './App.css';
import Workspace from './containers/workspace';

function App() {
  return (
    <div className="app">
      <header className="header">Sticky Notes</header>
      <Workspace />
    </div>
  );
}

export default App;
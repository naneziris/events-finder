import React from 'react';
import './App.css';
import EventsList from './components/EventsList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className="header">
        <h1 className="header__title">
          <a href="/">Events Finder</a>
        </h1>
        <h2 className="header__subtitle">Find upcoming events in USA</h2>
      </div>
      </header>
      <main>
        <EventsList />
      </main>
    </div>
  );
}

export default App;

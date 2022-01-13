import React, { Component } from 'react';
import './../styles/App.css';
import { FetchNasaApod, FetchNasaNeoWs, FetchNasaMRP } from './FetchNasaAPI.js'

function App() {
  return (
    <div className="App">
      <header className="header">The Picture of the Day</header>
        <div className="description">
            <FetchNasaApod />
        </div>
      <header className="header">Asteriods near earth</header>
        <div className="description">
            <FetchNasaNeoWs value={5}/>
        </div>
      <header className="header">Mars Rover Photos</header>
        <div className="description-mars-rover">
            <FetchNasaMRP value={5}/>
        </div>
    </div>
  );
}

export default App;

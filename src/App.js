import React from 'react'
import './App.css'
import QrCode from "./QrReader";
import TestUpdate from "./TestUpdate";

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <QrCode></QrCode>
        <TestUpdate></TestUpdate>
      </header>
    </div>
  )
}

export default App

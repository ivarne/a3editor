import React from 'react';
import './App.css';
import Editor from './features/editor/Editor';
import Zip from './features/zip/Zip';
import { Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
        <Zip/>
        <Editor/>
        </Routes>
      </header>
    </div>
  );
}

export default App;

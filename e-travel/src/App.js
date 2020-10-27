// React Imports
import React, { useState } from 'react'; 
import { Route, Switch} from 'react-router-dom';


// components: 
import Homepage from './components/Homepage'
import NotFoundPage from './components/NotFound/NotFoundPage'


import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact
            path="/" 
            component={Homepage} 
        />  

        <Route 
          path="*" 
          component={NotFoundPage}
        />
      </Switch>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// React Imports
import React from 'react'; 
import { Route, Switch} from 'react-router-dom';


// components: 
import Homepage from './components/Homepage'
import NotFoundPage from './components/NotFound/NotFoundPage'

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
    </div>
  );
}

export default App;

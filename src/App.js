// React Imports
import React from 'react'; 
import { Route, Switch} from 'react-router-dom';


// components: 
import Homepage from './components/homepage.component/homepage.component'
import NotFoundPage from './components/four-o-four.component/four-o-four.component'

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

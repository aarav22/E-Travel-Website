// React Imports
import React from 'react'; 
import { Route, Switch} from 'react-router-dom';


// components: 
import Homepage from './components/homepage.component/homepage.component';
import NotFoundPage from './components/four-o-four.component/four-o-four.component';
import Navbar from "./components/nav.component/nav.component";

function App() {
  return (
    <div className="App">
      <Navbar />
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

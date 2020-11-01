// React Imports
import React from 'react'; 
import { Route, Switch} from 'react-router-dom';


// components: 
import Homepage from './components/homepage.component/homepage.component';
import NotFoundPage from './components/four-o-four.component/four-o-four.component';
import Navbar from "./components/nav.component/nav.component";
import Address from "./components/profile.component/add.profile.component";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route
          path="/" exact
          component={Homepage}/>  

        <Route 
          path="/add"
          component={Address}/>

        <Route 
          path="*" 
          component={NotFoundPage}/>

      </Switch>
    </div>
  );
}

export default App;

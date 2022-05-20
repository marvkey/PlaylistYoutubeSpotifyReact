import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import View from "./pages/View";
function App() {
  return (
    <> 
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/view" component={View} />
        </Switch>
      </Router>
  </>
  );  
}

export default App;

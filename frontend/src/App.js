import "./App.css";
import React, { Component } from "react";
import CarList from "./components/CarList";
import CarEdit from "./components/CarEdit";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/Home";


class App extends Component{
  render() {
      return(
          <Router>
              <Switch>
                  <Route path='/' exact={true} component={Home}/>
                  <Route path='/cars' exact={true} component={CarList}/>
                  <Route path='/cars/:id' component={CarEdit}/>
              </Switch>
          </Router>
      )
  }
}

export default App;

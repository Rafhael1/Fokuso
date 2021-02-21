//Pages
import Home from './routes/Home' 

import Login from './components/Authentication/Login/Login'
import Register from './components/Authentication/Register/Register'
import Dashboard from './components/Authentication/Dashboard/Dashboard'

import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

function App() {
  return (
    <div className="App">
     <Home />
     <Router>
                <div>
                <Switch>
                    <Route exact path="/login" render={props => <Login {...props} />}></Route>
                    <Route exact path="/register" render={props => <Register {...props} />}></Route>
                    <Route exact path="/dashboard" render={props => <Dashboard {...props} />}></Route>
                </Switch>
                </div>
            </Router>
    </div>
  );
}

export default App;

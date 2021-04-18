import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import LoginView from './pages/login';
import SignupView from './pages/signup';
import AppLayout from './layout/appLayout';




function App() {
  return (
    <Router>
      <Switch>
        <Route path={`${process.env.PUBLIC_URL}/login`} component={LoginView}/>
        <Route path={`${process.env.PUBLIC_URL}/signup`} component={SignupView}/>
        <Route path={`${process.env.PUBLIC_URL}/start`} component={AppLayout}/>
        
      </Switch>
    </Router>
  );
}

export default App;

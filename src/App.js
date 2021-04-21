import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LoginView from './pages/login';
import SignupView from './pages/signup';
import AppLayout from './layout/appLayout';
import {firebase_app} from './service/configs/firebase.config';


function App() {

  const [user, setUser] = useState(localStorage.getItem('userID'));

  useEffect(() => {
    firebase_app.auth().onAuthStateChanged(setUser);
   }, [])

  return (
    
    <Router basename="/">
      <Switch>
        <Route path={`${process.env.PUBLIC_URL}/login`} component={LoginView}/>
        <Route path={`${process.env.PUBLIC_URL}/signup`} component={SignupView}/>
        
        { user !== null ? 
        <>
          <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => {
            return (<Redirect to={`${process.env.PUBLIC_URL}/start`}/>)
            
          }} />

          <Route path={`${process.env.PUBLIC_URL}/start`} render={() =><AppLayout scene={0}/>}/>
        </>
        : 
        <Redirect to={`${process.env.PUBLIC_URL}/login`} />
        }
      </Switch>
    </Router>
    
  );
}

export default App;

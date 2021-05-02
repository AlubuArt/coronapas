import React, {useContext, useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LoginView from './pages/login';
import SignupView from './pages/signup';
import StartScene from './scenes/startScene';
import DateOfBirthScene from './scenes/dateOfBirthScene';
import UploadPictureScene from './scenes/UploadPictureScene';
import CoronapasScene from './scenes/coronapasScene';
import {firebase_app} from './service/configs/firebase.config';
import {UserContext} from './userContext';


function App() {

  const {userID, setUser} = useContext(UserContext);

  useEffect(() => {
    firebase_app.auth().onAuthStateChanged(function(user) {
      if(user) {
        setUser(user.uid);
      } else {
        setUser('');
      }
    });
   },[setUser]) 

  

  return (
    
    <Router basename="/">
      <Switch>
        <Route path={`${process.env.PUBLIC_URL}/login`} component={LoginView}/>
        <Route path={`${process.env.PUBLIC_URL}/signup`} component={SignupView}/>
        
        { userID !== null ? 

        <>
        
          <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => {
            return (<Redirect to={`${process.env.PUBLIC_URL}/start`} />)
            
          }} />
          <Route path={`${process.env.PUBLIC_URL}/start`} component={StartScene} />
          <Route path={`${process.env.PUBLIC_URL}/dob`} component={DateOfBirthScene} />
          <Route path={`${process.env.PUBLIC_URL}/upload`} component={UploadPictureScene} />
          <Route path={`${process.env.PUBLIC_URL}/coronapas`} component={CoronapasScene} />

        </>
        : 
          

        <Redirect to={`${process.env.PUBLIC_URL}/login`} />
        
        }
      </Switch>
    </Router>
    
  );
}

export default App;

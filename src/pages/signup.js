import React, {useState} from 'react';
import {Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
import {makeNewUser }from '../service/signup.service';
import {firebase_app} from '../service/configs/firebase.config';
import CardTilte from '../components/cardTitle';

const useStyles = makeStyles(({ spacing }) => ({
    
      button : {
          marginTop: 20,
          marginRight: 10,
          marginLeft: 10,

      }, 
      TextField : {
          
      }
  }));

const SignupView = ({history}) => {

    const classes = useStyles();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();


    const newUser = async () => {
        try{
            await makeNewUser(email, pass);
            handleRedirectOnSuccess();
        } catch (error) {
            console.log(error)
        }
    }

    const handleRedirectOnSuccess = async () => {
        try {
            await firebase_app.auth().signInWithEmailAndPassword(email, pass);
            history.push(`${process.env.PUBLIC_URL}/start`)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container className="coronapas-container" fluid="true">
                <Card className="card-container">
                    <CardActionArea>
                        <CardContent>
                            <CardTilte  
                                text="Use the force!"
                            />
                            <TextField
                                className="form-control"
                                type="email"
                                label="Email"
                                onChange={(e) =>setEmail(e.target.value)}
                            />
                            <TextField
                                className="form-control"
                                type="password"
                                label="Password"
                                onChange={(e) =>setPass(e.target.value)}
                            />
                            <div>
                             <Button onClick={() => newUser()} variant="contained" className={cx(classes.button)}>Create new user</Button>   
                            </div>
                        </CardContent>
                    </CardActionArea>  
                </Card>
        </Container>
    )
}

export default withRouter(SignupView);
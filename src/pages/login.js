import React, {useState, useContext} from 'react';
import {login} from '../service/login.service';
import {Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
import CardTitle from '../components/cardTitle';
import {UserContext} from '../userContext';

const useStyles = makeStyles(({ spacing }) => ({
      button : {
          marginTop: 20,
          marginRight: 10,
          marginLeft: 10,
          
      }
  }));


const LoginView = ({ history }) => {

    const classes = useStyles();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const {setUser}  = useContext(UserContext);

    const loginUser = async () => {
        try {
           const userID = await login(email, pass); 
           setUser(userID)
           history.push(`${process.env.PUBLIC_URL}/start`)
        } catch (error) {
            console.log(error);
        }
       
    }

    const signup = () => {
        history.push(`${process.env.PUBLIC_URL}/signup`)
    }

    return (
        <Container className="coronapas-container" fluid="true">
                <Card className="card-container">
                    <CardActionArea>
                        <CardContent>
                            <CardTitle  
                                text="Create your coronapas now"
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
                                <Button onClick={() => loginUser()} variant="contained" className={cx(classes.button)}>Login</Button>   
                                <Button onClick={() => signup()} variant="contained" className={cx(classes.button)}>New user</Button>   
                            </div>
                        </CardContent>
                    </CardActionArea>  
                </Card>
        </Container>
    )
}

export default withRouter(LoginView);
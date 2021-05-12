/* eslint-disable default-case */
import React, {useState, useContext} from 'react';
import {login} from '../service/login.service';
import {Container} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActionArea } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
import CardTitle from '../components/cardTitle';
import {UserContext} from '../userContext';
import {PrimaryButton, SecondaryButton} from '../components/buttons';
import {loginErrorMessage} from '../utils/errorHandling/errorFunction';

const LoginView = ({ history }) => {

    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const {setUser}  = useContext(UserContext);

    const loginUser = async () => {
        try {
           const userID = await login(email, pass); 
           setUser(userID)
           history.push(`${process.env.PUBLIC_URL}/start`)
        } catch (error) {
            loginErrorMessage(error.code);
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
                                <PrimaryButton onClick={() => loginUser()}>Login</PrimaryButton>   
                                <SecondaryButton onClick={() => signup()} >New user</SecondaryButton>   
                            </div>
                                </CardContent>
                    </CardActionArea>  
                </Card>
        </Container>
    )
}

export default withRouter(LoginView);
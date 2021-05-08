import React, {useState, useContext} from 'react';
import {Container} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActionArea } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
import {makeNewUser }from '../service/signup.service';
import {firebase_app} from '../service/configs/firebase.config';
import CardTilte from '../components/cardTitle';
import {UserContext} from '../userContext';
import {PrimaryButton} from '../components/buttons';



const SignupView = ({history}) => {
   
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const {setUser} = useContext(UserContext);

    const newUser = async () => {
        try{
            const id = await makeNewUser(email, pass);
            setUser(id);
            handleRedirectOnSuccess();
        } catch (error) {
            alert(error)
        }
    }

    const handleRedirectOnSuccess = async () => {
        try {
            await firebase_app.auth().signInWithEmailAndPassword(email, pass);
            history.push(`${process.env.PUBLIC_URL}/start`)
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Container className="coronapas-container" fluid>
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
                                <PrimaryButton onClick={() => newUser()} 
                                    variant="contained" 
                                    >
                                        Create new user
                                </PrimaryButton>   
                            </div>
                        </CardContent>
                    </CardActionArea>  
                </Card>
        </Container>
    )
}

export default withRouter(SignupView);
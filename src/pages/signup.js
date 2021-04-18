import React, {useState, useEffect} from 'react';
import {login} from '../service/login.service';
import {loginUser} from '../service/login.service'
import {Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import Card from '@material-ui/core/Card';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';
import {makeNewUser }from '../service/signup.service';
import {firebase_app} from '../service/configs/firebase.config';

const useStyles = makeStyles(({ spacing }) => ({
    card: {
        marginTop: 40,
        borderRadius: spacing(0.5),
        transition: '0.3s',
        width: '95%',
        //overflow: 'initial',
        background: '#ffffff',
      },
      content: {
        paddingTop: 0,
        textAlign: 'left',
        overflowX: 'auto',
        '& table': {
          marginBottom: 0,
        }
      },
      button : {
          marginTop: 20,
          marginRight: 20
      }

  }));

const SignupView = ({history}) => {

    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();


    const newUser = async () => {
        try{
            await makeNewUser(email, pass);
            handleSuccess();
            
        } catch (error) {

        }
       
    }

    const handleSuccess = async () => {
        try {
            await firebase_app.auth().signInWithEmailAndPassword(email, pass);
            history.push(`${process.env.PUBLIC_URL}/start`)
        } catch (error) {
            console.log(error);
        }
    }

    
    return (
        <Container fluid="true">
           
                <Card className={cx(classes.card, cardShadowStyles.root)}>
                    <CardActionArea>
                        <CardContent>
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
import React, {useState} from 'react';
import {login} from '../service/login.service';
import {Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import Card from '@material-ui/core/Card';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';

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


const LoginView = ({ history }) => {

    const classes = useStyles();
    const cardHeaderStyles = useContainedCardHeaderStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();

    const loginUser = async () => {
        try {
           await login(email, pass); 
           history.push(`${process.env.PUBLIC_URL}/start`)
        } catch (error) {
            console.log(error);
        }
       
    }

    const signup = async () => {
        history.push(`${process.env.PUBLIC_URL}/signup`)
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
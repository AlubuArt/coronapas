import React, { useContext, useEffect} from 'react';
import {Container} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActionArea } from '@material-ui/core';
import CardTitle from '../components/cardTitle';
import { withRouter } from 'react-router';
import {UserContext} from '../userContext';
import { checkIfUserHasPass} from '../service/firestore.service';
import {PrimaryButton} from '../components/buttons';




const StartScene = ({history}) => {
    const {userID} = useContext(UserContext);

    const handleClick = () => {
        history.push(`${process.env.PUBLIC_URL}/dob`);
    }

    useEffect( () => {
        
       const userHasCoronaPass = async() =>{
            let result = await checkIfUserHasPass(userID);
            if(result === true) {
                history.push(`${process.env.PUBLIC_URL}/coronapas`);
            } else {}
        }
        userHasCoronaPass()
    
    },[userID, history])
    
    return (
        <Container className="coronapas-container" fluid>
            <Card className="card-container">
                <CardActionArea>
                    <CardContent>
                        <CardTitle  
                            text="Your journey here begins"
                        />
                        <PrimaryButton onClick={() => handleClick()} >Start</PrimaryButton> 
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
    )

}

export default withRouter(StartScene);
import React, {useEffect, useState, useContext} from 'react';
import {getUserDataFromDatabase} from '../service/firestore.service';
import {getHomeWorldFromSwapi} from '../service/swapi.service';
import {Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActionArea } from '@material-ui/core';
import './coronapas.scss';
import QR from '../images/qrcode.png';
import CoronapasHeader from '../components/coronapas/coronapasHeader';
import CoronapasBody from '../components/coronapas/coronapasBody';
import CoronpasStatus from '../components/coronapas/coronapasStatus';
import QrCode from '../components/coronapas/qrCode';
import {UserContext }from '../userContext';
import { withRouter } from 'react-router';
import {logout} from '../service/login.service';
import {SecondaryButton} from '../components/buttons';


const useStyles = makeStyles(() => ({
    
      img : {
        maxWidth: 100,
      }

  }));

const CoronapasScene = ({history}) => {

    const classes = useStyles();
    const {userID} = useContext(UserContext);
    const [homeworldName, setHomeworldName] = useState('');
    const [qr] = useState(QR);
    const [coronapasData, setCoronapasData] = useState('');


    const handleClick = async () => {
        await logout();
        history.push(`${process.env.PUBLIC_URL}/login`)
    }

    useEffect(() => {
        const getCoronapasData = async () => {
            try {
                const data =  await getUserDataFromDatabase(userID);
                for (let [key, val] of Object.entries(data)) {
                    setCoronapasData(prevState => ({
                        ...prevState,
                        [key]: val
                    }))
                }
            } catch {}
        }
        getCoronapasData()      
    },[userID])


    useEffect(() => {
        const getHomeWorld = async () => {
            try {
                const hw = await getHomeWorldFromSwapi(coronapasData);
                setHomeworldName(hw);
            } catch (error) {}
        }
        getHomeWorld()
    
    }, [coronapasData])

    

    return (
        <Container className="coronapas-container" >
            <Card className="coronapas-card">
                <CardActionArea>
                    <CardContent >
                        <CoronapasHeader 
                            name={coronapasData.name}
                            picture={coronapasData.picture}
                            style={classes.img}
                        />
                        <CoronapasBody 
                            data={coronapasData}
                            homeworldName={homeworldName}
                        />
                        <CoronpasStatus 
                            status={coronapasData.coronaStatus}
                        />
                        <QrCode 
                            code={qr}
                        />
                    </CardContent> 
                </CardActionArea>
            </Card> 
            <div>
               <SecondaryButton variant="contained" onClick={() => handleClick()}>Logout</SecondaryButton> 
            </div>
            
        </Container>
       
    )
}

export default withRouter(CoronapasScene);
import React, {useEffect, useState, useReducer, useContext} from 'react';
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


const useStyles = makeStyles(() => ({
    
      img : {
        maxWidth: 100,
      }

  }));

const CoronapasScene = () => {

    const classes = useStyles();
    const {userID} = useContext(UserContext)
    const [homeworldName, setHomeworldName] = useState('');
    const [qr] = useState(QR)
    const [coronapasData, setCoronapasData] = useReducer((value, newValue) => ({...value, ...newValue}), {
            picture: ''
            
        })

    const getCoronapasData = async () => {
        try {
            const data =  await getUserDataFromDatabase(userID);
            for (let [key, val] of Object.entries(data)) {
                setCoronapasData({[key]: val})
            }
        } catch {}
    }


    const getHomeWorld = async () => {
        try {
            const hw = await getHomeWorldFromSwapi(coronapasData);
            setHomeworldName(hw);
        } catch (error) {}
    }

    useEffect(() => {
        getCoronapasData()   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    useEffect(() => {
        getHomeWorld()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coronapasData])

    

    return (
        <Container className="coronapas-container" fluid>
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
        </Container>
       
    )
}

export default withRouter(CoronapasScene);
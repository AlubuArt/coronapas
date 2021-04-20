import React, {useEffect, useState, useReducer} from 'react';
import {getUserDataFromDatabase} from '../service/firestore.service';
import {getHomeWorldFromSwapi} from '../service/swapi.service';
import {Container, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';
import './coronapas.scss';
import QR from '../images/qrcode.png';


const useStyles = makeStyles(({ spacing }) => ({
    
      img : {
        maxWidth: 100,
      }

  }));

const CoronapassScene = ({userID}) => {

    const classes = useStyles();
    const [coronapasData, setCoronapasData] = useReducer((value, newValue) => ({...value, ...newValue}), {
        picture: ''
        
    })
    const [user] = useState(userID);
    const [homeworldName, setHomeworldName] = useState('');
    const [picture, setPicture] = useState()
    const [qr, setQr] = useState(QR)


    const getCoronapasData = async () => {
        try {
            const data =  await getUserDataFromDatabase(user);
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
        
    },[])


    useEffect(() => {
        getHomeWorld()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coronapasData])

    

    return (
        <Container className="coronapas-container">
            <Card className="coronapas-card">
                <CardActionArea>
                    <CardContent >
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                            <div>
                                <img className={classes.img} alt="jhon" src={coronapasData.picture}></img> 
                            </div>
                            </Grid>
                            <Grid className="card-title" item xs={6}>
                                <h1>{coronapasData.name}</h1>
                            </Grid>
                        </Grid>
                        <Grid >
                            <Grid container spacing={2}>
                                <Grid  item xs={4}>
                                  <h4 >Date of Birth</h4>
                                  <p >{coronapasData.dateOfBirth}</p>    
                                </Grid>
                                <Grid item xs={4}>
                                  <h4>Worldhome</h4>
                                  <p>{homeworldName}</p>    
                                </Grid>
                                                             
                            </Grid>
                    
                            <Grid container spacing={2}>
                                <Grid  item xs={4}>
                                    <h4 >Gender</h4>
                                        <p >{coronapasData.gender}</p>  
                                    </Grid>
                                <Grid  item xs={4}>
                                  <h4>Height</h4>
                                  <p>{coronapasData.height}</p>    
                                </Grid>
                                <Grid  item xs={4}>
                                   <h4>Mass</h4>
                                    <p>{coronapasData.mass}</p>  
                                </Grid>
                                
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                  <h4>Skin Color</h4>
                                  <p>{coronapasData.skinColor}</p>    
                                </Grid>
                                <Grid item xs={4}>
                                  <h4 >Eye Color</h4>
                                  <p >{coronapasData.eyeColor}</p>    
                                </Grid>
                                <Grid item xs={4}>
                                   <h4>Hair Color</h4>
                                    <p>{coronapasData.hairColor}</p>  
                                </Grid>
                                
                            </Grid>
                        </Grid>
                        <CardContent>
                           <Grid className="banner"item xs={12}>
                                <div>{coronapasData.coronaStatus}</div>
                            </Grid>
                            <Grid div className="qr-code">
                                <img alt="qr" src={qr} />
                            </Grid> 
                        </CardContent>
                        
                
                    </CardContent>
                </CardActionArea>
            </Card> 
            <Grid className="pdf-button">
               <Button variant="contained">Gem som PDF</Button> 
            </Grid>
            
        </Container>
       
    )
}

export default CoronapassScene;
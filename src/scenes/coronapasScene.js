import React, {useEffect, useState, useReducer} from 'react';
import {getUserDataFromDatabase} from '../service/firestore.service';
import {getHomeWorldFromSwapi} from '../service/swapi.service';
import {Container, Input, Typography, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import Card from '@material-ui/core/Card';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';

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
      },
      img : {

        maxWidth: 100,


      }

  }));

const CoronapassScene = ({value, onChange}) => {

    const classes = useStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const [coronapasData, setCoronapasData] = useReducer((value, newValue) => ({...value, ...newValue}), {
        
    })
    const [user] = useState(localStorage.getItem('userID'));
    const [homeworldName, setHomeworldName] = useState();
    const [picture, setPicture] = useState('');

    

    

    const getCoronapasData = async () => {
        try {
            const data =  await getUserDataFromDatabase(user);
            setPicture(data.picture)
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
        
        const timer = setTimeout(() => {
          getCoronapasData()  
          getHomeWorld()  
          }, 500);/*  */
          return  () => clearTimeout(timer);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <Card className={cx(classes.card, cardShadowStyles.root)}>
                <CardActionArea>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                            <div>
                                <img className={classes.img} alt="jhon" src={picture}></img> 
                            </div>
                            </Grid>
                            <Grid item xs={6}>
                                <h1>{coronapasData.name}</h1>
                            </Grid>

                        </Grid>
                        <Grid >
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                  
                                  <h4>Date of Birth</h4>
                                  <p>{coronapasData.dateOfBirth}</p>    
                                </Grid>
                                <Grid item xs={4}>
                                   <h4>Gender</h4>
                                    <p>{coronapasData.gender}</p>  
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                  
                                  <h4>Height</h4>
                                  <p>{coronapasData.height}</p>    
                                </Grid>
                                <Grid item xs={4}>
                                   <h4>Mass</h4>
                                    <p>{coronapasData.mass}</p>  
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                  
                                  <h4>Eye Color</h4>
                                  <p>{coronapasData.eyeColor}</p>    
                                </Grid>
                                <Grid item xs={5}>
                                   <h4>Hair Color</h4>
                                    <p>{coronapasData.hairColor}</p>  
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                  
                                  <h4>Skin Color</h4>
                                  <p>{coronapasData.skinColor}</p>    
                                </Grid>
                                <Grid item xs={4}>
                                  
                                  <h4>Worldhome</h4>
                                  <p>{homeworldName}</p>    
                                </Grid>
                            </Grid>
                            </Grid>


                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
    )
}

export default CoronapassScene;
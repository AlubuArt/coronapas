import React, {useState, useReducer, useEffect} from 'react';
import {Container, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {sendDataToDatabase} from '../service/firestore.service';
import {getPersonSwapi} from '../service/swapi.service'


const useStyles = makeStyles(() => ({
    
      button : {
          marginTop: 20,
          marginRight: 20
      }

  }));

const randomNumber = () => {
       return Math.floor((Math.random() * 82) + 1);
}

const randomCoronaStatus = () => {
   let n = Math.floor((Math.random() * 5) + 1);
   // eslint-disable-next-line default-case
   switch(n) {
       case 1:
           return "Vaccinated"
       case 2:
           return "Immune to Corona"
        case 3:
            return "Contagious"
        case 4: 
            return "Had Corona already"
        case 5: 
            return "Negative test"
   }
        
}

const DateOfBirthScene = ({onChange, userID}) => {

    const classes = useStyles();;
    const [user] = useState(userID)
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [coronaStatus, setCoronaStatus] = useState('')
    const [starWarsPerson, setStarWarsPerson] = useReducer((value, newValue) => ({...value, ...newValue}), {

    })

    const handleClick = () => {
        
        sendDataToDatabase(user, dateOfBirth, starWarsPerson, coronaStatus); //TODO error handling
        if(dateOfBirth !== null || undefined) {
           onChange(2) 
        } else {
            alert("Please input your date of birth before moving on")
        }
        
    }

    const getDataFromSwapi = async () => {
           const data =  await getPersonSwapi(randomNumber()); 
           for (let [key, val] of Object.entries(data)) {
            setStarWarsPerson({[key]: val})
            }     

    }

    useEffect( () => {
        setCoronaStatus(randomCoronaStatus())
        getDataFromSwapi()

    }, [])


    return (
        <Container fluid="true">
        <Card className="coronapas-card">
            <CardActionArea>
                <CardContent>
                    <Typography variant="h6">Indtast din fødselsdato</Typography>
                    <TextField 
                        className="form-control"
                        type="number"
                        label="ddmmyyyy"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                    <div>
                        <Button onClick={handleClick} variant="contained" className={cx(classes.button)}>Next</Button>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    </Container>
    )
}

export default DateOfBirthScene;
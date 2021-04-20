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
import {getPersonSwapi} from '../service/swapi.service';
import CardTitle from '../components/cardTitle';


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
           return "Has the force"
        case 3:
            return "Contagious"
        case 4: 
            return "Has the force"
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
        <Container className="coronapas-container" fluid="true">
        <Card className="card-container">
            <CardActionArea>
                <CardContent>
                <CardTitle  
                        text="Enter the date of your birth"
                />
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
/* eslint-disable default-case */
import React, { useEffect, useContext} from 'react';
import {Container} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActionArea } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {getPersonSwapi} from '../service/swapi.service';
import CardTitle from '../components/cardTitle';
import { withRouter } from 'react-router';
import { UserContext } from '../userContext';
import {PrimaryButton} from '../components/buttons';


const randomNumber = () => {
       return Math.floor((Math.random() * 82) + 1);
}

let n = Math.floor((Math.random() * 5) + 1);
const randomCoronaStatus = () => {
   switch(n) {
   // eslint-disable-next-line default-case
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

const DateOfBirthScene = ({history}) => {

    const {setDob, dob,  setCoronaStatus, setStarWarsPerson} = useContext(UserContext);
    
    const handleClick = () =>  {
        if(dob !== '' || undefined) {
            history.push(`${process.env.PUBLIC_URL}/upload`);
        } else {
            alert("Please input your date of birth before moving on")
        }
    }

    useEffect( () => {
        setCoronaStatus(randomCoronaStatus())
    },[setCoronaStatus])

    useEffect( () => {
        const getDataFromSwapi = async () => {
            const data =  await getPersonSwapi(randomNumber()); 
            for (let [key, val] of Object.entries(data)) {
            setStarWarsPerson(prevState => ({ 
                    ...prevState, 
                    [key]: val
            })) 
     }}
     getDataFromSwapi()    

    }, [setStarWarsPerson])


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
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                    <div>   
                        <PrimaryButton onClick={() => handleClick()}>Next</PrimaryButton>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    </Container>
    )
}

export default withRouter(DateOfBirthScene);
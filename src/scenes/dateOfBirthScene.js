import React, {useState} from 'react';
import {Container, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import Card from '@material-ui/core/Card';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {setDateOfBirthInDatabase} from '../service/firestore.service';


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


const DateOfBirthScene = ({value, onChange}) => {

    const classes = useStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const [user] = useState(localStorage.getItem('userID'))
    const [dateOfBirth, setDateOfBirth] = useState(null);


    const handleClick = async () => {
        await setDateOfBirthInDatabase(user, dateOfBirth);
        if(dateOfBirth !== null || undefined) {
           onChange(2) 
        } else {
            alert("Please input your date of birth before moving on")
        }
        
    }
    return (
        <Container fluid="true">
        <Card className={cx(classes.card, cardShadowStyles.root)}>
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
import React, {useState} from 'react';
import {login} from '../service/login.service';
import {Container, Typography} from '@material-ui/core'
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


const StartScene = ({value, onChange}) => {

    const classes = useStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });

    const handleClick = () => {
        onChange(1)
    }

    return (
        <Container fluid="true">
            <Card className={cx(classes.card, cardShadowStyles.root)}>
                <CardActionArea>
                    <CardContent>
                        <Typography variant="P">Start</Typography>
                        <Button onClick={() => handleClick()} variant="contained">Start</Button>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
    )

}

export default StartScene;
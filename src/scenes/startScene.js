import React from 'react';
import {Container, Typography} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';
import CardTitle from '../components/cardTitle';


const StartScene = ({onChange}) => {


    const handleClick = () => {
        onChange(1)
    }

    return (
        <Container className="coronapas-container" fluid="true">
            <Card className="card-container">
                <CardActionArea>
                    <CardContent>
                    <CardTitle  
                        text="Your journey here begins"
                    />
                     
                        <Button onClick={() => handleClick()} variant="contained">Start</Button>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
    )

}

export default StartScene;
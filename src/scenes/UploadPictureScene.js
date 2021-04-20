import React, {useState} from 'react';
import {Container, Input, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';
import {uploadPictureToStorage} from '../service/firestore.service';
import CardTitle from '../components/cardTitle';

const useStyles = makeStyles(({ spacing }) => ({
      button : {
          marginTop: 20,
          marginRight: 20
      }
  }));


const UploadPictureScene = ({onChange, userID}) => {

    const classes = useStyles();
    const [user] = useState(userID);


    const handleClick =  () => {
        onChange(3) 
    }

    const getPictureToUpload = async () => {
        const selectedFile = await document.getElementById('picture-upload').files[0];
        uploadPictureToStorage(user, selectedFile);
    }
    return (
        <Container className="coronapas-container" fluid="true">
        <Card className="card-container">
            <CardActionArea>
                <CardContent>
                <CardTitle  
                    text="A picure provide you must"
                />
                <Input id="picture-upload" className="pencil" type="file" onChange={getPictureToUpload} />
                    
                    <div>
                        <Button onClick={handleClick} variant="contained" className={cx(classes.button)}>Next</Button>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    </Container>
    )
}

export default UploadPictureScene;
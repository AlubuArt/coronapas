import React, {useContext} from 'react';
import {Container, Input} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';
import {uploadPictureToStorage, sendDataToDatabase} from '../service/firestore.service';
import CardTitle from '../components/cardTitle';
import { withRouter } from 'react-router';
import { UserContext } from '../userContext'


const useStyles = makeStyles(({ spacing }) => ({
      button : {
          marginTop: 20,
          marginRight: 20
      }
  }));


const UploadPictureScene = ({history}) => {

    const classes = useStyles();
    const { userID,
            pictureURL, 
            starWarsPerson, 
            dob, 
            coronaStatus, 
            setPictureURL
    } = useContext(UserContext)


    const handleClick = async () => {
        await sendDataToDatabase(userID, pictureURL, starWarsPerson, dob, coronaStatus,)
        history.push(`${process.env.PUBLIC_URL}/coronapas`);
    }

    const getPictureToUpload = async () => {
        const selectedFile = await document.getElementById('picture-upload').files[0];
        let url = await uploadPictureToStorage(selectedFile);
        setPictureURL(url);

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
                        <Button onClick={() => handleClick()} variant="contained" className={cx(classes.button)}>Next</Button>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    </Container>
    )
}

export default withRouter(UploadPictureScene);
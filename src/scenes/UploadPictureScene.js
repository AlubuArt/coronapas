import React, {useContext, useState} from 'react';
import {Container, Input} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActionArea } from '@material-ui/core';
import {uploadPictureToStorage, sendDataToDatabase} from '../service/firestore.service';
import CardTitle from '../components/cardTitle';
import { withRouter } from 'react-router';
import { UserContext } from '../userContext';
import {PrimaryButton} from '../components/buttons';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  icon: {
      color: "white",
      height: 50,
      width: "auto"
  }
}));


const UploadPictureScene = ({history}) => {

    const classes = useStyles();
    const [success, setSuccess] = useState(false);
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
        const selectedFile = await document.getElementById('icon-button-file').files[0];
        let url = await uploadPictureToStorage(selectedFile);
        setPictureURL(url);
        setSuccess(true)

    }
    
    return (
        <Container className="coronapas-container" fluid="true">
        <Card className="card-container">
            <CardActionArea>
                <CardContent>
                <CardTitle  
                    text="A picure provide you must"
                />
                <Input accept="image/*" className={classes.input} onChange={getPictureToUpload} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton color="yellow" aria-label="upload picture" component="span" >
                        <PhotoCamera className={classes.icon}/>
                        </IconButton>
                    </label>
                    {success  ? 
                    <div>
                        <PrimaryButton onClick={() => handleClick()}>Next</PrimaryButton>
                    </div>
                    :
                    <>
                    </>
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    </Container>
    )
}

export default withRouter(UploadPictureScene);
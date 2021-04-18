import React, {useState} from 'react';
import {Container, Input, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import Card from '@material-ui/core/Card';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActionArea } from '@material-ui/core';
import {uploadPictureToStorage} from '../service/firestore.service';

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


const UploadPictureScene = ({value, onChange}) => {

    const classes = useStyles();
    const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
    const [user] = useState(localStorage.getItem('userID'));
    const [picture, setPicture] = useState();


    const handleClick = async (e) => {
        e.preventDefault();
        await uploadPictureToStorage(user, picture);
        onChange(3)
    }

    const getPictureToUpload = () => {
        const selectedFile = document.getElementById('picture-upload').files[0];
        setPicture(selectedFile);
    }
    return (
        <Container fluid="true">
        <Card className={cx(classes.card, cardShadowStyles.root)}>
            <CardActionArea>
                <CardContent>
                    <Typography variant="h6">Upload et billede</Typography>
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
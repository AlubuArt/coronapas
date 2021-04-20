/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, {useState, useEffect} from 'react';
import StartScene from "../scenes/startScene";
import DateOfBirthScene from '../scenes/dateOfBirthScene';
import CoronapassScene from '../scenes/coronapasScene';
import UploadPictureScene from '../scenes/UploadPictureScene';
import {checkIfUserHasPass} from '../service/firestore.service';


const AppLayout = (props) => {

    const [scene, setScene] = useState(props.scene);
    const [user] = useState(localStorage.getItem('userID'))

    const renderScene = () => {
        switch(scene) {
            case 0:
                return <StartScene scene={scene} onChange={setScene} />;
            case 1:
                return <DateOfBirthScene scene={scene} userID={user} onChange={setScene} />;
            case 2: 
                return <UploadPictureScene scene={scene} userID={user} onChange={setScene} />;
            case 3: 
                return <CoronapassScene scene={scene} userID={user}  onChange={setScene} />;
            
        }
    }

    const userHasCoronaPass = async () => {
        const result = await checkIfUserHasPass(user)
        if(result === true) {
            setScene(3);
        } else {
            setScene(0);
        }
    }

    useEffect(() => {
        userHasCoronaPass();
        
    }, [])

    return (
        <div className="scene-container">
            {renderScene()}
        </div>
    )
}

export default AppLayout;
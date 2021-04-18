/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, {useState, useEffect} from 'react';
import StartScene from "../scenes/startScene";
import DateOfBirthScene from '../scenes/dateOfBirthScene';
import CoronapassScene from '../scenes/coronapasScene';
import UploadPictureScene from '../scenes/UploadPictureScene';




const AppLayout = (props) => {

    const [scene, setScene] = useState(props.scene);

    const renderScene = () => {
        switch(scene) {
            case 0:
                return <StartScene scene={scene} onChange={setScene} />;
            case 1:
                return <DateOfBirthScene scene={scene} onChange={setScene} />;
            case 2: 
                return <UploadPictureScene picture scene={scene} onChange={setScene} />
            case 3: 
                return <CoronapassScene scene={scene} onChange={setScene} />;
            
        }
    }

    useEffect(() => {
        setScene(props.scene)
    }, [])

    
    return (
        <div className="scene-container">
            {renderScene()}
            
        </div>
    )
}

export default AppLayout;
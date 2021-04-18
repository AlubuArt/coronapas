/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, {useState, useEffect} from 'react';
import {StartScene, DateOfBirthScene, UploadPictureScene, CoronapassScene} from "../scenes";



const AppLayout = (props) => {

    const [scene, setScene] = useState(0);

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
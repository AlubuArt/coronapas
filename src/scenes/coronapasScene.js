import React, {useEffect, useState} from 'react';
import {getUserDataFromDatabase} from '../service/firestore.service';
import {getHomeWorldFromSwapi} from '../service/swapi.service';


const CoronapassScene = ({value, onChange}) => {

    const [coronapasData, setCoronapasData] = useState();
    const [user] = useState(localStorage.getItem('userID'));
    const [homeworldName, setHomeworldName] = useState();

    const handleClick = () => {
        onChange(0)
    }

    const getCoronapasData = async () => {
       const data =  await getUserDataFromDatabase(user);
       setCoronapasData(data);
       
    }

    const getHomeWorld = async () => {
        try {
            const hw = await getHomeWorldFromSwapi(coronapasData);
            setHomeworldName(hw);
        } catch (error) {}
        
    }

    useEffect(() => {
        getCoronapasData()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    useEffect( () => {
        getHomeWorld()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coronapasData])
   
   
    return (
        <div>
            <h1>Coronapas scene</h1>
            <button onClick={handleClick}>skift scene</button>
            
        </div>
    )
}

export default CoronapassScene;
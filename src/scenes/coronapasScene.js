import React from 'react';


const CoronapassScene = ({value, onChange}) => {
    const handleClick = () => {
        onChange(0)
    }

   
    return (
        <div>
            <h1>Coronapas scene</h1>
            <button onClick={handleClick}>skift scene</button>
            
        </div>
    )
}

export default CoronapassScene;
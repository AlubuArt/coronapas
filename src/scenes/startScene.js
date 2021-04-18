import React from 'react';


const StartScene = ({value, onChange}) => {

    const handleClick = () => {
        onChange(1)
    }

    return (
        <div>
            <h1>Start scene</h1>
            <button onClick={handleClick}>skift scene</button>
        </div>
    )

}

export default StartScene;
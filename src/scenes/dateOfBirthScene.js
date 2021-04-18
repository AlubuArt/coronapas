import React from 'react';


const DateOfBirthScene = ({value, onChange}) => {

    const handleClick = () => {
        onChange(2)
    }
    return (
        <div>
            <h1>DOB scene</h1>
            <button onClick={handleClick}>skift scene</button>
        </div>
    )
}

export default DateOfBirthScene;
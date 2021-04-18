import React from 'react';


const UploadPictureScene = ({value, onChange}) => {
    const handleClick = () => {
        onChange(3)
    }
    return (
        <div>
            <h1>Picture scene</h1>
            <button onClick={handleClick}>skift scene</button>
        </div>
    )
}

export default UploadPictureScene;
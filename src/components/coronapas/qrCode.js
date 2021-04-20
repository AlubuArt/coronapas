import React from 'react'
import {Grid} from '@material-ui/core'



const QrCode = (props) => {



    return (
        <Grid div className="qr-code">
            <img alt="qr" src={props.code} />
        </Grid> 
    )
}

export default QrCode;
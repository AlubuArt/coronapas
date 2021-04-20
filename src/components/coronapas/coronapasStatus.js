import React from 'react'
import {Grid} from '@material-ui/core'



const CoronapasStatus = (props) => {



    return (
        <Grid className="banner"item xs={12}>
            <div>{props.status}</div>
        </Grid>
    )
}

export default CoronapasStatus;
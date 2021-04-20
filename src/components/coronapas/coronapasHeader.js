import React from 'react'
import { Grid} from '@material-ui/core'



const CoronapasHeader = (props) => {



    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <div>
                    <img className={props.style} alt="jhon" src={props.picture}></img> 
                </div>
            </Grid>
            <Grid className="card-title" item xs={6}>
                <h1>{props.name}</h1>
            </Grid>
        </Grid>
    )
}

export default CoronapasHeader;
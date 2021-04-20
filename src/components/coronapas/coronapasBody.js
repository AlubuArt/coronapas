import React from 'react'
import { Grid} from '@material-ui/core'



const CoronapasBody = (props) => {



    return (
        <Grid >
            <Grid container spacing={2}>
                <Grid  item xs={4}>
                    <h4 >Date of Birth</h4>
                    <p >{props.data.dateOfBirth}</p>    
                </Grid>
                <Grid item xs={4}>
                    <h4>Worldhome</h4>
                    <p>{props.data.homeworldName}</p>    
                </Grid>
                                                             
            </Grid>
                    
                    <Grid container spacing={2}>
                        <Grid  item xs={4}>
                            <h4 >Gender</h4>
                            <p >{props.data.gender}</p>  
                        </Grid>
                        <Grid  item xs={4}>
                            <h4>Height</h4>
                            <p>{props.data.height}</p>    
                        </Grid>
                        <Grid  item xs={4}>
                            <h4>Mass</h4>
                            <p>{props.data.mass}</p>  
                        </Grid>
                                
                    </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <h4>Skin Color</h4>
                                <p>{props.data.skinColor}</p>    
                            </Grid>
                            <Grid item xs={4}>
                                <h4 >Eye Color</h4>
                                <p >{props.data.eyeColor}</p>    
                            </Grid>
                            <Grid item xs={4}>
                                <h4>Hair Color</h4>
                                <p>{props.data.hairColor}</p>  
                            </Grid>
                        </Grid>
        </Grid>
    )
}

export default CoronapasBody;



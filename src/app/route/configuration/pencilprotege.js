import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    
    avatar: {
      backgroundColor: 'white',
      margin: 5,
      width: 50,
      height: 50,
    },
    
    button: {
      margin: theme.spacing.unit,
    },
    
    card: {
      //maxWidth: 800,
      backgroundColor: 'white[500]'
    },
    
    indentation:{
      width: 80,
    },
    
    item: {
      paddingTop: theme.spacing.unit,
    },
    
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

});

function PencilProtege(props) {
    const { classes } = props;
    
    return (

        <Grid container spacing={16} className={classes.item}>
                    
            <Grid item className={classes.indentation}> </Grid>

            <Grid item xs>
                <div> 
                    <div>
                        <TextField onChange={props.handleChange('displayName')}
                            id="displayName"
                            label="Display Name"
                            placeholder="(e.g.: Andrew John, LEE)"
                            defaultValue={ props.displayName }
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"

                            inputProps={{
                                maxLength: 30,
                            }}
                            helperText="Insert protégé name here. (Maximum characters: 30)"
                            required="true"
                        />
                    </div>

                    <div>
                        <TextField onChange={props.handleChange('pK')}
                            id="pK"
                            label="Username"
                            placeholder="(e.g. : ABCDEFGH)"
                            defaultValue={ props.pK }
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            
                            inputProps={{
                                maxLength: 8,
                            }}
                            helperText="Insert protégé username here. (Maximum characters: 8)"
                            required="true"
                        />
                    </div>                                          
                </div>
            </Grid>

            <Grid item xs>
                <div> 
                    <div>
                        <TextField onChange={props.handleChange('mentorName')}
                            id="mentorName"
                            label="Mentor's Name"
                            placeholder="(e.g. : Andrew John, LEE)"
                            defaultValue={ props.mentorName }
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"

                            inputProps={{
                                maxLength: 30,
                            }}
                            helperText="Insert mentor name here. (Maximum characters: 30)"
                            required="true"
                        />
                    </div>

                    <div>
                        <TextField onChange={props.handleChange('mentorEmail')}
                            id="mentorEmail"
                            label="Mentor's Email"
                            placeholder="(e.g. : andrew_lee@astro.com.my)"
                            defaultValue={ props.mentorEmail }
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
 
                            type='email'
                            inputProps={{
                                maxLength: 30,
                            }}
                            helperText="Insert mentor email here. (Maximum characters: 30)"
                            required="true"
                        />
                    </div>                                            
                </div>
            </Grid>
            
            <Grid item xs>
                <div>
                    <div>
                        <TextField onChange={props.handleChange('joinDate')}
                            id="joinDate"
                            label="Join Date"
                            type="date"
                            defaultValue={ props.datepicker }
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"

                            helperText="Insert protégé join date here."
                            required="true"
                        />
                    </div> 

                    {/* <div>
                        <Typography variant='body1'> For changes of electives: </Typography>
                        <Typography variant='body2'> Kindly visit your 'Schedule' tab from the sidebar! </Typography>
                    </div> */}
                </div>
            </Grid>

            <Grid item className={classes.indentation}> </Grid>
        
        </Grid>
    )
}


PencilProtege.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(PencilProtege);
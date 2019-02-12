import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    indentation:{
        width: 80,
    },
    
    button: {
        margin: theme.spacing.unit,
    },
    
    root: {
        flexGrow: 1,
    },
    
    item: {
        paddingTop: theme.spacing.unit,
    },

    paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        maxWidth: 500,
    },
    
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },

    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },

    typography: {
        padding: theme.spacing.unit * 2,
    },
    
    dense: {
        marginTop: 20,
    },
});


class AddMe extends Component {

    constructor() {
        super(); 
        this.state = { _showMessage: false };
        this.state = { id: '', displayName: 'Protege', username: '', mentor: '', memail: '', 
                       joinDate: "", endDate: "", electives: ["Selecting..."], status: 'active'};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    _showMessage = (bool) => {

        this.setState({ 
            _showMessage: bool 
        });
    
    }

    handleChange = (e) => {
        
        this.setState({
            [e.target.id]: e.target.value
        });

        // console.log([e.target.id])
        // console.log(e.target.value)
        console.log(this.state)
    
    }

    handleSubmit = (e) => {

        e.preventDefault();        
        const newNinja = this.state;
        
        delete newNinja._showMessage;

        this.props.AddAProtege(newNinja);
        this._showMessage(false);
    
    }

    render () {

        const { classes } = this.props;
        
        return (

            <div>

                <Paper> <Card> <Grid>

                    <br/>
                    
                    <Grid container direction="column" alignItems="center" justify="center"> 
                        
                        <Button variant="fab" color="disabled" onClick={this._showMessage.bind(null, true)}>
                            <AddIcon />
                        </Button> <br/>

                    </Grid>
                        
                    <Grid item>

                        { this.state._showMessage && 
                            ( 
                                <div className={classes.root}>

                                    {/* <Paper className={classes.paper}> */}

                                        <form noValidate>
                                        
                                            <Grid container className={classes.item}>
                                            
                                                <Grid item className={classes.indentation}> </Grid>

                                                <Grid item xs align='center'>

                                                    <TextField onChange={this.handleChange}
                                                        required
                                                        id="displayName"
                                                        label="displayName"
                                                        placeholder="(e.g. : Brianna)"
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        margin="normal"
                                                    />

                                                    {/* <br /> */}

                                                    <TextField onChange={this.handleChange}
                                                        required
                                                        id="username"
                                                        label="Username"
                                                        placeholder="(e.g. : ABCDEFGH)"
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        margin="normal"
                                                    />

                                                    <br />

                                                    <TextField onChange={this.handleChange}
                                                        id="joinDate"
                                                        label="Join Date"
                                                        type="date"
                                                        //defaultValue={todaysdate}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        margin="normal"
                                                    />

                                                </Grid>

                                                <Grid item xs align='center'>

                                                    <TextField onChange={this.handleChange}
                                                        id="mentor"
                                                        label="Mentor"
                                                        placeholder="Mentor's Name?"
                                                        multiline
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        margin="normal"
                                                    />
                                                    
                                                    <br />
                                                    
                                                    <TextField onChange={this.handleChange}
                                                        id="memail"
                                                        label="Mentor's Email"
                                                        placeholder="Mentor's Work Email?"
                                                        multiline
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        margin="normal"
                                                    />

                                                </Grid>
                                                
                                                <Grid item xs align='center'>
                                                    <Typography variant='body1'> For selection of electives: </Typography>
                                                    <Typography variant='body2' paragraph> Kindly visit your 'Schedule' tab from the sidebar! </Typography>
                                                </Grid> 

                                                <Grid item className={classes.indentation}> </Grid>

                                            </Grid>

                                            <Grid container className={classes.item}>
                                                
                                                <Grid item xs> </Grid>
                                                <Grid item xs> </Grid>
                                                <Grid item xs> </Grid>
                                                <Grid item xs> 
                                                    <Button className={classes.button} onClick={this.handleSubmit}> Submit </Button>
                                                    <Button className={classes.button} onClick={this._showMessage.bind(null, false)}> Cancel </Button>
                                                </Grid>

                                            </Grid>

                                    
                                        </form>
                                    
                                </div>
                            ) 
                        }
                    
                    </Grid>

                </Grid> </Card> </Paper>

            </div>
        
        )
    }
}


AddMe.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddMe);
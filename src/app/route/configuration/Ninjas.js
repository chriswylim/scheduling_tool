import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// import Building Block
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

// import Button, Icon
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/AcUnit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

// import Popper
import TextField from '@material-ui/core/TextField';

// Import the styles
import styles from './styles101'

class Ninjas extends Component{

    constructor(props) {

        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            anchorEl: null,
            open: false,
        }
        
    }

	handleDeleteclick = (ninja) => {
		
		if (ninja.status === "active") {
			ninja.status = "inactive"
			console.log('ninja ', ninja.id, ' is dirty')
		} else if (ninja.status === "inactive") {
			ninja.status = "active"
			console.log('ninja ', ninja.id, ' is clean')
        }
        
        this.setState({ninja:ninja});

        // console.log(ninja) -- 
        // {id: 1, displayName: "Chris", username: "LWYWEIYE", mentor: "Joel Wong", memail: "joel_wong@astro.com.my", …}
        // displayName: "Chris"
        // electives: (4) ["apple", "bettle", "cards", "dungeon"]
        // endDate: "2020-11-04"
        // id: 1
        // joinDate: "2018-12-04"
        // memail: "joel_wong@astro.com.my"
        // mentor: "Joel Wong"
        // status: "inactive"
        // username: "LWYWEIYE"
	}

    handleChange = (event) => {

        // while loop here --- includes.id == value -> false, then proceed, else prompt error that duplicate was found!
        // while (this.state)
        
        this.setState({
            [event.target.id] : event.target.value
        });


        console.log(event.target.value)
        //console.log(event.target.value); //this.state = (event.target.value); -- found in this.state.displayName, this.state.username, etc.

    }

    handleSubmit = (samurai) => {
        
        // Create a copy of existing ninja!
        //console.log("THIS ROCKS ", samurai);

        // set up mock
        var newNinja = Object.assign({}, samurai);
        //console.log("new mock ninja is ", newNinja)

        // Collect the changes from state!
        //console.log("state is ", this.state)

        var newUpdate = Object.assign({}, this.state);
        //console.log("prior update is ", newUpdate)

        // Remove stateful (useless) state data
        delete newUpdate.anchorEl;
        delete newUpdate.isHidden;
        delete newUpdate.isPencil;
        delete newUpdate.open;

        console.log("new update is ", newUpdate)
        // Patch update bro!
        //console.log(Object.keys(newUpdate)); -- displayName
        //console.log(Object.values(newUpdate)); -- newChris
        console.log(Object.values(newUpdate).toString())
        newNinja[Object.keys(newUpdate)] = Object.values(newUpdate).toString();

        //console.log("New Ninja is ", newNinja)
        //console.log("Old Ninja is ", newUpdate);
        this.props.EditAProtege(newNinja);
        //console.log(this.props.AddAProtege(this.state));

        this.toggleHidden();
        this.togglePencil();
    
    }

    onClick = () => {

        this.toggleHidden();
        this.togglePencil();
    
    }

	toggleHidden() {

		this.setState({
			isHidden: !this.state.isHidden
		})
    
    }

    togglePencil() {

		this.setState({
			isPencil: !this.state.isPencil
		})
    
    }

    render() {
        
        const { ninjas } = this.props;
        const { classes } = this.props;

        const ninjaList = ninjas.map(ninja => {
            
            return (

                <div className="ninja" key={ninja.id}>

                    <div> <Paper> <Card> <Grid container spacing={0}>

                        {/* Title and Status here */}
                        <Grid item xs={6} align='left'>

                            {/* Edit OFF */}
                            { !this.state.isPencil && 
                                <div>
                                    <Typography variant='title' component='h1' align='left'> { ninja.id }. { ninja.displayName } ({ninja.username}) </Typography> 
                                    <Typography variant='body2' align='left' paragraph> { ninja.status } </Typography>
                                </div>
                            }
                            
                            {/* Edit ON */}
                            { this.state.isPencil && 
                                <div>
                                    {/* this.onMod.bind(this, ninja) */}
                                    <TextField onChange={this.handleChange.bind(this)}
                                        id="displayName"
                                        label="Display Name"
                                        placeholder="(e.g. : ABCDEFGH)"
                                        defaultValue={ninja.displayName}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                    />
                                </div>
                            }
                        
                        </Grid>


                        {/* Edit and Delete Button here */}
                        <Grid item xs={6} align='right'>

                            {!this.state.isHidden && 
                                <div> 
                                    <Button variant="fab" color="disabled" className={classes.button} onClick={this.onClick.bind(this, ninja)}> 
                                        <EditIcon fontSize="medium" /> 
                                    </Button>

                                    <Button variant="fab" color="disabled" className={classes.button} onClick={this.handleDeleteclick.bind(this, ninja)}>  
                                        <DeleteIcon fontSize="medium" /> 
                                    </Button>
                                </div>
                            }

                            {this.state.isHidden && 
                                <div> 
                                    <Button variant="fab" color="disabled" className={classes.button} onClick={this.handleSubmit.bind(this, ninja)}> 
                                        <SaveIcon fontSize="medium" /> 
                                    </Button>

                                    {/* onClick={() => this.onClick(ninja)} --> works too */}
                                    <Button variant="fab" color="disabled" className={classes.button} onClick={this.onClick.bind(this, ninja)}>  
                                        <CancelIcon fontSize="medium" /> 
                                    </Button>
                                </div>
                            }
                        
                        </Grid>

                        {/* Username, JoinDate and EndDate here */}
                        <Grid item xs={12} sm={2} align='left'>
                            <Typography variant='title'> Join Date: </Typography>
                            <Typography variant='body2' paragraph> { ninja.joinDate } </Typography>

                            <Typography variant='title'> End Date: </Typography>
                            <Typography variant='body2' paragraph> { ninja.endDate } </Typography>
                        </Grid>


                        {/* Mentor and Mentor's Email here */}
                        <Grid item xs={12} sm={8} align='center'>
                            <Typography variant='title'> Mentor: </Typography>
                            <Typography variant='body2' paragraph> { ninja.mentor } </Typography>

                            <Typography variant='title'> Mentor's Email: </Typography>
                            <Typography variant='body2' paragraph> { ninja.memail } </Typography>
                        </Grid>


                        {/* Preferences Choices here */}
                        <Grid item xs={12} sm={2} align='left'>
                            <Typography variant='title'> Electives: </Typography>
                            <Typography variant='body2'> • { ninja.electives[0] } </Typography>
                            <Typography variant='body2'> • { ninja.electives[1] } </Typography>
                            <Typography variant='body2'> • { ninja.electives[2] } </Typography>
                            <Typography variant='body2'> • { ninja.electives[3] } </Typography>
                        </Grid>

                    </Grid> </Card> </Paper> <br /> </div>

                </div>

            )
                
        })
            
        return(

            <div className="ninja-list"> { ninjaList } </div>
        
        )

    }
}

Ninjas.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ninjas);
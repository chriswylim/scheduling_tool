import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField'

// import Button, Icon
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/BrightnessLow';
import PermaDeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Prawn from './Prawn';


const styles = theme => ({

    actions: {
        display: 'flex',
    },
    
    avatar: {
      backgroundColor: 'black',
      margin: 5,
      width: 50,
      height: 50,
    },
    
    button: {
      margin: theme.spacing.unit,
    },
    
    card: {
      //maxWidth: 800,
      backgroundColor: 'grey'
    },
    
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    
    indentation:{
      width: 80,
    },
    
    item: {
      paddingTop: theme.spacing.unit,
    },
    
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

});

class suspendedProtege extends Component{

    constructor(props) {

        super(props);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handlePermaDelete = this.handlePermaDelete.bind(this);

        this.state = {
            expanded: false,
            isPencil: false,
            deleteDialog: false,
            permadeleteDialog: false,
            userConfirm: false,
        }
        
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

	handleDelete = (samurai) => {

        this.openDeleteDialog();
        
        // set up mock
        var newNinja = Object.assign({}, samurai);

        // console.log('before newNinja is ', newNinja)
        this.props.passhandleDelete(newNinja);

	}
    
    openDeleteDialog = () => {
        
        this.setState({ deleteDialog: true });
    
    };
    
    submitDeleteDialog = (samurai) => {
        
        this.handleDelete(samurai);
        this.closeDeleteDialog();
        // console.log(this.state);
    
    }

    closeDeleteDialog = () => {
        
        this.setState({ deleteDialog: false });
    
    };


    handlePassConfirm = (juice) => {

        console.log(juice)
        console.log('Hello World')
        this.setState({ userConfirm: true });
    
    }

    handlePermaDelete = (samurai) => {

        this.openPermaDeleteDialog();
        
        // set up mock
        var newNinja = Object.assign({}, samurai);

        // console.log('before newNinja is ', newNinja)
        this.props.passhandlePermaDelete(newNinja);

	}

    openPermaDeleteDialog = () => {
        
        this.setState({ permadeleteDialog: true });
    
    };
    
    submitPermaDeleteDialog = (samurai) => {
        

        this.handlePermaDelete(samurai);
        this.closePermaDeleteDialog();
        // console.log(this.state);
    
    }

    closePermaDeleteDialog = () => {
        
        this.setState({ permadeleteDialog: false });
    
    };


    render() {

        const { classes } = this.props;
        const { ninja } = this.props;
            
        return (

            <div>

                {/* Edit OFF */}
                { !this.state.isPencil && 
                    <div>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar = {
                                    <Avatar className={classes.avatar}>
                                        <div> {ninja.displayName[0]} </div>
                                    </Avatar>
                                }
                                action = {
                                    <div> 
                                        <IconButton>
                                            <DeleteIcon className={classes.button} onClick={this.openDeleteDialog.bind(this, ninja)} />
                                            {/* <DeleteIcon className={classes.button} onClick={this.handleDelete.bind(this, ninja)} /> */}
                                        </IconButton>

                                        <IconButton>
                                            <PermaDeleteIcon className={classes.button} onClick={this.openPermaDeleteDialog.bind(this, ninja)} />
                                        </IconButton>
                                    </div>   
                                }
                                title={ 
                                    <div> 
                                        {ninja.id}. {ninja.displayName} ({ninja.username}) 
                                    </div> 
                                }  
                                subheader={ninja.status}
                            />
                            
                            <Divider variant="middle" />

                            {/* <CardMedia
                                className={classes.media}
                                image="/static/images/cards/paella.jpg"
                                title="Paella dish"
                            /> */}
                            
                            <CardContent>
                                
                                <Grid container spacing={16} className={classes.item}>
                                    <Grid item className={classes.indentation}> </Grid>

                                    <Grid item xs>
                                        <Typography variant='body1'> Join Date: </Typography>
                                        <Typography variant='body2' paragraph> {ninja.joinDate} </Typography>

                                        <Typography variant='body1'> End Date: </Typography>
                                        <Typography variant='body2' paragraph> {ninja.endDate} </Typography>
                                    </Grid>
                                    
                                    <Grid item xs>
                                        <div>
                                            <Typography variant='body1'> Mentor's Name: </Typography>
                                            <Typography variant='body2' paragraph> { ninja.mentor } </Typography>

                                            <Typography variant='body1'> Mentor's Email: </Typography>
                                            <Typography variant='body2' paragraph> { ninja.memail } </Typography>
                                        </div>
                                    </Grid>
                                    
                                    <Grid item xs>
                                        <div>
                                            <Typography variant='body1'> Electives: </Typography>
                                            <Typography variant='body2'> • { ninja.electives[0] } </Typography>
                                            <Typography variant='body2'> • { ninja.electives[1] } </Typography>
                                            <Typography variant='body2'> • { ninja.electives[2] } </Typography>
                                            <Typography variant='body2'> • { ninja.electives[3] } </Typography>
                                        </div>
                                    </Grid>

                                    <Grid item className={classes.indentation}> </Grid>
                                </Grid>

                            </CardContent>
                            
                            <CardActions className={classes.actions} disableActionSpacing>
                                
                                <IconButton aria-label="Add to favorites">
                                <FavoriteIcon />
                                    </IconButton>
                                
                                <IconButton aria-label="Share">
                                    <ShareIcon />
                                </IconButton>
                                
                                <IconButton
                                className={classnames(classes.expand, {
                                    [classes.expandOpen]: this.state.expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={this.state.expanded}
                                aria-label="Show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            
                            </CardActions>
                            
                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                    minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                    chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                                    salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                                    minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
                                    to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
                                    cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don’t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                                </CardContent>
                            </Collapse> 
                        </Card>
                    <br /> </div>
                }

                <Dialog
                open={this.state.deleteDialog}
                onClose={this.closeDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                
                    <DialogTitle>
                        Unsuspend Protege?
                    </DialogTitle>
                    
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to unsuspend <b> {ninja.displayName} </b>?
                        </DialogContentText>
                    </DialogContent>
                    
                    <DialogActions>
                        <Button onClick={this.submitDeleteDialog.bind(this, ninja)} color="primary">
                            Confirm
                        </Button>
                        <Button onClick={this.closeDeleteDialog} color="primary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                
                </Dialog>


                <Dialog
                open={this.state.permadeleteDialog}
                onClose={this.closePermaDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                
                    <DialogTitle>
                        Permenantly Delete Protege?
                    </DialogTitle>
                    
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete <b> {ninja.displayName} </b>?
                            <br /> <Prawn ninja={ninja} handlePassConfirm={this.handlePassConfirm} />
                        </DialogContentText>
                    </DialogContent>
                    
                    <DialogActions>

                        <div>

                        {/* Confirm OFF */}
                        { !this.state.userConfirm && 
                            <div>
                                <Button color="secondary" disabled >
                                    Confirm
                                </Button>
                                <Button onClick={this.closePermaDeleteDialog} color="primary" autoFocus>
                                    Cancel
                                </Button>
                            </div>
                        }

                        {/* Confirm ON */}
                        { this.state.userConfirm && 
                            <div> 
                                <Button onClick={this.submitPermaDeleteDialog.bind(this, ninja)} color="primary" autoFocus>
                                    Confirm
                                </Button>
                                <Button onClick={this.closePermaDeleteDialog} color="primary">
                                    Cancel
                                </Button>
                            </div>
                        }

                        </div>
                    
                    </DialogActions>
                
                </Dialog>


            </div>

        )
                
    }

}

function UserGreeting(props) {
    return <b> SUCCESS! Stay Awesome Mr. Admin. <br /> </b>;
}

function GuestGreeting(props) {
    return <b> Please key in protege's username to confirm. <br /> </b>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

suspendedProtege.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(suspendedProtege);
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField'

// import Button, Icon
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/AcUnit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import ReviveIcon from '@material-ui/icons/BrightnessLow';
import PermaDeleteIcon from '@material-ui/icons/Delete';


import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import DeleteAuthorization from './deletedialog'

const styles = theme => ({

    actions: {
        display: 'flex',
    },
    
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

    card1: {
      backgroundColor: 'orange'
    },

    card2: {
      backgroundColor: 'grey'
    },
    
    card3: {
        backgroundColor: 'green'
    },

    dialog: {
        backgroundColor: 'black'
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

class activeProtege extends Component{

    constructor(props) {

        super(props);
        this.state = 
        {
            isPencil: false,
            suspendDialog: false,
            reviveDialog: false,
            permadeleteDialog: false,
            userConfirm: false,
            ninja: this.props.ninja,
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    togglePencil = () => {
        this.setState({ isPencil: !this.state.isPencil }); 
    }

    handleChange = (payload, propertyName) => (event) => {

        const contact = this.state.ninja;
        // let contact = JSON.parse(JSON.stringify(payload));
    
        const newContact = {
          ...contact,
          [propertyName]: event.target.value
        };
        
        this.setState({ ninja: newContact });
        
        event.preventDefault();
    
    }

    handleSubmit = () => {

        this.props.onSubmit(this.state.ninja);
        this.setState({ isPencil: !this.state.isPencil });
    
    }

    handlePassConfirm = (authorization) => {
        
        if (authorization === this.state.ninja.pK) {
            this.setState({ userConfirm: true });
            console.log("Final Delete Check is Complete")
        }

    }

    
    openReviveDialog = () => {
        this.setState({ reviveDialog: true });
    };
    
    submitReviveDialog = (samurai) => {
        this.props.onRevive(samurai);
        this.closeReviveDialog();
    }

    closeReviveDialog = () => {
        this.setState({ reviveDialog: false });
    };    


    openSuspendDialog = () => {
        this.setState({ suspendDialog: true });
    };
  
    submitSuspendDialog = (samurai) => {
        this.props.onSuspend(samurai);
        this.closeSuspendDialog();
    }
  
    closeSuspendDialog = () => {
        this.setState({ suspendDialog: false });
    };


    openPermaDeleteDialog = () => {
        this.setState({ permadeleteDialog: true });
    };
    
    submitPermaDeleteDialog = (samurai) => {
        this.props.onDelete(samurai);
        this.closePermaDeleteDialog();
    }

    closePermaDeleteDialog = () => {
        this.setState({ permadeleteDialog: false });
    };


    render() {

        const { classes } = this.props;
        const { ninja } = this.props;

        // "2019-02-14"
        const jD = ninja.joinDate;

        // 2019, where (typeof numeD === "num")
        const numeD = parseFloat((jD[0]+jD[1]+jD[2]+jD[3]));

        // "2021-02-14"
        const eD = (numeD+2)+"-"+jD[5]+jD[6]+"-"+jD[8]+jD[9];

        // console.log("PROPS.HANDLECHANGE IS ", this.props.handleChange);
        const returninfo = ninja.status;

        return (

            ( returninfo === "active" || returninfo === "onboarding"  ) ? (
                <div>
    
                    {/* Edit OFF */}
                    { !this.state.isPencil &&
                        <div>
                            <Card>
                                <CardHeader className={classes.card3}
                                    avatar = {
                                        <Avatar className={classes.avatar}>
                                            <div> {ninja.displayName[0]} </div>
                                        </Avatar>
                                    }
                                    action = {
                                        <div> 
                                            <IconButton>
                                                <EditIcon className={classes.button} onClick={this.togglePencil.bind(this, ninja)} />
                                                {/* <EditIcon className={classes.button} onClick={this.togglePencil.bind(this, ninja)} /> */}
                                            </IconButton>
    
                                            <IconButton>
                                                <DeleteIcon className={classes.button} onClick={this.openSuspendDialog.bind(this, ninja)} />
                                                {/* <DeleteIcon className={classes.button} onClick={this.handleDelete.bind(this, ninja)} /> */}
                                            </IconButton>
                                        </div>   
                                    }
                                    title={ 
                                        <div> 
                                            {ninja.displayName} ({ninja.pK}) 
                                        </div> 
                                    }  
                                    subheader={ninja.status}
                                />
                                
                                <Divider variant="middle" />
                                
                                <CardContent className={classes.card}>
                                    
                                    <Grid container spacing={16} className={classes.item}>
                                        <Grid item className={classes.indentation}> </Grid>
    
                                        <Grid item xs>
                                            <Typography variant='body2'> Join Date: </Typography>
                                            <Typography variant='body1' paragraph> { ninja.joinDate } </Typography>
    
                                            <Typography variant='body2'> End Date: </Typography>
                                            <Typography variant='body1' paragraph> { eD } </Typography>
                                        </Grid>
                                        
                                        <Grid item xs>
                                            <div>
                                                <Typography variant='body2'> Mentor's Name: </Typography>
                                                <Typography variant='body1' paragraph> { ninja.mentorName } </Typography>
    
                                                <Typography variant='body2'> Mentor's Email: </Typography>
                                                <Typography variant='body1' paragraph> { ninja.mentorEmail } </Typography>
                                            </div>
                                        </Grid>
                                        
                                        <Grid item xs>
                                            <div>
                                                <Typography variant='body2'> Electives: </Typography>
                                                <Typography variant='body1'> • { ninja.electives[0] } </Typography>
                                                <Typography variant='body1'> • { ninja.electives[1] } </Typography>
                                                <Typography variant='body1'> • { ninja.electives[2] } </Typography>
                                                <Typography variant='body1'> • { ninja.electives[3] } </Typography>
                                            </div>
                                        </Grid>
    
                                        <Grid item className={classes.indentation}> </Grid>
                                    </Grid>
    
                                </CardContent>
                                
                            </Card>
                        <br /> 
                        </div>
                    }
    
                    {/* Edit ON */}
                    { this.state.isPencil && 
                        <div>
                            <Card>
                                <CardHeader className={classes.card1}
                                    avatar = {
                                        <Avatar className={classes.avatar}>
                                            <div> {ninja.displayName[0]} </div>
                                        </Avatar>
                                    }
                                    action = {
    
                                        <div> 
                                            <IconButton> 
                                                <SaveIcon className={classes.button} onClick={this.handleSubmit.bind(this, ninja)} /> 
                                            </IconButton>

                                            <IconButton >  
                                                <CancelIcon className={classes.button} onClick={this.togglePencil.bind(this, ninja)} /> 
                                            </IconButton>
                                        </div>
    
                                    }
                                    title={ <div> {ninja.displayName} ({ninja.pK}) </div> }  
                                    subheader={ninja.status}
                                />
                                
                                <Divider variant="middle" />
                                
                                <CardContent>
                                    
                                    <Grid container spacing={16} className={classes.item}>
                                        
                                        <Grid item className={classes.indentation}> </Grid>
    
                                        <Grid item xs>
                                            <div> 
                                                <div>
                                                    <TextField onChange={this.handleChange(ninja, 'displayName')}
                                                        id="displayName"
                                                        label="Display Name"
                                                        placeholder="(e.g. : Andrew John, LEE)"
                                                        defaultValue={ninja.displayName}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        margin="normal"
                                                    />
                                                </div>
    
                                                <div>
                                                    <TextField onChange={this.handleChange(ninja, 'pK')}
                                                        id="pK"
                                                        label="Username"
                                                        placeholder="(e.g. : ABCDEFGH)"
                                                        defaultValue={ninja.pK}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        margin="normal"
                                                    />
                                                </div>                                            
                                            </div>
                                        </Grid>
                                        
                                        <Grid item xs>
                                            <div> 
                                                <div>
                                                    <TextField onChange={this.handleChange(ninja, 'mentorName')}
                                                        id="mentorName"
                                                        label="Mentor's Name"
                                                        placeholder="(e.g. : Andrew John, LEE)"
                                                        defaultValue={ninja.mentorName}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        margin="normal"
                                                    />
                                                </div>
    
                                                <div>
                                                    <TextField onChange={this.handleChange(ninja, 'mentorEmail')}
                                                        id="mentorEmail"
                                                        label="Mentor's Email"
                                                        placeholder="(e.g. : andrew_lee@astro.com.my)"
                                                        defaultValue={ninja.mentorEmail}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        margin="normal"
                                                    />
                                                </div>                                            
                                            </div>
                                        </Grid>
                                        
                                        <Grid item xs> 
                                            <div>
                                                <div>
                                                    <Typography variant='body1'> For changes of electives: </Typography>
                                                    <Typography variant='body2' paragraph> Kindly visit your 'Schedule' tab from the sidebar! </Typography>
                                                </div>   

                                                <div>
                                                    <TextField onChange={this.handleChange(ninja, 'joinDate')}
                                                        id="joinDate"
                                                        label="Join Date"
                                                        type="date"
                                                        defaultValue={ninja.joinDate}
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        margin="normal"
                                                    />
                                                </div>  
                                            </div>
                                        </Grid>
    
                                        <Grid item className={classes.indentation}> </Grid>
                                
                                    </Grid>
    
                                </CardContent>
                                
                            </Card>
                        
                        <br /> </div>
                    }
    
                    <Dialog
                    open={this.state.suspendDialog}
                    onClose={this.closeDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    
                        <DialogTitle className={classes.dialog}>
                            Suspend Protege?
                        </DialogTitle>
                        
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to suspend <b> {ninja.displayName} </b>?
                            </DialogContentText>
                        </DialogContent>
                        
                        <DialogActions>
                            <Button onClick={this.submitSuspendDialog.bind(this, ninja)} color="primary">
                                Confirm
                            </Button>
                            <Button onClick={this.closeSuspendDialog} color="primary" autoFocus>
                                Cancel
                            </Button>
                        </DialogActions>
                    
                    </Dialog>
    
                </div>
            
            ) : (

                <div>
                    <Card>
                        <CardHeader className={classes.card2}
                            avatar = {
                                <Avatar className={classes.avatar}>
                                    <div> {ninja.displayName[0]} </div>
                                </Avatar>
                            }
                            action = {
                                <div> 
                                    <IconButton>
                                        <ReviveIcon className={classes.button} onClick={this.openReviveDialog.bind(this, ninja)} />
                                    </IconButton>

                                    <IconButton>
                                        <PermaDeleteIcon className={classes.button} onClick={this.openPermaDeleteDialog.bind(this, ninja)} />
                                    </IconButton>
                                </div>   
                            }
                            title={ 
                                <div> 
                                    {ninja.displayName} ({ninja.pK}) 
                                </div> 
                            }  
                            subheader={ninja.status}
                        />
                        
                        <Divider variant="middle" />
                        
                        <CardContent className={classes.card}>
                            
                            <Grid container spacing={16} className={classes.item}>
                                <Grid item className={classes.indentation}> </Grid>

                                <Grid item xs>
                                    <Typography variant='body2'> Join Date: </Typography>
                                    <Typography variant='body1' paragraph> { ninja.joinDate } </Typography>

                                    <Typography variant='body2'> End Date: </Typography>
                                    <Typography variant='body1' paragraph> { eD } </Typography>
                                </Grid>
                                
                                <Grid item xs>
                                    <div>
                                        <Typography variant='body2'> Mentor's Name: </Typography>
                                        <Typography variant='body1' paragraph> { ninja.mentorName } </Typography>

                                        <Typography variant='body2'> Mentor's Email: </Typography>
                                        <Typography variant='body1' paragraph> { ninja.mentorEmail } </Typography>
                                    </div>
                                </Grid>
                                
                                <Grid item xs>
                                    <div>
                                        <Typography variant='body2'> Electives: </Typography>
                                        <Typography variant='body1'> • { ninja.electives[0] } </Typography>
                                        <Typography variant='body1'> • { ninja.electives[1] } </Typography>
                                        <Typography variant='body1'> • { ninja.electives[2] } </Typography>
                                        <Typography variant='body1'> • { ninja.electives[3] } </Typography>
                                    </div>
                                </Grid>

                                <Grid item className={classes.indentation}> </Grid>
                            </Grid>

                        </CardContent>
                        
                    </Card> 
                
                    <Dialog
                    open={this.state.reviveDialog}
                    onClose={this.closeReviveDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    
                        <DialogTitle className={classes.dialog}>
                            Unsuspend Protege?
                        </DialogTitle>
                        
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to unsuspend <b> {ninja.displayName} </b>?
                            </DialogContentText>
                        </DialogContent>
                        
                        <DialogActions>
                            <Button onClick={this.submitReviveDialog.bind(this, ninja)} color="primary">
                                Confirm
                            </Button>
                            <Button onClick={this.closeReviveDialog} color="primary" autoFocus>
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
                    
                        <DialogTitle className={classes.dialog}>
                            Permenantly Delete Protege?
                        </DialogTitle>
                        
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete <b> {ninja.displayName} </b>?
                                <br /> <DeleteAuthorization authorization={ninja.pK} handlePassConfirm={this.handlePassConfirm} />
                            </DialogContentText>
                        </DialogContent>
                        
                        <DialogActions>

                            <div>

                            {/* Confirm OFF */}
                            { !this.state.userConfirm && 
                                <div>
                                    <Button className={classes.button} color="secondary" disabled >
                                        Confirm
                                    </Button>
                                    <Button className={classes.button} onClick={this.closePermaDeleteDialog} color="primary" autoFocus>
                                        Cancel
                                    </Button>
                                </div>
                            }

                            {/* Confirm ON */}
                            { this.state.userConfirm && 
                                <div> 
                                    <Button className={classes.button} onClick={this.submitPermaDeleteDialog.bind(this, ninja)} color="primary" autoFocus>
                                        Confirm
                                    </Button>
                                    <Button className={classes.button} onClick={this.closePermaDeleteDialog} color="primary">
                                        Cancel
                                    </Button>
                                </div>
                            }

                            </div>
                        
                        </DialogActions>
                    
                    </Dialog>
                
                <br/> </div>

            )
        )
    }

}


activeProtege.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(activeProtege);
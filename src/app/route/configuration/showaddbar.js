import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'

import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

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

function ShowAddBar(props) {
    const { classes } = props;
    var time1 = new Date().getDate();
    var time2 = new Date().getMonth() + 1;
    var time3 = new Date().getFullYear();
    var datepicker = myFunction(time1,time2,time3)
    
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar = {
                    <Avatar className={classes.avatar}>
                        <div> hi </div>
                    </Avatar>
                }
                action = {

                    <div> 
                        <IconButton> 
                            <SaveIcon className={classes.button} onClick={props.onSubmit} /> 
                        </IconButton>

                        <IconButton>
                            <CancelIcon className={classes.button} onClick={props.onClick} /> 
                        </IconButton>
                    </div>

                }
                title = 'Protege X'
                subheader = 'Subheader'
            />
            
            <Divider variant="middle" />

            <CardContent>
                            
                <Grid container spacing={16} className={classes.item}>
                    
                    <Grid item className={classes.indentation}> </Grid>

                    <Grid item xs>
                        <div> 
                            <div>
                                <TextField onChange={props.handleChange('displayName')}
                                    id="displayName"
                                    label="Display Name"
                                    placeholder="(e.g.: Andrew John, LEE)"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                />
                            </div>

                            <div>
                                <TextField onChange={props.handleChange('pK')}
                                    id="pK"
                                    label="Username"
                                    placeholder="(e.g. : ABCDEFGH)"
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
                                <TextField onChange={props.handleChange('mentorName')}
                                    id="mentorName"
                                    label="Mentor's Name"
                                    placeholder="(e.g. : Andrew John, LEE)"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                />
                            </div>

                            <div>
                                <TextField onChange={props.handleChange('mentorEmail')}
                                    id="mentorEmail"
                                    label="Mentor's Email"
                                    placeholder="(e.g. : andrew_lee@astro.com.my)"
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
                                <TextField onChange={props.handleChange('joinDate')}
                                    id="joinDate"
                                    label="Join Date"
                                    type="date"
                                    defaultValue={datepicker}
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
    )
}

function myFunction(x, y, z) { 
    // Sort in YYYY-MM-DD as required from DatePicker - Material-UI
    // const sortdate = (pickeryear+'-'+pickermonth+'-'+pickerdate)
    
    if (x < 10 && y < 10) {
      // result = "Good day";
      var pickerdate = '0' + x.toString();
      var pickermonth = '0' + y.toString();
      var pickeryear = z.toString();
      return (pickeryear+'-'+pickermonth+'-'+pickerdate)
    } else if (x < 10) {
      // result = "Good afternoon";
      var pickerdate = '0' + x.toString();
      var pickermonth = y.toString();
      var pickeryear = z.toString();
      return (pickeryear+'-'+pickermonth+'-'+pickerdate)
    } else if (y < 10) {
      // result = "Good evening";
      var pickerdate = x.toString();
      var pickermonth = '0' + y.toString();
      var pickeryear = z.toString();
      return (pickeryear+'-'+pickermonth+'-'+pickerdate)
    } else {
      // result = "Good night";
      return (pickeryear+'-'+pickermonth+'-'+pickerdate)
    }
}

ShowAddBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(ShowAddBar);
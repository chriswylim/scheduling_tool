import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'

import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import PencilProtege from './pencilprotege';

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

function ShowAddBar(props) {
    const { classes } = props;
    var time1 = new Date().getDate();
    var time2 = new Date().getMonth() + 1;
    var time3 = new Date().getFullYear();
    var datepicker = myFunction(time1,time2,time3);

    var avatar = props.ninja;
    
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar = {
                    <Avatar className={classes.avatar}>
                        <div> 
                            { (avatar != null) 
                            ? (<div> { avatar[0] } </div>) 
                            : (<div> TAP </div>) } 
                        </div>
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
                title = { avatar }
                subheader = "onboarding"
            />
            
            <Divider variant="middle" />

            <CardContent>
                            
              <PencilProtege datepicker={datepicker} handleChange={props.handleChange} handleSubmit={props.handleSubmit} />

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
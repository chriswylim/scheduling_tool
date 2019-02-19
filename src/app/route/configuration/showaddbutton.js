import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Avatar from '@material-ui/core/Avatar';
// import Divider from '@material-ui/core/Divider'
// import IconButton from '@material-ui/core/IconButton'

import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
// import Paper from '@material-ui/core/Paper';
// import SaveIcon from '@material-ui/icons/Save';
// import CancelIcon from '@material-ui/icons/Cancel';

function ShowAddButton(props) {
    
    return (
        <Card>
            <Grid container>
                <Grid item xs align='center'> <Button variant="fab" color="disabled" onClick={props.onClick}> <AddIcon /> </ Button> </Grid>
            </Grid>
        </Card>
    )
}

export default ShowAddButton;
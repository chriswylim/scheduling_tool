import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {
} from '../../../actions/index';

const styles = {

};


function electiveCard (props) {
	return(
		<div>
			<Card style={{padding: '10px'}}>
				<CardContent style={{textAlign: 'center'}}>
					electiveCard
				</CardContent>
			</Card>
		</div>
	)
}

const mapStateToProps = ({}) => {
    return{}
};

export default connect(mapStateToProps)(withStyles(styles)(electiveCard));
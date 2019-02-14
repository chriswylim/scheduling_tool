import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {
	setUserAuth,
}from '../actions/index';

const styles = {
	bootstrapRoot: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    },
  	bootstrapSelected: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    backgroundColor: '#9f74fc',
    borderColor: '#9f74fc',
	    '&:hover': {
	      backgroundColor: '#9f74fc',
	      borderColor: '#9f74fc',
	    },
	    '&:focus': {
	      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
	    },
  	},
};

class AdminToggle extends Component {
	constructor(props) {
		super(props)
		this.state={
			classes: props.classes,
			accesslevel: props.accesslevel
		}
	}

	handleToggle = (select) => {
		if (select==="Admin"){
			this.props.setUserAuth("admin")
		}else{
			this.props.setUserAuth("regular")
		}
	}

	render() {
		return (
			<div>
				<Button 
					onClick={()=>{this.handleToggle("Admin")}}
			        className={(this.state.accesslevel==="admin") ? this.state.classes.bootstrapSelected : this.state.classes.bootstrapRoot}
			    >Admin</Button>
				<Button 
					onClick={()=>{this.handleToggle("Protege")}}
			        className={(this.state.accesslevel==="regular") ? this.state.classes.bootstrapSelected : this.state.classes.bootstrapRoot}
			   	>Protege</Button>
			   	
			</div>
		)
	}
}

const mapStateToProps = ({auth}) => {
	const {accesslevel} = auth;
    return {accesslevel}
};

export default connect(mapStateToProps, {setUserAuth})(withStyles(styles)(AdminToggle));
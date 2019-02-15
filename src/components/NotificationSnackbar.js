import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import {connect} from 'react-redux';
import {
	setNotificationSnackbar
} from '../actions/index';


class NotificationSnackbar extends Component {
	constructor(props){
		super(props)
		this.state={
			notificationSnackbar:props.notificationSnackbar,
		}
	}

	componentDidMount(){
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.notificationSnackbar!==this.props.notificationSnackbar)
		{
			this.setState({
				...this.state,
				notificationSnackbar: this.props.notificationSnackbar
			})
		}
	}

	handleClose() {
		this.props.setNotificationSnackbar({isOpen:false, message:""})
	}

	render(){
		const action = (
			<Button onClick={()=>{this.handleClose()}}>
				Dismiss
			</Button>
		)

		return(
			<div>
		    	<Snackbar
		    		anchorOrigin={{ vertical:'top', horizontal:'center' }}
		        	open={this.state.notificationSnackbar.isOpen}
		      	>

		      		<SnackbarContent message={this.state.notificationSnackbar.message} action={action}/>
		      		
		      	</Snackbar>
			</div>
		)
	}
}

const mapStateToProps = ({page}) => {
	const {notificationSnackbar} = page;
	return{notificationSnackbar}
};


export default connect(mapStateToProps, {setNotificationSnackbar})((NotificationSnackbar));
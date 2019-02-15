import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import {
	setPopup,
	setDialogActionButton,
} from '../actions/index';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Popup extends Component {
	constructor(props){
		super(props)
		this.state={
			PopupbuttonResponse: false,
			additionalButtonFlag: false,
			PopupIsOpen: false,
			PopupcloseButtonText: "Dismiss"
		}
	}

	componentDidUpdate(prevProps, prevState)
	{
		

		if(this.props.PopupcloseButtonText!==undefined && this.state.PopupcloseButtonText!==this.props.PopupcloseButtonText){
			this.setState({
				...this.state,
				PopupcloseButtonText: this.props.PopupcloseButtonText
			})
		}
	}

	handleClose = () => {
		this.props.setPopup({
			isOpen: false,
			messageText: "Null",
			title: "Null",
			closeButtonText: "Dismiss"
		})
	}

	handleActionButton = () => {
		this.props.setDialogActionButton(true)
	}


	render() {
		const additionalButton = (this.state.additionalButtonFlag) ? 
		<Button onClick={this.handleActionButton}>
			{this.state.PopupbuttonText}
		</Button> : <span>

		</span>

		return (
			<div>
				<Dialog
		          open={this.props.PopupIsOpen}
		          TransitionComponent={Transition}
		          keepMounted
		          onClose={this.handleClose}
		          aria-labelledby="alert-dialog-slide-title"
		          aria-describedby="alert-dialog-slide-description"
		        >
		          <DialogTitle id="alert-dialog-slide-title" disableTypography={true}>
		          	{this.props.PopupTitle}
		          </DialogTitle>
		          <DialogContent>
		            <DialogContentText id="alert-dialog-slide-description">
		              {this.props.PopupmessageText}
		            </DialogContentText>
		          </DialogContent>
		          <DialogActions>
		            <Button onClick={this.handleClose} autoFocus>
		             	{this.state.PopupcloseButtonText}
		            </Button>
		          </DialogActions>
		        </Dialog>
			</div>
		)
	}
}



const mapStateToProps = ({page}) => {
	const {PopupIsOpen,PopupmessageText,PopupbuttonText,PopupTitle,additionalButtonFlag,PopupcloseButtonText} = page;
	return {PopupIsOpen,PopupmessageText,PopupbuttonText,PopupTitle,additionalButtonFlag,PopupcloseButtonText}
};

export default connect(mapStateToProps, {setPopup, setDialogActionButton})(withStyles()(Popup));
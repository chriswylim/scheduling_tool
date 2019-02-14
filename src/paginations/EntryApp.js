import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import App from './App';
import Login from './Login';
import { 
	authToken,
} from '../actions/index';

class EntryApp extends Component{
	componentDidUpdate(){
		this.props.authToken(this.props.sessionToken, this.props.username)
	}

	render(){
		const {match, isLoggedIn, location} = this.props

		const checkLoggedIn = (isLoggedIn) ? (
			<div>
				<Route path={`${match.url}`} component={App}/>	
			</div>
		) : (
			<div>
				<Redirect to={'/login'}/>
				<Route path='/login' component={Login}/>
			</div>
		)
		

		return(
			<React.Fragment>
				{console.log(location)}
				{checkLoggedIn}			
			</React.Fragment>
		)
	}
}

const mapStateToProps = ({auth}) => {
	const {isLoggedIn, username, sessionToken} = auth;
	return {isLoggedIn, username, sessionToken};
};

export default connect(mapStateToProps, {authToken})(EntryApp);
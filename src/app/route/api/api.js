import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {
	getAllSchedule,
	getUserSchedule,
	loginUser,
	getAllUser,
	updateUser,
	createUser,
	logOutUser,
	getAllRotations,
	addRotation,
	updateRotation,
	removeRotation,
	setPopup,
	getUser,
} from '../../../actions/index';

const styles = {

}

const status = [
	{label: "Active"},
	{label: "Pending"},
	{label: "Deactive"}
]

class apiCard extends Component {
	constructor(props){
		super(props)
		this.state={
			responseLabel: '',
			response: '',
			username: 'username',
			password: 'password',
			userid: 'ffsfu',
			displayname: '',
			joindate: '',
			status: 'active',
			rotationID: '12345',
			data: {
		        "pK": "hhkahmad",
		        "sK": "USER",
		        "data": "active#2010-01-01",
		        "displayName": "Ahmad Akmaluddin",
		        "joinDate": "2010-01-01",
		        "electives": [],
		        "status": "active",
		        "mentorName": "Faris",
		        "mentorEmail": "whiteout"
    		},
			rotationData: {
				    "pK": "EA",
				    "sK": "ROTATION",
				    "data": "elective",
				    "name": "External Assignment",
				    "duration": 3,
				    "category": "core",
				    "capacity": 2,
				    "championName": "Michael Fu",
				    "championEmail": "michael_fu@astro.com.my"
				}
		}
	}

	testUpdate(){
		this.setState({
			...this.state,
			test: true
		})
	}

	componentDidMount(){
		this.props.setPopup({
			isOpen: true,
			title: "Test Popup",
			closeButtonText: "Optional",
			messageText: "Test"
		})
	}

	componentWillUnmount(){
		this.props.setPopup({
			isOpen: false,
		})
	}

	componentDidUpdate(prevProps, prevState){
		if (prevProps.allSchedule != this.props.allSchedule)
		{
			this.setState({
				...this.state,
				response: JSON.stringify(this.props.allSchedule)
			})
		} else if (prevProps.userSchedule != this.props.userSchedule) {
			this.setState({
				...this.state,
				response: JSON.stringify(this.props.userSchedule)
			})
		} else if (prevProps.isLoggedIn != this.props.isLoggedIn) {
			this.setState({
				...this.state,
				response: JSON.stringify(this.props.isLoggedIn)
			})
		} else if (prevProps.listUser != this.props.listUser) {
			this.setState({
				...this.state,
				response: JSON.stringify(this.props.listUser)
			})
		} else if (prevProps.rotations != this.props.rotations) {
			this.setState({
				...this.state,
				response: JSON.stringify(this.props.rotations)
			})
		} 
	}

	handleClick(name){
		this.setState({
			...this.state,
			responseLabel: name
		}, ()=>{this.handleApiCall()})
	}

	handleChange=name=>event=>{
		this.setState({
			...this.state,
			[name]: event.target.value
		})
	}

	handleApiCall(){
		switch(this.state.responseLabel){
			case 'schedule.allSchedule':
				return(
					this.props.getAllSchedule()
				)

			case 'schedule.userSchedule':
				return(
					this.props.getUserSchedule(this.state.userid)
				)

			case 'auth.isLoggedIn':
				return(
					this.props.loginUser(this.state.username, this.state.password)
				)
			case 'auth.isLoggedIn?':
				return(
					this.props.logOutUser()
				)

			case 'auth.listUser':
				return(
					this.props.getAllUser()
				)

			case 'auth.updateUser':
				return(
					this.props.updateUser(this.state.userid, this.state.data)
				)

			case 'auth.createUser':
				return(
						this.props.createUser([this.state.data])
					)

			case 'config.rotations':
				return(
						this.props.getAllRotations()
					)

			case 'config.addRotation':
				return(
						this.props.addRotation([this.state.rotationData])
					)

			case 'config.updateRotation':
				return(
						this.props.updateRotation(this.state.rotationID, this.state.rotationData)
					)

			case 'config.removeRotation':
				return(
						this.props.removeRotation(this.state.rotationID)
					)

			case 'auth.getUser':
				return(
						this.props.getUser(this.state.userid)
					)

			default:
				return(
					this.setState({
					...this.state,
					response: 'Undefined'
					})
				)
		}
	}

	render(){
		const test = (this.props.additionalButtonFlag) ?
		<div> {alert("Additional Button!")} </div> : <div/>

	return(
			<div>
				<Card>
					<CardContent style={{textAlign: 'center'}}>
						List of API
					</CardContent>
					{test}
				</Card>
			
				<div style={{paddingTop: '10px'}}>
					<Card>
						<CardContent style={{textAlign: 'center'}}>
							Config
							<br/><br/>
							<div style={{borderStyle: 'solid', padding: '10px'}}>
								<span>Data: <br/>{JSON.stringify(this.state.rotationData)}</span><br/>
								<Button onClick={()=>this.handleClick('config.addRotation')}>
									Add new rotation
								</Button>
							</div>
							<br/><br/>
							<Button onClick={()=>this.handleClick('config.rotations')}>
								List all rotation
							</Button><br/><br/>
							<div style={{borderStyle: 'solid', padding: '10px'}}>
								<span>Data: <br/>{JSON.stringify(this.state.rotationData)}</span><br/>
								<Button onClick={()=>{this.handleClick('config.updateRotation')}}>	
									Update Rotation
								</Button>
							</div>
							<br/><br/>
							<div style={{borderStyle: 'solid', padding: '10px'}}>
								<span>Rotation ID : </span><TextField
						          defaultValue={this.state.rotationID}
						          onChange={this.handleChange('rotationID')}
						        />
								<Button onClick={()=>{this.handleClick('config.removeRotation')}}>	
									Delete Rotation
								</Button>
							</div>
						</CardContent>
					</Card>

				</div>
				<div style={{paddingTop: '10px'}}>
					<Card>
						<CardContent style={{textAlign: 'center'}}>
							<span>Schedule</span>
							<br/><br/>
							
							<Button onClick={()=>this.handleClick('schedule.allSchedule')}>
								Get All Schedule
							</Button>
							<br/><br/>
						</CardContent>
					</Card>
					
				</div>
				<div style={{paddingTop: '10px'}}>
					<Card>
						<CardContent style={{textAlign: 'center'}}>
							Auth
							<br/><br/>
							<Button onClick={()=>this.handleClick('auth.listUser')}>
								Get All Users
							</Button>
							<br/><br/>
							<div style={{borderStyle: 'solid', padding: '10px'}}>
								<span>User ID : </span><TextField
						          defaultValue={this.state.userid}
						          onChange={this.handleChange('userid')}
						        />
								<Button onClick={()=>{this.handleClick('auth.getUser')}}>	
									Get User
								</Button>
							</div>
							<br/><br/>
							<div style={{borderStyle: 'solid', padding: '10px'}}>
								<TextField
						          required
						          id="standard-required"
						          defaultValue={this.state.username}
						          margin="normal"
						          onChange={this.handleChange('username')}
						        />
						        <TextField
						          required
						          id="standard-required"
						          defaultValue={this.state.password}
						          margin="normal"
						          onChange={this.handleChange('password')}
						        />
								<Button onClick={()=>this.handleClick('auth.isLoggedIn')} disabled={this.props.isLoggedIn}>
									Login
								</Button>
							<br/><br/>
								<Button onClick={()=>this.handleClick('auth.isLoggedIn?')} disabled={!this.props.isLoggedIn}>
									Log Out
								</Button>
							</div>
							<br/><br/>
							<div style={{borderStyle: 'solid', padding: '10px'}}>
								<span>User ID : </span><TextField
						          defaultValue={this.state.userid}
						          onChange={this.handleChange('userid')}
						        />
						        <br/>
								<span>data: <br/>{JSON.stringify(this.state.data)}
							  	</span>
								<br/>
								<Button onClick={()=>this.handleClick('auth.updateUser')}>
									Update User
								</Button>
							</div>
							<br/><br/>
							<div style={{borderStyle: 'solid', padding: '10px'}}>
								<span>data: <br/>{JSON.stringify(this.state.data)}</span>
									<br/>
								<Button onClick={()=>this.handleClick('auth.createUser')}>
									Create User
								</Button>
							</div>
							<br/><br/>
						</CardContent>
					</Card>
				</div>

			</div>
		)
	}
}

const mapStateToProps = ({schedule, auth, rotation, page}) => {
	const {allSchedule, userSchedule} = schedule;
	const {isLoggedIn, listUser, userData} = auth;
	const {rotations} = rotation;
	const {additionalButtonFlag} = page;
    return{allSchedule, userSchedule, isLoggedIn, listUser, rotations, additionalButtonFlag, userData};
};

export default connect(mapStateToProps, {getUserSchedule, getAllSchedule, loginUser, getAllUser, updateUser, createUser, logOutUser, getAllRotations, addRotation, updateRotation, removeRotation, setPopup, getUser})(withStyles(styles)(apiCard));
import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import html2canvas from 'html2canvas';
import {
	getAllSchedule,
	getUserSchedule,
	setNotificationSnackbar
} from '../../../actions/index';
import { scheduleVariation } from '../../../themeconfig'

const styles = {
	root: {	
	    flexWrap: 'wrap',
	    justifyContent: 'space-around',
	    overflow: 'hidden',
	},
	gridList: {
	    flexWrap: 'nowrap',
	    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
	    transform: 'translateZ(0)',
  	},
}

class timetableCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			allSchedule: [],
			protegeNum: 0,
			maxLength: 12,
			classes: this.props.classes,
		}
	}

	componentDidMount() {
		this.props.getAllSchedule();
		this.props.setNotificationSnackbar({isOpen: true, message:(<span>Please go to Modules and select your
		elective modules by {this.props.joindate} <br/>Note: You will no longer be able to edit your choices after this date</span>)})
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.allSchedule && prevState.allSchedule !== this.props.allSchedule && this.props.allSchedule.length > 0)
		{
			this.setState({
				...this.state,
				allSchedule: this.props.allSchedule,
				protegeNum: this.props.allSchedule.length
			})
		}
	}

	componentWillUnmount(){
		this.props.setNotificationSnackbar({isOpen: false, message:""})
	}

	render() {

		const renderinfo = (this.state.protegeNum>=1) ? (
			<div>
				{(this.state.allSchedule.map((n, index) => {
					 return(
					 	<div className={this.state.classes.root}>
					 	{
					 		Object.entries(n).map(([key, value])=>{
 						 		return(
 							 		<GridList className={this.state.classes.gridList} cols={1.5} key={key}>
 							 			{
 							 				Object.entries(value).map(([ind, value])=>{
 										 			return(
 										 				<Grid item xs key={ind} style={{paddingTop: '10px', maxWidth: '180px'}}>
 												 			<Card style={scheduleVariation['ongoing']}>
 												 				<CardContent>
 												 					<Typography style={scheduleVariation['ongoing'].primary} noWrap>{key}</Typography>
 												 					<Typography variant='caption' style={scheduleVariation['ongoing']} noWrap>{value.rotationId}</Typography>
 												 					<Typography variant='caption' style={scheduleVariation['ongoing']} noWrap>Start: {value.startDate}</Typography>
 												 					<Typography variant='caption' style={scheduleVariation['ongoing']} noWrap>End: {value.endDate}</Typography>
 												 					<Typography variant='caption' style={scheduleVariation['ongoing']} noWrap>Status: {value.status}</Typography>
 												 				</CardContent>
 											 				</Card>
 											 			</Grid>
 											 		)
 										 	})
 										 }
 							 		</GridList>
 						 		)			 	
 							})}
						</div>
				 	)
				}))}

			</div>
		) : (
		<div>
			<Card>
				<CardContent>
					<Typography>No available schedules available</Typography>
				</CardContent>
			</Card>
		</div>
		)

		return(
			<div style={{padding: '10px'}}>
					<div style={{textAlign: 'right'}}>
						<span style={{paddingRight: '10px'}}>
							<Button style={{backgroundColor: '#71DF96', '&:hover': {backgroundColor: '#04691C'}}}>
								Refresh
							</Button>
						</span>
						<Button>
							Export To PDF
						</Button>
					</div>
				<div style={{paddingTop: '20px'}}>
					{renderinfo}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({schedule, auth}) => {
	const {allSchedule, userSchedule, totalSchedule} = schedule
	const {joindate} = auth
    return{allSchedule, userSchedule, totalSchedule, joindate}
};

export default connect(mapStateToProps, {getAllSchedule, getUserSchedule, setNotificationSnackbar})(withStyles(styles)(timetableCard));

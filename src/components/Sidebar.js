import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import TableChart from '@material-ui/icons/TableChart';
import People from '@material-ui/icons/People';
import {NavLink, withRouter} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Settings from '@material-ui/icons/Settings';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
	toggleSideBar,
	setNavTitle,
} from '../actions/index';

const styles = {
  list: {
    width: 200,
  },
  avatar: {
  	height: '60px',
  	width: '60px',
  	color: 'white',
  	backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  inactive: {
  	textDecoration: 'none'
  },
  listitems: {
  	color: 'black'
  }
};

class Sidebar extends Component {

	constructor(props){
		super(props)
		this.state = {
			classes: props.classes
		}
	}

	toggledrawer = (isOpen) => () => {
		this.setState({
			sidebar: isOpen,
		}, () => {this.props.toggleSideBar(isOpen)})
	} 

	handleClick = (Title) =>() => {
	 	if (Title=='Schedules') {
			this.props.history.push('/schedule')
		}
		else if (Title=='Profile') {
			this.props.history.push('/profile')
		}
		else if (Title=='Proteges') {
			this.props.history.push('/protege')
		}
		else if (Title=='UsrMgmt') {
			this.props.history.push('/configuration')
		}
		else if (Title=='Rotations') {
			this.props.history.push('/rotation')
		}
		else if (Title=='Modules') {
			this.props.history.push('/elective')
		}
		else if (Title=='API') {
			this.props.history.push('/api')
		}
		else if (Title=='Change Password'){
			this.props.history.push('/changepassword')
		}
		else {
			this.props.history.push('/schedule')
		}
	}

	render() {
		const allowedLinks = (
			(this.props.accesslevel==="admin") ? (
				<div>
	    			<ListItem button onClick={this.handleClick("Proteges")}>
	    				<ListItemIcon>
				        	<People />
				        </ListItemIcon>
	    					<ListItemText primary="Proteges"/>
	    			</ListItem>
	    			<ListItem button onClick={this.handleClick("UsrMgmt")}>
	    				<ListItemIcon>
				        	<Settings />
				        </ListItemIcon>
	    					<ListItemText primary="User Management"/>
	    			</ListItem>
	    			<ListItem button onClick={this.handleClick("Rotations")}>
	    				<ListItemIcon>
	    					<SchoolIcon/>
	    				</ListItemIcon>
	    					<ListItemText primary="Rotations Management"/>
	    			</ListItem>
    			</div>
			) : (
				<div>
	    			<ListItem button onClick={this.handleClick("Modules")}>
	    				<ListItemIcon>
	    					<AccountBalanceWalletIcon/>
	    				</ListItemIcon>
	    					<ListItemText primary="Modules"/>
	    			</ListItem>
	    			<ListItem button onClick={this.handleClick("Rotations")}>
	    				<ListItemIcon>
	    					<SchoolIcon/>
	    				</ListItemIcon>
	    					<ListItemText primary="Rotation Details"/>
	    			</ListItem>
    			</div>
			)
		)

		return( 
				<div>
					<Drawer open={this.props.sidebar} onClose={this.toggledrawer(false)}>
				        <div
					        tabIndex={0}
					        role="button"
				        >
				        	<div 
				        		className = {this.state.classes.list}
				        		onClick={this.toggledrawer(false)}
				        		onKeyDown={this.toggledrawer(false)}
				        	>

				        		<br/>
				        		<div>
				        			<div
				        				style={{
				        					paddingLeft: '60px',
				        				}}
				        			>
				        				<IconButton onClick={this.handleClick('Profile')}>
					        				<Avatar className={this.state.classes.avatar}>
					        				{this.props.displayname[0].toUpperCase()}{this.props.displayname[1].toLowerCase()}
					        				</Avatar>
				        				</IconButton>
				        			</div>
						        	<div>
						        		<List>
						        			<ListItem className={this.state.classes.listitems} button onClick={this.handleClick("Schedules")}>
						        				<ListItemIcon>
										        	<TableChart />
										        </ListItemIcon>
						        				<ListItemText primary="Schedule"/>
						        			</ListItem>
						        			{allowedLinks}
						        			<ListItem button onClick={this.handleClick("API")}>
						        				<ListItemText primary="APIs"/>
						        			</ListItem>
						        			<ListItem button onClick={this.handleClick("Change Password")}>
						        				<ListItemText primary="Change Password"/>
						        			</ListItem>
						        		</List>
						        	</div>	
						        </div>
					        </div>
				        </div>
			        </Drawer>
				</div>
		);
	}
}

const mapStateToProps = ({page, auth}) => {
	const {sidebar} = page;
	const {displayname, accesslevel} = auth;
	return {sidebar, displayname, accesslevel}
};

export default withRouter(connect(mapStateToProps, {toggleSideBar, setNavTitle})(withStyles(styles)(Sidebar)));
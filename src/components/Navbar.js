import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {connect} from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import {withRouter} from 'react-router-dom';
import AdminToggle from './ToggleAdmin';
import {getProfileData, getProfileDataSuccess, logOutUser} from '../actions/index';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -10,
    marginRight: 20,
  },
  appBarDefault: {
    background: 'primary',
  },
  appBarOptional: {
    background: 'linear-gradient(45deg, #0519ff 9%, #9f74fc 97%)',
  },
  rightGroup: {
    textAlign: 'right',
  },
  accButton: {
    marginLeft: 0,
    marginRight: -10,
  }
};



class Navbar extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      classes: props.classes,
      anchorEl: null,
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleNavigate = (options) =>()=> {
    if (options=='Profile') {
      this.props.history.push('/profile')
      this.setState({ anchorEl: null })
    }
    else if (options=='Change Password') {
      this.props.history.push('/changepassword')
      this.setState({ anchorEl: null })
    }
    else if (options=='Logout') {
      this.props.logOutUser(this.props.username)
      this.setState({ anchorEl: null })
    }
  }

  handleTest = () => {
    this.props.getProfileData('null')
  }


  render(){

    const title = (this.props.location.pathname == '/elective') ? (<span>Modules</span>) : 
    (this.props.location.pathname == '/schedule') ? (<span>Schedules</span>) : 
    (this.props.location.pathname == '/welcome') ? (<span>Home</span>) :
    (this.props.location.pathname == '/profile') ? (<span>Profile</span>) :
    (this.props.location.pathname == '/configuration') ? (<span>User Management</span>) :
    (this.props.location.pathname == '/protege') ? (<span>Proteges</span>) : 
    (this.props.location.pathname == '/rotation') ? (<span>Rotations</span>) :
    (<span/>)

    return (
      <div className={this.state.classes.root}>
        <AppBar position="fixed" className={(this.props.theme==='default') ? this.state.classes.appBarDefault : this.state.classes.appBarOptional}>
          <Toolbar>
            <IconButton className={this.state.classes.menuButton} color="inherit" aria-label="Menu" onClick={this.props.toggleSideBar}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" className={this.state.classes.grow} noWrap>
            	{title} 
            </Typography>
            <div className={this.state.classes.rightGroup}>
              <Typography variant="headline" color='inherit' className={this.state.classes.grow} style={{padding: '10px'}} noWrap>
                <span style={{paddingRight: '10px'}}>Hello, {this.props.displayname}</span>
                  <IconButton className={this.state.classes.accButton} color='inherit'
                      aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                      aria-haspopup="true"
                      onClick={this.handleClick}
                  >
                    <AccountCircle/>
                  </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      width: 220,
                    },
                  }}
                >
                  <MenuItem onClick={this.handleNavigate("Change Password")}>Change Password</MenuItem>
                  <MenuItem onClick={this.handleNavigate("Logout")}>Logout</MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <AdminToggle/>
                  </MenuItem>
                </Menu>
              </Typography>
              
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({page, auth}) => {
  const {theme, navTitle} = page;
  const {displayname, username} = auth;
  return {displayname, theme, navTitle, username}
};

export default withRouter(connect(mapStateToProps, {getProfileData, getProfileDataSuccess, logOutUser})(withStyles(styles)(Navbar)));
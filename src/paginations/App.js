import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import AppContainer from '../app/index';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Sidebar from '../components/Sidebar';
import Popup from '../components/Popup';
import ResponseSnackbar from '../components/ResponseSnackbar';
import NotificationSnackbar from '../components/NotificationSnackbar';
import {
  toggleSideBar,
  setDisplayName,
} from '../actions/index';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      sidebar: props.sidebar
    }
  }

  componentDidMount(){
  }

  toggleSideBar = () => {
    this.props.toggleSideBar(!this.state.sidebar)
  }

  render() {
    return (
      <div>
        <NotificationSnackbar/>
        <ResponseSnackbar/>
        <Navbar toggleSideBar={this.toggleSideBar}/>
        <Sidebar/>
        <Popup/>
        <div style={{padding: '2%', paddingTop: '80px'}}>
          <AppContainer/> 
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({page}) => {
    const { sidebar } = page;
    return{ sidebar }
};

export default connect(mapStateToProps, {toggleSideBar, setDisplayName})(App);

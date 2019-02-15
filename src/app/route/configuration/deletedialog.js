import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = theme => ({
    
    button: {
        margin: theme.spacing.unit,
    },  
    
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    
    input: {
      margin: theme.spacing.unit,
    },

});


class LoginControl extends React.Component {

    constructor(props) {

        super(props);
        this.state = { isLoggedIn: false };
        this.state = { confirmation: '' };
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);

    }

    handleLoginClick() {
        
        if (this.state.confirmation === this.props.authorization) {
            this.setState({ isLoggedIn: true });
            this.props.handlePassConfirm( this.state.confirmation );
        } else {
            alert('Incorrect Username, Please Try Again.')
        }
        
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    handleChange = (event) => {
        this.setState({ [event.target.id] : event.target.value });
        // console.log(this.state.confirmation)
        // console.log(this.props.authorization)
    }

    render() {

        const isLoggedIn = this.state.isLoggedIn;
        let button;

        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                <Input onChange={this.handleChange.bind(this)}
                id="confirmation"
                placeholder="Protege Username"
                margin="normal"
                />
                { button }
            </div>

        )

    }
}

function UserGreeting(props) {
    return <b> Success! Stay Awesome Mr. Admin. <br /> </b>;
}

function GuestGreeting(props) {
    return <b> Key in protege's username to proceed. <br /> </b>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Sync
        </button>
    );
}

function LogoutButton(props) {
    return (
        <div> </div>
    );
}

// ReactDOM.render(
//     <LoginControl />,
//     document.getElementById('root')
// );

export default withStyles(styles)(LoginControl);
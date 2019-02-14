import React, { Component } from 'react';

import ShowAddButton from './showaddbutton'
import ShowAddBar from './showaddbar'


class AddMe extends Component {

    constructor() {

        var time1 = new Date().getDate();
        var time2 = new Date().getMonth() + 1;
        var time3 = new Date().getFullYear();

        super(); 
        this.state = { _showMessage: false };
        this.state = { "joinDate": myFunction(time1,time2,time3) };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showMessage = () => {
        this.setState({ _showMessage: true });
    }

    hideMessage = () => {
        this.setState({ _showMessage: false });
    }

    handleChange = (propertyName) => (event) => {

        // // create mock Ninja - beginning state
        // const babyNinja = this.state.newProtege;
        // console.log('babyNinja is ', babyNinja);

        this.setState({ [propertyName]: event.target.value });

        // // displayName / username / mentor etc.
        // console.log('propertyName is ', propertyName);
        // console.log('event.target.id is ', event.target.id)
        
        // // what is key-into the textField (answer).        
        // console.log('event target value is ', event.target.value);

        // // create updated Ninja - intermediate state
        // var mockNinja = { ...babyNinja, [event.target.id]: event.target.value };
        // console.log('mockninja is ', mockNinja)

        // this.setState({ newProtege: event.target.value })
        // console.log(this.state)

        // // upload updated Ninja - final state
        // this.setState({ babyNinja: mockNinja });
        // console.log("This state newProtege is ", this.state.babyNinja)

        event.preventDefault();
    
    }

    handleSubmit = (event) => {
        
        const userData = 'active#' + this.state.joinDate;

        const newUser = 
            [{
                "pK": this.state.pK,
                "sK": "USER",
                "data": userData,
                "role": "regular",
                "displayName": this.state.displayName,
                "joinDate": this.state.joinDate,
                "electives": [],
                "status": "active",
                "mentorName": this.state.mentorName,
                "mentorEmail": this.state.mentorEmail
            }]
        
        this.props.AddAProtege(newUser);
        event.preventDefault();
        this.hideMessage();
    
    }

    render () {

        const _showMessage = this.state._showMessage;
        let display;

        if (_showMessage) {
            display = <ShowAddBar onClick={this.hideMessage} onSubmit={this.handleSubmit} handleChange={this.handleChange} />;
        } else {
            display = <ShowAddButton onClick={this.showMessage} props/>
        }

        return (
        
            <div>
                {display}
            </div>

        )
    }
}

function myFunction(x, y, z) { 
    // Sort in YYYY-MM-DD as required from DatePicker - Material-UI
    // const sortdate = (pickeryear+'-'+pickermonth+'-'+pickerdate)
    
    if (x < 10 && y < 10) {
      // result = "Good day";
      var pickerdate = '0' + x.toString();
      var pickermonth = '0' + y.toString();
      var pickeryear = z.toString();
      return (pickeryear+'-'+pickermonth+'-'+pickerdate)
    } else if (x < 10) {
      // result = "Good afternoon";
      var pickerdate = '0' + x.toString();
      var pickermonth = y.toString();
      var pickeryear = z.toString();
      return (pickeryear+'-'+pickermonth+'-'+pickerdate)
    } else if (y < 10) {
      // result = "Good evening";
      var pickerdate = x.toString();
      var pickermonth = '0' + y.toString();
      var pickeryear = z.toString();
      return (pickeryear+'-'+pickermonth+'-'+pickerdate)
    } else {
      // result = "Good night";
      return (pickeryear+'-'+pickermonth+'-'+pickerdate)
    }
}


export default AddMe;
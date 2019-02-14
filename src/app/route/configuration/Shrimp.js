import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Fish from './Fish'
import Crab from './Crab'

import Card from '@material-ui/core/Card'


class UserMan extends React.Component {

  constructor(props) {
    super(props); 
    this.passhandleSubmit = this.passhandleSubmit.bind(this);
    this.passhandleDelete = this.passhandleDelete.bind(this);
    this.passhandlePermaDelete = this.passhandlePermaDelete.bind(this);
  }

  handleChange = (propertyName) => (event) => {

    // const babyninja = this.state.ninja;
    // console.log('babyninja is ', babyninja);

    // displayName / username / mentor etc.
    // console.log('propertyName is ', propertyName);

    // const mockNinja = { ...babyninja, [propertyName]: event.target.value};
    // console.log('mockNinja is ', mockNinja);

    // this.setState({ babyninja: mockNinja });
    // console.log('this state ninja is ', this.state.ninja);
    
    console.log("IT'S WORKING ", propertyName)
    event.preventDefault();

  }

	handleDelete = (samurai) => {
        
    // set up mock
    var newNinja = Object.assign({}, samurai);

    // console.log('before newNinja is ', newNinja)
    this.props.passhandleDelete(newNinja);

  }

  passhandleDelete = (protege) => {
    this.props.DeleteAProtege(protege);
  }

  passhandleSubmit = (protege) => {
    this.props.EditAProtege(protege);
  }

  passhandlePermaDelete = (protege) => {
    this.props.PermaDeleteAProtege(protege);
  }

  handleSubmit = (samurai) => {

    // var newNinja = Object.assign({}, samurai);
    // // console.log("new mock ninja is ", newNinja)

    // var newUpdate = Object.assign({}, samurai);
    // console.log("prior update is ", newUpdate)

    // console.log ('In handleSubmit, newNinja is ', newNinja);
    // console.log ('In handleSubmit, newUpdate is ', newUpdate);
    
    // this.props.passhandleSubmit(newUpdate);
    // this.props.DeleteAProtege(newUpdate);
    console.log("HANDLESUBMIT WORKS!!!");
    // this.togglePencil();

  }


  render() {
    
    console.log("SHRIMP SAYS HI!")
    const { ninjas } = this.props;
    
    ninjas.sort(function (a, b) { return b.joinDate - a.joinDate });
    console.log("Sorted ninjas are ", ninjas)

    // Sort out proteges list: load active Proteges first, then suspended Proteges
    const activeProteges = ninjas.filter(x => x.status === "active" || x.status === "onboarding");
    const suspendedProteges = ninjas.filter(x => x.status === "suspended");
    

    const activeProtegesList = activeProteges.map(ninja => {
      return (
        <Fish ninja={ninja} onChange={this.handleChange} onSubmit={this.handleSubmit} />
      )
    });

    const suspendedProtegesList = suspendedProteges.map(samurai => {
      return (
        <Fish ninja={samurai} onChange={this.handleChange} onSubmit={this.handleSubmit} />
      )
    })

    return(

      <div>
        { activeProtegesList }
        { suspendedProtegesList }
      </div>
    
    )
  }
}


UserMan.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default UserMan;
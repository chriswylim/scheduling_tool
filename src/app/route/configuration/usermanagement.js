import React from 'react';
import PropTypes from 'prop-types';

import DisplayProtege from './displayprotege';
import { select } from 'redux-saga/effects';


class UserMan extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    const { ninjas } = this.props;
    // console.log("SHRIMP SAYS HI!")
    
    ninjas.sort( function(a, b) { return b.joinDate - a.joinDate } );
    // console.log("Sorted ninjas are ", ninjas)

    // Sort out proteges list: load active Proteges first, then suspended Proteges
    const activeProteges = ninjas.filter( x => x.status === "active" || x.status === "onboarding" );
    const suspendedProteges = ninjas.filter( x => x.status === "suspended" );
    

    const activeProtegesList = activeProteges.map(ninja => {
      return (
        <DisplayProtege ninja={ninja} onSubmit={this.props.EditAProtege} onSuspend={this.props.SuspendAProtege} />
      )
    });

    const suspendedProtegesList = suspendedProteges.map(samurai => {
      return (
        <DisplayProtege ninja={samurai} onRevive={this.props.SuspendAProtege} onDelete={this.props.PermaDeleteAProtege} />
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
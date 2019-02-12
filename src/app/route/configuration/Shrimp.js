import React from 'react';
import PropTypes from 'prop-types';
import Fish from './Fish'
import Crab from './Crab'


class UserMan extends React.Component {

  constructor(props) {
    super(props); 
    this.passhandleSubmit = this.passhandleSubmit.bind(this);
    this.passhandleDelete = this.passhandleDelete.bind(this);
    this.passhandlePermaDelete = this.passhandlePermaDelete.bind(this);
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


  render() {
    
    const { ninjas } = this.props;
    const goodninjas = ninjas.filter(x => x.status === 'active' || x.status === 'onboarding');
    const badninjas = ninjas.filter(x => x.status === 'inactive');
    
    // show 'good' proteges
    const goodninjaList = goodninjas.map(ninja => {
      return (
        <Fish ninja={ninja} passhandleSubmit={this.passhandleSubmit} passhandleDelete={this.passhandleDelete}/>
      );
    })

    // show 'bad' proteges
    const badninjaList = badninjas.map(samurai => {
      return (
        <Crab ninja={samurai} passhandleSubmit={this.passhandleSubmit} passhandleDelete={this.passhandleDelete} passhandlePermaDelete={this.passhandlePermaDelete} />
      )
    })

    return(

      <div>
        <div> { goodninjaList } </div>
        <div> { badninjaList } </div>
      </div>
    
    )
  }
}

UserMan.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default UserMan;
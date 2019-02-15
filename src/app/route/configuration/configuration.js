import React, {Component} from 'react';
import {connect} from 'react-redux';
import { } from '../../../actions/index';

// Bring in API
import {
	getAllUser,
	createUser,
	updateUser
} from '../../../actions/index';

// Bring in imports
import AddProtegeCard from './addprotegecard';
import UserManagement from './usermanagement';


class configurationCard extends Component {

	constructor(props) {
		super(props); 
		this.state = 
		{ 
			listUser: {},
		}
	}

	componentDidMount() {
		this.props.getAllUser();
		// Returned data - this.props.listUser
		// this.setState({ listUser: this.props.listUser })
	}

	componentDidUpdate(prevProps) {
		if (prevProps.listUser !== this.props.listUser)
		{
			this.setState({
				...this.state,
				listUser: this.props.listUser.rotations,
				listUserlength: this.props.listUser.rotations.length,
			})
		}
	}


	AddAProtege = (ninja) => {
		console.log("NEW NINJA FORMAT IS ", ninja);
		this.props.createUser(ninja);
	}

	EditAProtege = (ninja) => {

		console.log("EDIT A PROTEGE IS PINGED!!!")
		const selectedNinja = this.state.listUser.find( fruit => fruit.pK === ninja.pK );
		// console.log("selected protege is ", selectedNinja)
		// console.log("passed protege is ", ninja)

		if ( Object.is(selectedNinja.pK, ninja.pK) ) {
			this.props.updateUser(ninja.pK, ninja);
		} else {
			alert("ERROR: The data loaded now is not the latest data.")
		}

		// ****************************** Non-API Functionality Test ****************************** //
		// const oldNinja = this.state.listUser.find( fruit => fruit.pK === ninja.pK );
		// console.log("old nin is ", oldNinja)

		// // -1 for count starting from 0
		// var count = (ninja.id) - 1;

		// // remainder ninja list
		// const ninjaList = this.state.ninjas;
		// // console.log("remainder nin is ", ninjaList);	
		
		// // perform splice cut
		// const cList = ninjaList.splice(count, 1);
		// // console.log("CList is ", cList)

		// let oldninjaList = [...this.state.ninjas, ninja];
		// // console.log("old list is ", oldninjaList)
		
		// const ninjas = oldninjaList.sort(function(a,b){return a.id - b.id});
		// // console.log("new list is ", ninjas)

		// this.setState({ninjas: ninjas})
		// ****************************** Non-API Functionality Test ****************************** //

	}

	SuspendAProtege = (ninja) => {
		
		console.log("SUSPEND A PROTEGE IS PINGED!!!");
		const mockNinja = ninja;

		if (mockNinja.status === "active") {
			mockNinja.status = "suspended"
		} else if (mockNinja.status === "suspended") {
			mockNinja.status = "active"
		};
		
		console.log("data is ", mockNinja);
		console.log("userid is ", mockNinja.pK);
		
		this.props.updateUser(mockNinja.pK, mockNinja);

		// ****************************** Non-API Functionality Test ****************************** //
		// if (ninja.status === "active") {
		// 	ninja.status = "inactive"
		// } else if (ninja.status === "inactive") {
		// 	ninja.status = "active"
        // }
		// let oldninjaList = [...this.state.ninjas, ninja];
		// // console.log("In configuration.DeleteAProtege, oldninjalist is ", oldninjaList)

		// // -1 for the stupid count starting from 0
		// var count = (ninja.id) - 1;

		// // remainder ninja list
		// // const ninjaList = this.state.ninjas;
		// // console.log("remainder nin is ", ninjaList);
		
		// // perform splice cut
		// const cList = oldninjaList.splice(count, 1);
		// // console.log("In configuration.DeleteAProtege, cList (spliced entity) is ", cList)
		// // console.log("In configuration.DeleteAProtege, after splice newninjalist is ", oldninjaList)

		// const ninjas = oldninjaList.sort(function(a,b){return a.id - b.id});
		// // console.log("new list is ", ninjas)
		// ****************************** Non-API Functionality Test ****************************** //

	}

	PermaDeleteAProtege = (ninja) => {

		console.log("DELETE A PROTEGE IS PINGED!!!");
		const deletedNinja = ninja;

		if (deletedNinja.status === "suspended") {
			deletedNinja.status = "deleted"
		} else {
			alert("Protege's status is not suspended. Unable to delete.")
		};
		
		this.props.updateUser(deletedNinja.pK, deletedNinja);

		// ****************************** Non-API Functionality Test ****************************** //
		// const oldNinja = this.state.ninjas.find( fruit => fruit.username === ninja.username );
		// // console.log("Old nin is ", oldNinja)

		// // -1 for the stupid count starting from 0
		// var count = (ninja.id) - 1;

		// // remainder ninja list
		// const ninjaList = this.state.ninjas;
		// // console.log("Remainder nin is ", ninjaList);

		// // perform splice cut
		// const cList = ninjaList.splice(count, 1);
		// // console.log("Removed protege is ", cList)

    	// this.setState({ninjas: ninjaList})
		// ****************************** Non-API Functionality Test ****************************** //

	}

	render() {

		return (

			<div className="App">
				
				{ this.state.listUser.length > 0 
					? ( <div> <UserManagement ninjas={this.state.listUser} EditAProtege={this.EditAProtege} SuspendAProtege={this.SuspendAProtege} PermaDeleteAProtege={this.PermaDeleteAProtege} /> </div> ) 
					: ( <div align='Center'> <b> Loading ... </b> </div> )
				}

				<div> <AddProtegeCard AddAProtege={this.AddAProtege} /> </div>
			
			</div>

		)

	}

}

const mapStateToProps = ({ auth }) => {
	const { listUser } = auth;
    return { listUser }
};

export default connect(mapStateToProps, {getAllUser, createUser, updateUser})(configurationCard);
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
		if (prevProps.listUser != this.props.listUser)
		{
			this.setState({
				...this.state,
				listUser: this.props.listUser.rotations,
				listUserlength: this.props.listUser.rotations.length,
				// protegeNum: this.props.listUser.length
			})
		}
	}


	AddAProtege = (ninja) => {
		this.props.createUser(ninja);
		alert("Please refresh page...")
	}

	EditAProtege = (ninja) => {

		const oldNinja = this.state.ninjas.find( fruit => fruit.username === ninja.username );
		// console.log("old nin is ", oldNinja)

		// -1 for the stupid count starting from 0
		var count = (ninja.id) - 1;

		// remainder ninja list
		const ninjaList = this.state.ninjas;
		// console.log("remainder nin is ", ninjaList);	
		
		// perform splice cut
		const cList = ninjaList.splice(count, 1);
		// console.log("CList is ", cList)

		let oldninjaList = [...this.state.ninjas, ninja];
		// console.log("old list is ", oldninjaList)
		
		const ninjas = oldninjaList.sort(function(a,b){return a.id - b.id});
		// console.log("new list is ", ninjas)

		this.setState({ninjas: ninjas})

	}

	DeleteAProtege = (ninja) => {
		
		// ****************************** Non-API Functionality Test ****************************** //
		// if (ninja.status === "active") {
		// 	ninja.status = "inactive"
		// 	console.log('ninja ', ninja.id, ' is dirty')
		// } else if (ninja.status === "inactive") {
		// 	ninja.status = "active"
		// 	console.log('ninja ', ninja.id, ' is clean')
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
		
		const oldNinja = this.state.ninjas.find( fruit => fruit.username === ninja.username );
		// console.log("Old nin is ", oldNinja)

		// -1 for the stupid count starting from 0
		var count = (ninja.id) - 1;

		// remainder ninja list
		const ninjaList = this.state.ninjas;
		// console.log("Remainder nin is ", ninjaList);

		// perform splice cut
		const cList = ninjaList.splice(count, 1);
		// console.log("Removed protege is ", cList)

    	this.setState({ninjas: ninjaList})
	
	}

	render() {

		console.log(this.state.listUser);

		return (

			<div className="App">
				
				{ this.state.listUser.length > 0 
					? ( <div> <UserManagement ninjas={this.state.listUser} EditAProtege={this.EditAProtege} DeleteAProtege={this.DeleteAProtege} PermaDeleteAProtege={this.PermaDeleteAProtege} /> </div> ) 
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

export default connect(mapStateToProps, {getAllUser, createUser})(configurationCard);
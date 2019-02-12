import React, {Component} from 'react';
import {connect} from 'react-redux';
import { } from '../../../actions/index';
// import { withStyles } from '@material-ui/core';

// Bring in imports
import AddMe from './AddMe';
import UserMan from './Shrimp';


class configurationCard extends Component {

	constructor(props) {
	super(props); 
	this.state = { ninjas : [
		{ id: 1, displayName:'Chris', username:'LWYWEIYE', mentor:'Joel Wong', memail:'joel_wong@astro.com.my',
					joinDate: "2018-12-04", endDate: "2020-11-04", electives: ["apple", "bettle", "cards", "dungeon"], status: 'active' },
		{ id: 2, displayName:'Brianna', username:'CPSCPSBB', mentor:'Peter Kok', memail:'peter_kok@astro.com.my',
			joinDate: "2018-12-04", endDate: "2020-11-04", electives: ["apple", "bettle", "cards", "dungeon"], status: 'active' },
		{ id: 3, displayName:'Thava', username:'THAVAKMR', mentor:'Jamie Lee', memail:'jamie_lee@astro.com.my',
					joinDate: "2018-12-04", endDate: "2020-11-04", electives: ["apple", "bettle", "cards", "dungeon"], status: 'inactive' },
	]}
	}

	AddAProtege = (ninja) => {

		// console.log('In configuration, ninja is ', ninja);
		// console.log('In configuration, state.ninjas is ', this.state.ninjas);

		let ninjas = [...this.state.ninjas, ninja];
		
		// last ID on protege array
		ninja.id = (this.state.ninjas.slice(-1)[0].id) + 1;
		
		// console.log(this.state.ninjas.length)
		// ninja.id = (this.state.ninjas.length) + 1;

		this.setState({ninjas: ninjas})
		// console.log('In configuration, state.ninjas is ', ninjas);
		// console.log('In configuration, this.state.ninjas is ', this.state.ninjas)

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
		
		// const oldNinja = this.state.ninjas.find( fruit => fruit.username === ninja.username );
		// console.log("In configuration, old nin is ", oldNinja)

		if (ninja.status === "active") {
			ninja.status = "inactive"
			console.log('ninja ', ninja.id, ' is dirty')
		} else if (ninja.status === "inactive") {
			ninja.status = "active"
			console.log('ninja ', ninja.id, ' is clean')
        }
		
		// console.log("In configuration, ninja is ", ninja)

		let oldninjaList = [...this.state.ninjas, ninja];
		// console.log("In configuration.DeleteAProtege, oldninjalist is ", oldninjaList)

		// -1 for the stupid count starting from 0
		var count = (ninja.id) - 1;

		// remainder ninja list
		// const ninjaList = this.state.ninjas;
		// console.log("remainder nin is ", ninjaList);
		
		// perform splice cut
		const cList = oldninjaList.splice(count, 1);
		// console.log("In configuration.DeleteAProtege, cList (spliced entity) is ", cList)
		// console.log("In configuration.DeleteAProtege, after splice newninjalist is ", oldninjaList)

		const ninjas = oldninjaList.sort(function(a,b){return a.id - b.id});
		// console.log("new list is ", ninjas)

        this.setState({
			ninjas:ninjas
		})

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

		return (

			<div className="App">
				<div> <UserMan ninjas={this.state.ninjas} EditAProtege={this.EditAProtege} DeleteAProtege={this.DeleteAProtege} PermaDeleteAProtege={this.PermaDeleteAProtege} /> </div>
				<div> <AddMe AddAProtege={this.AddAProtege} /> </div>
			</div>

		);
	}

}

const mapStateToProps = ({}) => {
    return{}
};

export default connect(mapStateToProps)(configurationCard);

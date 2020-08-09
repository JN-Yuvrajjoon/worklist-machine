import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';

export default class CreateUser extends Component {
	constructor(props) {
		super(props); //need this call first!

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		//TODO: Is there a better way to do this?
		
		this.state = { //in react you always use state and not let/var/const, so the page updates
			username: "",
			description: "",
			duration: 0,
			date: new Date(),
			users: []
		}
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value //target is the text box
		});
	}

	onSubmit(e) {
		e.preventDefault(); //prevents HTML default submit

		// Creating a variable is fine if it's only used within the method
		const user = {
			username: this.state.username,
		}
		console.log(user)

		this.setState({
			username: '' //blank out the field so user can add another username
		})
	}

	render() {
		return(	
			<div>
				<h3>Create New User</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group"> 
						<label>Username: </label>
						<input	type="text"
							required
							className="form-control"
							value={this.state.username}
							onChange={this.onChangeUsername}
							/>
					</div>
					<div className="form-group">
						<input type="submit" value="Create User" className="btn btn-primary" />
					</div>
				</form>
			</div>
		)
	}
}
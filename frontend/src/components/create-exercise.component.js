import React, { Component } from 'react';
import DatePicker from 'react-datepicker'; //TODO: npm uninstall react-datepicker --save
//import { Link } from 'react-router-dom';
//import axios from 'axios';

export default class CreateExercise extends Component {
	constructor(props) {
		super(props); //need this call first!

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
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

	componentDidMount() { //lifecycle method in React, will be called before anything loads
		this.setState({
			users: ['test user'],
			username: 'test user'
		});
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value //target is the text box
		});
	}

	onChangeDescription(e) {
		this.setState({
			description: e.target.value 
		});
	}

	onChangeDuration(e) {
		this.setState({
			duration: e.target.value 
		});
	}

	onChangeDate(date) {
		this.setState({
			date: date //special, so user can pick date from a calendar
		});
	}

	onSubmit(e) {
		e.preventDefault(); //prevents HTML default submit

		// Creating a variable is fine if it's only used within the method
		const exercise = {
			username: this.state.username,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.date
		}
		console.log(exercise)
		window.location = "/"; //go back to homepage
	}

	render() {
		return (
			<div>
				<h3>Create New Exercise Log</h3>
				<form onSubmit={this.onSubmit}> 
					<div className="form-group">
						<label>Username: </label>
						<select ref="userInput"
						className="form-control"
						value={this.state.username}
						onChange={this.onChangeUsername}>
							{ //curly braces means there's JS inside
								this.state.users.map(function(user) {
									return <option
									key={user}
									value={user}>{user}
									</option>;
								})
							}
						</select>
					</div>
					<div className="form-group"> 
						<label>Description: </label>
						<input	type="text"
								required
								className="form-control"
								value={this.state.description}
								onChange={this.onChangeDescription}
								/>
					</div>
					<div className="form-group">
						<label>Duration (in minutes): </label>
						<input 
								type="text" 
								className="form-control"
								value={this.state.duration}
								onChange={this.onChangeDuration}
								/>
					</div>
					<div className="form-group">
						<label>Date: </label>
						<div>
							<DatePicker
								selected={this.state.date}
								onChange={this.onChangeDate}
							/>
						</div>
					</div>
					<div className="form-group">
						<input type="submit" value="Create Exercise Log" className="btn btn-primary" />
					</div>

				</form>
			</div>
		)
	}
}
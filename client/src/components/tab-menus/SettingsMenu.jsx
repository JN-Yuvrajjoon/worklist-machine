import React, {Component} from "react";

export default class SettingsMenu extends Component{
	constructor(props) {
		super(props);

		this.onChangeSchool = this.onChangeSchool.bind(this);
		this.onChangeCampus = this.onChangeCampus.bind(this);
		this.onChangeSession = this.onChangeSession.bind(this);
		this.onChangeReduceGaps = this.onChangeReduceGaps.bind(this);
		this.onChangePreferredTime = this.onChangePreferredTime.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		this.state = { //in react you always use state and not let/var/const, so the page updates
			school: "",
			campus: "",
			session: "",
			reduceGaps: false,
			preferredTime: "Any time",
			
			schools: [],
			campuses: [],
			sessions: []

		};
	}

	onChangeSchool(e) {
		this.setState({
			school: e.target.value 
		});
	}

	onChangeCampus(e) {
		this.setState({
			campus: e.target.value 
		});
	}

	onChangeSession(e) {
		this.setState({
			session: e.target.value 
		});
	}

	onChangeReduceGaps(e) {
		this.setState({
			reduceGaps: e.target.value 
		});
	}

	onChangePreferredTime(e) {
		this.setState({
			preferredTime: e.target.value 
		});
	}

	onSubmit(e) {
		e.preventDefault();
		console.log("form submitted lol");
		console.log(this);
	}

	render() {
		return(
			<form onSubmit={this.onSubmit}>
				<div className="form-group">
					<label>School:</label>
					<select ref="userInput"
						className="form-control"
						value={this.state.school}
						onChange={this.onChangeSchool}>
							<option>University of British Columbia</option>
							<option>fake school</option>
					</select>
				</div>
				<div className="form-group">
					<label>Campus:</label>
					<select ref="userInput"
						className="form-control"
						value={this.state.campus}
						onChange={this.onChangeCampus}>
							<option>Vancouver</option>
							<option>Okanagan</option>
					</select>
				</div>
				<div className="form-group">
					<label>Session:</label>
					<select ref="userInput"
						className="form-control"
						value={this.state.session}
						onChange={this.onChangeSession}>
							<option>2020S</option>
							<option>2020W</option>
					</select>
				</div>
				<div className="form-group">
					<label>Session:</label>
					<select ref="userInput"
						className="form-control"
						value={this.state.session}
						onChange={this.onChangeSession}>
							<option>2020S</option>
							<option>2020W</option>
					</select>
				</div>
				<div className="form-group">
					<label>Session:</label>
					<select ref="userInput"
						className="form-control"
						value={this.state.session}
						onChange={this.onChangeSession}>
							<option>2020S</option>
							<option>2020W</option>
					</select>
				</div>
				<div className="form-group">
					<label>Session:</label>
					<select ref="userInput"
						className="form-control"
						value={this.state.session}
						onChange={this.onChangeSession}>
							<option>2020S</option>
							<option>2020W</option>
					</select>
				</div>
				<div className="form-group">
					<label>Session:</label>
					<select ref="userInput"
						className="form-control"
						value={this.state.session}
						onChange={this.onChangeSession}>
							<option>2020S</option>
							<option>2020W</option>
					</select>
				</div>
			</form>


		);
	}
}
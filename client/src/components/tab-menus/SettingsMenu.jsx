import React, {Component} from "react";
//import "bootstrap/dist/css/bootstrap.min.css"
//import '../../App.css';

// May need refactoring
export default class SettingsMenu extends Component{
	constructor(props) {
		super(props);

		this.handleChangeSchool = this.handleChangeSchool.bind(this);
		this.handleChangeCampus = this.handleChangeCampus.bind(this);
		this.handleChangeSession = this.handleChangeSession.bind(this);
		this.handleChangePreferredTime = this.handleChangePreferredTime.bind(this);
		this.handleChangeReduceGaps = this.handleChangeReduceGaps.bind(this);
		this.passToParent = this.passToParent.bind(this);
		
		this.state = this.props.settings;
	}

	passToParent() {
		console.log("SettingsMenu detected a change, passing state to parent. Here's the new state: ", this.state);
		this.props.changeFunction(this.state);
	}	

	handleChangeSchool(event) {
		this.setState({
			school: event.target.value,
			campus: null,
			session: null
			}, 
			this.passToParent()
		);
	}

	handleChangeCampus(event) {
		this.setState({
			campus: event.target.value
			}, 
			this.passToParent()
		);
	}

	handleChangeSession(event) {
		this.setState({
			session: event.target.value 
			}, 
			this.passToParent()
		);
	}

	handleChangePreferredTime(event) {
		this.setState({
			preferredTime: event.target.value
			}, 
			this.passToParent()
		);
	}

	handleChangeReduceGaps(event) {
		this.setState({
			reduceGaps: event.target.checked
			}, 
			this.passToParent()
		);
	}

	render() {
		return(

			// Hidden 
			<form onSubmit={this.handleSubmit}>
				<h5>Settings</h5>
				<hr></hr>
				<div hidden className="form-group">
					<label>School:</label>
					<select 
						className="form-control form-control-sm"
						value={this.state.school}
						onChange={this.handleChangeSchool}>
							{this.props.settings.schools.map(function(school) {
									return <option key={school} value={school}>
										{school}
									</option>;
								})}
					</select>
				</div>
				
				<div className="form-group">
					<label>Campus:</label>
					<select 
						className="form-control form-control-sm"
						value={this.state.campus}
						onChange={this.handleChangeCampus}>
							{this.props.settings.campuses.map(function(campus) {
									return <option key={campus} value={campus}>
										{campus}
									</option>;
								})}
					</select>
				</div>

				<div className="form-group">
					<label>Session:</label>
					<select 
						className="form-control form-control-sm"
						value={this.state.session}
						onChange={this.handleChangeSession}>
							{this.props.settings.sessions.map(function(session) {
									return <option key={session} value={session}>
										{session}
									</option>;
								})}
					</select>
				</div>

				<hr></hr>

				<div className="form-group">
					<label>Prefer time: </label>
					<select 
						className="form-control form-control-sm"
						value={this.state.preferredTime}
						onChange={this.handleChangePreferredTime}>
							<option value="morning">Morning (8:00 - 11:59)</option>
							<option value="afternoon">Afternoon (12:00 - 16:59)</option>
							<option value="evening">Evening (17:00 - 20:00)</option>
					</select>
				</div>
				<div className="form-group">
					<label>
					<input 
						name="reduceGaps" 
						type="checkbox"
						checked={this.state.reduceGaps}
						onChange={this.handleChangeReduceGaps}/>
					{" "}Reduce gaps?</label> 
				</div>
			</form>

		);
	}
}
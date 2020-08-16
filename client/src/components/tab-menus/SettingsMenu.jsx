import React, {Component} from "react";
//import "bootstrap/dist/css/bootstrap.min.css"
//import '../../App.css';

export default class SettingsMenu extends Component{
	constructor(props) {
		super(props);

		this.handleChangeSchool = this.handleChangeSchool.bind(this);
		this.handleChangeCampus = this.handleChangeCampus.bind(this);
		this.handleChangeSession = this.handleChangeSession.bind(this);
		this.handleChangePreferredTime = this.handleChangePreferredTime.bind(this);
		this.handleChangeReduceGaps = this.handleChangeReduceGaps.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
		this.state = {
			school: "",
			campus: "",
			session: "",
			schools: [],
			campuses: [],
			sessions: [],

			preferredTime: "afternoon",
			reduceGaps: false
		};
	}

	componentDidMount() {
		// axios.get("http://localhost:5000/users/")
		// .then(response => {
		// 	if(response.data.length > 0) {
		// 		this.setState({
		// 			users: response.data.map(user => user.username),
		// 			username: response.data[0].username
		// 		})
		// 	}
		// })
		// .catch((error) => {
		// 	console.log(error);
		// })
		this.setState({
			schools: [null, "UBC"],
			campuses: [null, "Vancouver", "Okanagan"],
			sessions: [null, "2020W"],
			school: this.state.schools[0],
			campus: this.state.campuses[0],
			session: this.state.sessions[0]
		})
	}

	handleChangeSchool(event) {
		this.setState({
			school: event.target.value,
			campus: null,
			session: null
		});
	}

	handleChangeCampus(event) {
		this.setState({
			campus: event.target.value
		});
	}

	handleChangeSession(event) {
		this.setState({
			session: event.target.value 
		});
	}

	handleChangePreferredTime(event) {
		this.setState({
			preferredTime: event.target.value
		});
	}

	handleChangeReduceGaps(event) {
		this.setState({
			reduceGaps: event.target.checked
		});
	}
	

	handleSubmit(event) {
		event.preventDefault();
		console.log("form submitted lol");
		console.log(this);
	}

	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				<h5>Settings</h5>
				<hr></hr>
				<div hidden={true} className="form-group"> 
					<label>School:</label>
					<select ref="userInput"
						className="form-control"
						value={this.state.school}
						onChange={this.handleChangeSchool}>
							{this.state.schools.map(function(school) {
									return <option key={school} value={school}>
										{school}
									</option>;
								})}
					</select>
				</div>
				
				<div className="form-group">
					<label>Campus:</label>
					<select ref="userInput"
						className="form-control"
						value={this.state.campus}
						onChange={this.handleChangeCampus}>
							{this.state.campuses.map(function(campus) {
									return <option key={campus} value={campus}>
										{campus}
									</option>;
								})}
					</select>
				</div>

				<div className="form-group">
					<label>Session:</label>
					<select ref="userInput"
						className="form-control"
						value={this.state.session}
						onChange={this.handleChangeSession}>
							{this.state.sessions.map(function(session) {
									return <option key={session} value={session}>
										{session}
									</option>;
								})}
					</select>
				</div>

				<hr></hr>

				<div className="form-group">
					<label>Prefer time: </label>
					<select ref="userInput"
						className="form-control"
						value={this.state.preferredTime}
						onChange={this.handleChangePreferredTime}>
							<option value="morning">Morning (8:00 - 11:59)</option>
							<option value="afternoon">Afternoon (12:00 - 16:59)</option>
							<option value="evening">Evening (17:00 - 20:00)</option>
					</select>
				</div>
				<div className="form-group">
					<label>
					<input name="reduceGaps" 
						type="checkbox"
						checked={this.state.reduceGaps}
						onChange={this.handleChangeReduceGaps}/>
					{" "}Reduce gaps?</label> 
				</div>
			</form>

		);
	}
}
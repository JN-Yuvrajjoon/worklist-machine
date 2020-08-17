import React, {Component} from "react";

export default class WorklistNavigatorBar extends Component{
	constructor(props) {
		super(props);

		this.handleWorklistArrows = this.handleWorklistArrows.bind(this);
		// this.resetEntered = this.resetEntered.bind(this);
		this.navigateToEntered = this.navigateToEntered.bind(this);

		this.state = {
			worklists: 100, // A worklist is a data type, but is not a Component
			inputWorklist: 1,
			currentWorklist: 1,
			enteredWorklist: 1,

			variations: 30,
			currentVariation: 1,
			enteredVariation: 1,

			warnings: ["This app is incomplete"]
		}
	}

	handleWorklistArrows(event) {
		const beginningWorklist = this.state.currentWorklist;
		const lastWorklist = this.state.worklists;
		if(event.target.name === "nextWorklistButton") {
			if(beginningWorklist < lastWorklist) {
				this.setState({
					currentWorklist: (beginningWorklist + 1),
					enteredWorklist: (beginningWorklist + 1)
				});
			} else {
				this.setState({
					currentWorklist: 1,
					enteredWorklist: 1
				});
			}
			
		} else if(event.target.name === "previousWorklistButton") {
			if(beginningWorklist > 1){
				this.setState({
					currentWorklist: (beginningWorklist - 1),
					enteredWorklist: (beginningWorklist - 1)
				});
			} else {
				this.setState({
					currentWorklist: lastWorklist,
					enteredWorklist: lastWorklist
				});
			}
			
		} else if(event.target.name === "firstWorklistButton") {
			this.setState({
				currentWorklist: 1,
				enteredWorklist: 1
			});

		} else if(event.target.name === "lastWorklistButton") {
			this.setState({
				currentWorklist: lastWorklist,
				enteredWorklist: lastWorklist
			});
		}
		// I meant to call a "reset" function here to reset all navigation input fields at once.
		// However, the "entered" state change would happen before the real thing, leading to a field that is late by one step
		
	}

	navigateToEntered(event){
		const userChoice = parseInt(event.target.value);
		
		if(event.target.name === "nthWorklistField") {
			this.setState({enteredWorklist: event.target.value})

			if (userChoice >= 1 && userChoice <= this.state.worklists) {
				this.setState({currentWorklist: userChoice})
			}
			
		} else if(event.target.name === "nthVariationField") {
			this.setState({enteredVariation: event.target.value})

			if (userChoice >= 1 && userChoice <= this.state.variations) {
				this.setState({currentVariation: userChoice})
			}
		}

		
	}
	
	render(){
		return(
			<div className="container-fluid p-0">
				<nav className="form-inline row d-flex justify-content-center flex-nowrap">
					
					<button 
						className="btn btn-light custom-corners p-1" 
						name="firstWorklistButton" 
						onClick={this.handleWorklistArrows}>&lt;&lt;
					</button>
					<button 
						className="btn btn-light custom-corners p-1" 
						name="previousWorklistButton" 
						onClick={this.handleWorklistArrows}>&lt;
					</button>
					
					<input
						className="form-control px-1 mx-1 col-1 flex-shrink-1 text-right"
						name="nthWorklistField"
						type="text"
						value={this.state.enteredWorklist}
						onChange={this.navigateToEntered}>
					</input>
					<input
						className="form-control-plaintext col-1 mx-1 "
						type="text"
						readOnly
						value={"/ " + this.state.worklists}>
					</input>
					
					<button 
						className="btn btn-light custom-corners p-1" 
						name="nextWorklistButton" 
						onClick={this.handleWorklistArrows}>&gt;
					</button>
					<button 
						className="btn btn-light custom-corners p-1" 
						name="lastWorklistButton" 
						onClick={this.handleWorklistArrows}>&gt;&gt;
					</button>
					
				</nav>
				<hr></hr>
				<nav className="form-inline row d-flex justify-content-center flex-nowrap">
					<label>Variation: </label>
					<input
						className="form-control px-1 mx-1 col-1 flex-shrink-1 text-right"
						name="nthVariationField"
						type="text"
						value={this.state.enteredVariation}
						onChange={this.navigateToEntered}>
					</input>
					<input
						className="form-control-plaintext col-1 mx-1 "
						type="text"
						readOnly
						value={"/ " + this.state.variations}>
					</input>
				</nav>
				<hr></hr>
			</div>
			
		)
	}
}
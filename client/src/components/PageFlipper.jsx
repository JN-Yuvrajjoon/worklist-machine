import React, { Component } from "react";

// Responsible for checking user input page number and submitting it to its parent if it's valid
// Badly needs refactoring for clarity lol
// Works for now

/*

props = {
	type: "big boy" or "small boye"			// To be deprecated
	pages: number,
	currentPage: number,					// Must be <= pages

	changeFunction: function(number)
}


is it too late to switch to typescript
*/
export default class PageFlipper extends Component {
	constructor(props) {
		super(props);
		
		this.handleArrowPress = this.handleArrowPress.bind(this);
		this.navigateToEntered = this.navigateToEntered.bind(this);
		this.passToParent = this.passToParent.bind(this);

		this.state = {
			enteredPage: this.props.currentPage //unchecked input
		}
	}

	passToParent(newPage) {
		this.props.changeFunction(newPage);
	}

	handleArrowPress(event) {

		const beginningPage = this.props.currentPage;
		const lastPage = this.props.pages;

		if(event.target.name === "nextPageButton") {
			if(beginningPage < lastPage) {
				this.setState({
					// currentPage: (beginningPage + 1),
					enteredPage: (beginningPage + 1)
				});
				this.passToParent(beginningPage + 1);

			} else {
				this.setState({
					// currentPage: 1,
					enteredPage: 1
				});
				this.passToParent(1);
			}
			
		} else if(event.target.name === "previousPageButton") {
			if(beginningPage > 1){
				this.setState({
					// currentPage: (beginningPage - 1),
					enteredPage: (beginningPage - 1)
				});
				this.passToParent(beginningPage - 1);
			} else {
				this.setState({
					// currentPage: lastPage,
					enteredPage: lastPage
				});
				this.passToParent(lastPage);
			}
			
		} else if(event.target.name === "firstPageButton") {
			this.setState({
				// currentPage: 1,
				enteredPage: 1
			});
			this.passToParent(1);

		} else if(event.target.name === "lastPageButton") {
			this.setState({
				// currentPage: lastPage,
				enteredPage: lastPage
			});
			this.passToParent(lastPage);
		}
		// I meant to call a "reset" function here to reset all navigation input fields at once.
		// However, the "entered" state change would happen before the real thing, leading to a field that is late by one step
	}

	navigateToEntered(event){
		
		this.setState({enteredPage: event.target.value})

		const userChoice = parseInt(event.target.value);
		if (userChoice >= 1 && userChoice <= this.props.pages) {
			this.passToParent(userChoice)
		}
	}

	returnSizedClasses(type) {
		if (type === "big boy") {
			return "form-control form-control-sm px-1 mx-1 col-2 text-right align-self-center";
		} else {
			return "form-control form-control-sm px-1 mx-1 col-1 text-right align-self-center";
		}
	}

	render() {
		return(
			
			<React.Fragment>
				<button 
					className="btn btn-sm btn-light custom-corners p-1" 
					name="firstPageButton" 
					onClick={this.handleArrowPress}>&lt;&lt;
				</button>
				<button 
					className="btn btn-sm btn-light custom-corners p-1 mx-1" 
					name="previousPageButton" 
					onClick={this.handleArrowPress}>&lt;
				</button>
				
				<input
					className={this.returnSizedClasses(this.props.type)}
					name="nthPageField"
					type="text"
					value={this.state.enteredPage}
					onChange={this.navigateToEntered}>
				</input>
				<div className="align-self-center">/{" " + this.props.pages}</div>
				
				<button 
				className="btn btn-sm btn-light custom-corners p-1 mx-1" 
				name="nextPageButton" 
				onClick={this.handleArrowPress}>&gt;
				</button>
				<button 
					className="btn btn-sm btn-light custom-corners p-1" 
					name="lastPageButton" 
					onClick={this.handleArrowPress}>&gt;&gt;
				</button>	
			</React.Fragment>
		);
	}
}
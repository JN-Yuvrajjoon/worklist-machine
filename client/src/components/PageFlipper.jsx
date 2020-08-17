import React, { Component } from "react";

export default class PageFlipper extends Component {
	constructor(props) {
		super(props);
		
		this.handleArrowPress = this.handleArrowPress.bind(this);
		this.navigateToEntered = this.navigateToEntered.bind(this);

		this.state = {
			type: this.props.type,
			pages: this.props.pages,
			currentPage: this.props.currentPage,
			enteredPage: this.props.currentPage //not a typo
		}
	}

	handleArrowPress(event) {

		const beginningPage = this.state.currentPage;
		const lastPage = this.state.pages;

		if(event.target.name === "nextPageButton") {
			if(beginningPage < lastPage) {
				this.setState({
					currentPage: (beginningPage + 1),
					enteredPage: (beginningPage + 1)
				});
			} else {
				this.setState({
					currentPage: 1,
					enteredPage: 1
				});
			}
			
		} else if(event.target.name === "previousPageButton") {
			if(beginningPage > 1){
				this.setState({
					currentPage: (beginningPage - 1),
					enteredPage: (beginningPage - 1)
				});
			} else {
				this.setState({
					currentPage: lastPage,
					enteredPage: lastPage
				});
			}
			
		} else if(event.target.name === "firstPageButton") {
			this.setState({
				currentPage: 1,
				enteredPage: 1
			});

		} else if(event.target.name === "lastPageButton") {
			this.setState({
				currentPage: lastPage,
				enteredPage: lastPage
			});
		}
		// I meant to call a "reset" function here to reset all navigation input fields at once.
		// However, the "entered" state change would happen before the real thing, leading to a field that is late by one step
	}

	navigateToEntered(event){
		
		this.setState({enteredPage: event.target.value})

		const userChoice = parseInt(event.target.value);
		if (userChoice >= 1 && userChoice <= this.state.pages) {
			this.setState({currentPage: userChoice})
		}
	}

	returnSizedClasses(type) {
		if (type === "worklist") {
			return "form-control px-1 mx-1 col-2 text-right align-self-center";
		} else {
			return "form-control form-control-sm px-1 mx-1 col-1 text-right align-self-center";
		}
	}

	render() {
		return(
			
			<React.Fragment>
				<button 
					className="btn btn-light custom-corners p-1" 
					name="firstPageButton" 
					onClick={this.handleArrowPress}>&lt;&lt;
				</button>
				<button 
					className="btn btn-light custom-corners p-1 mx-1" 
					name="previousPageButton" 
					onClick={this.handleArrowPress}>&lt;
				</button>
				
				<input
					className={this.returnSizedClasses(this.state.type)}
					name="nthPageField"
					type="text"
					value={this.state.enteredPage}
					onChange={this.navigateToEntered}>
				</input>
				<text className="align-self-center">/{this.state.pages}</text>
				
				<button 
				className="btn btn-light custom-corners p-1 mx-1" 
				name="nextPageButton" 
				onClick={this.handleArrowPress}>&gt;
				</button>
				<button 
					className="btn btn-light custom-corners p-1" 
					name="lastPageButton" 
					onClick={this.handleArrowPress}>&gt;&gt;
				</button>	
			</React.Fragment>
		);
	}
}
import React, { Component } from "react";

// Badly needs refactoring for clarity lol
// Works for now

/*
props = {
	type: "big boy" or "small boye"			// To be deprecated
	pages: number,
	currentPage: number,
	changeFunction: function(number)
}

is it too late to switch to typescript
*/
export default class PageFlipper extends Component {
	constructor(props) {
		super(props);
		
		this.invalidPages = this.invalidPages.bind(this);
		this.handleArrowPress = this.handleArrowPress.bind(this);
		this.navigateToEntered = this.navigateToEntered.bind(this);
		this.passToParent = this.passToParent.bind(this);

		this.state = {
			inputPage: this.props.currentPage
		} //unchecked input
		
	}

	passToParent() {
		console.log("Passing to parent:", this.state.inputPage);
		this.props.changeFunction(this.state.inputPage);
	}

	invalidPages() {
		return (
			this.props.pages === 0 
			|| this.props.pages === undefined 
			|| this.props.pages.isNaN
		)
	}

	handleArrowPress(event) {
		if(!this.invalidPages()){
			let current = this.props.currentPage;
			let last = this.props.pages;

			if(event.target.name === "nextPageButton") {
				let test = (current + 1);
				this.setState(
					{inputPage: (test <= last? test : 1)}, 
					this.passToParent);
			} else if(event.target.name === "previousPageButton") {
				console.log("< PageButton called");
				let test = (current - 1);
				this.setState(
					{inputPage: (test >= 1? test : last)}, 
					this.passToParent);
			} else if(event.target.name === "firstPageButton") {
				console.log("<< PageButton called");
				this.setState({
					inputPage: 1
				}, this.passToParent);
			} else if(event.target.name === "lastPageButton") {
				console.log(">> PageButton called");
				this.setState({
					inputPage: last
				}, this.passToParent);
			}
		}
	}

	navigateToEntered(event){
		if(!(this.invalidPages())){
			this.setState({inputPage: event.target.value},
			() => {
				let userChoice = parseInt(this.state.inputPage);
				if (userChoice !== null 
					&& userChoice !== undefined 
					&& !userChoice.isNaN
					&& userChoice >= 1 
					&& userChoice <= this.props.pages) {
						this.setState(
							{inputPage: userChoice},
							this.passToParent)
				}
			})
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
		console.log("CONSTRUCTED PAGEFLIPPER GOT PAGE ", this.props.currentPage);
		let displayPages = (this.invalidPages()? "-": this.props.pages);
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
					value={this.state.inputPage}
					onChange={this.navigateToEntered}>
				</input>
				<div className="align-self-center">/{" " + displayPages}</div>
				
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
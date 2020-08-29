import React, {Component} from "react";
import PageFlipper from "./PageFlipper";

/*
props = {
	results={globalResults.length}
	variations={getCurrentResults().length}
	navigateTo={globalNavigationSpot}
	navigateFunction={setglobalNavigationSpot}
	worklistInfo={getCurrentVariation().info} // Includes variation number, warnings, scores
}
*/

export default class WorklistNavigatorBar extends Component{
	constructor(props) {
		super(props);

		this.handleWorklistNavigation = this.handleWorklistNavigation.bind(this);
		this.handleVariationNavigation = this.handleVariationNavigation.bind(this);
	}

	handleWorklistNavigation(newPage) {
		console.log("worklist navigator recieved", newPage, "from main nav");
		this.props.navigateFunction({
			resultPage: newPage, 
			variationPage: 1
		})
	}

	handleVariationNavigation(newPage) {
		console.log("variation navigator recieved", newPage, "from variation nav");
		this.props.navigateFunction({
			resultPage: this.props.navigateTo.resultPage, 
			variationPage: newPage
		})
	}
	
	render(){
		console.log("RENDERED NAVBAR GOT, ", this.props.navigateTo);
		return(
			<React.Fragment>
			<div className="d-flex justify-content-center p-0 m-0">
				<PageFlipper 
					type="big boy"
					changeFunction={this.handleWorklistNavigation}
					pages={this.props.results}
					currentPage={this.props.navigateTo.resultPage}
				/>
			</div>
			<hr></hr>
			<div className="d-flex flex-wrap container-fluid p-0 m-0">
				<div className="mx-2 align-self-center">Variation:</div>
					<PageFlipper 
						type="small boye" 
						changeFunction={this.handleVariationNavigation}
						pages={this.props.variations}
						currentPage={this.props.navigateTo.variationPage}
					/>
				<div className="ml-auto" id="worklistVariationButtons">
					<button className="btn btn-sm btn-outline-danger">Warnings</button>
					<button className="btn btn-sm btn-outline-dark mx-2">Export</button>
				</div>
			</div>
			<hr></hr>
			</React.Fragment>
		)
	}
}
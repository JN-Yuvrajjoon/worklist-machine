import React, {Component} from "react";
import PageFlipper from "./PageFlipper";

export default class WorklistNavigatorBar extends Component{
	constructor(props) {
		super(props);

		this.handleWorklistNavigation = this.handleWorklistNavigation.bind(this);
		this.handleVariationNavigation = this.handleVariationNavigation.bind(this);

		this.state = {
			worklists: 100, // A worklist is a data type, but is not a Component
			inputWorklist: 1,
			currentWorklist: 1,

			variations: 30,
			currentVariation: 1,

			warnings: ["This app is incomplete"]
		}

	}

	handleWorklistNavigation(newPage) {
		this.setState({currentWorklist: newPage})
	}

	handleVariationNavigation(newPage) {
		this.setState({currentVariation: newPage})
	}
	
	render(){
		return(
			<div className="container-fluid p-0 m-0">
				<div className="d-flex justify-content-center p-0 m-0">
				<PageFlipper 
					type="worklist"
					changeFunction={this.handleWorklistNavigation}
					pages={this.state.worklists}
					currentPage={this.state.currentWorklist}
				/>
				</div>

				<hr></hr>

				<div className="d-flex flex-wrap container-fluid p-0 m-0">
						<div className="mx-2 align-self-center">Variation:</div>
						<PageFlipper 
							type="variation" 
							changeFunction={this.handleVariationNavigation}
							pages={this.state.variations}
							currentPage={this.state.currentVariation}
						/>

						<div className="ml-auto" id="worklistVariationButtons">
							<button className="btn btn-sm btn-outline-danger">Warnings</button>
							<button className="btn btn-sm btn-outline-dark mx-2">Export</button>
						</div>
				</div>

				<hr></hr>
			</div>
			
		)
	}
}
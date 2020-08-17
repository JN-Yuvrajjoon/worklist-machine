import React, {Component} from "react";
import PageFlipper from "./PageFlipper";

export default class WorklistNavigatorBar extends Component{
	constructor(props) {
		super(props);


		this.state = {
			worklists: 100, // A worklist is a data type, but is not a Component
			inputWorklist: 1,
			currentWorklist: 1,

			variations: 30,
			currentVariation: 1,

			warnings: ["This app is incomplete"]
		}

	}
	
	render(){
		return(
			<div className="container-fluid p-0 m-0">
				<div className="d-flex justify-content-center p-0 m-0">
				<PageFlipper 
					type="worklist" 
					pages={this.state.worklists}
					currentPage={this.state.currentWorklist}
				/>
				</div>

				<hr></hr>

				<div className="d-flex flex-wrap container-fluid p-0 m-0">
						<div className="flex-grow-1 d-flex">
							<text className="mr-2 align-self-center">Variation:</text>
							<PageFlipper 
								type="variation" 
								pages={this.state.variations}
								currentPage={this.state.currentVariation}
							/>
						</div>
						
						<div className="ml-auto" id="worklistVariationButtons">
							<button className="btn custom-corners btn-outline-danger">Warnings</button>
							<button className="btn custom-corners btn-outline-dark mx-2">Export</button>
						</div>
				</div>

				<hr></hr>
			</div>
			
		)
	}
}
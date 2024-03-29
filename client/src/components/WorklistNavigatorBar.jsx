import React, {Component} from "react";
import PageFlipper from "./PageFlipper";

/*
props = {
  results={globalResults.length}
  variations={getCurrentResult().length}
  currentResult={navigationResult}
  currentVariation={navigationVariation}
  navigateResultFn={setNavigationResult}
  navigateVariationFn={setNavigationVariation}
  worklistInfo={getCurrentVariation().info}
}
*/
export default class WorklistNavigatorBar extends Component{
  constructor(props) {
    super(props);

    this.handleWorklistNavigation = this.handleWorklistNavigation.bind(this);
    this.handleVariationNavigation = this.handleVariationNavigation.bind(this);
  }

  handleWorklistNavigation(newPage) {
    this.props.navigateResultFn(newPage);
    this.props.navigateVariationFn(1); // Maybe allow user to navigate in 2D later, but need to know how many variations in the new result
  }

  handleVariationNavigation(newPage) {
    this.props.navigateVariationFn(newPage);
  }
  
  render(){
    return(
      <React.Fragment>
      <div className="d-flex justify-content-center p-0 m-0">
        <PageFlipper 
          key="big boy"
          name="big boy"
          changeFn={this.handleWorklistNavigation}
          pages={this.props.results}
          currentPage={this.props.currentResult}
        />
      </div>
      <hr></hr>
      <div className="d-flex flex-wrap container-fluid p-0 m-0">
        <div className="mx-2 align-self-center">Variation:</div>
          <PageFlipper 
            key="small boye" 
            name="small boye" 
            changeFn={this.handleVariationNavigation}
            pages={this.props.variations}
            currentPage={this.props.currentVariation}
          />
        <div className="ml-auto" id="worklistVariationButtons">
          <button className="btn btn-sm btn-light ">Warnings</button>
          <button className="btn btn-sm btn-light ml-2 ">Export</button>
        </div>
      </div>
      <hr></hr>
      </React.Fragment>
    )
  }
}
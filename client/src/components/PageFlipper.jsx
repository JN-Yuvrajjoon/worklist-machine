import React, { Component } from "react";

// Could almost certainly be implemented in a simpler way
// however, i refuse to spend more unecessary hours on the pageflipper

/*
props = {
  name: "big boy" or "small boye"
  pages: number,
  currentPage: number,
  changeFn: function(number)
}
*/
export default class PageFlipper extends Component {
  constructor(props) {
    super(props);
    
    this.handleArrowPress = this.handleArrowPress.bind(this);
    this.navigateIfValid = this.navigateIfValid.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.resetState = this.resetState.bind(this);

    // Unchecked input field
    this.state = {
      isInputMode: false,
      inputPage: this.props.currentPage
    } 
  }

  isNatural(num) {
    return !(
      num === undefined 
      || num.isNaN
      || num < 1
    )
  }

  handleArrowPress(event) {
    if (this.isNatural(this.props.pages)){
      let current = this.props.currentPage;
      let last = this.props.pages;

      if (event.target.name === "nextPageButton") {
        let test = (current + 1);
        this.props.changeFn(test <= last? test : 1);
      } else if (event.target.name === "previousPageButton") {
        let test = (current - 1);
        this.props.changeFn(test >= 1? test : last);
      } else if (event.target.name === "firstPageButton") {
        if (current !== 1){this.props.changeFn(1)}
      } else if (event.target.name === "lastPageButton") {
        if (current !== last){this.props.changeFn(last)}
      }
    }
  }

  navigateIfValid(event){
    let userChoice = parseInt(event.target.value);
    if (this.isNatural(userChoice) && userChoice <= this.props.pages) {
      console.log("Pageflipper component named", this.props.name, " got a valid number entry and is navigating to it: ", userChoice);
      this.props.changeFn(userChoice)
      this.setState({
        inputPage: userChoice,
        isInputMode: false
      })
    } else {
      console.error("Pageflipper component named", this.props.name, " recieved invalid input: ", event.target.value);
      this.resetState();
    }
  }

  resetState() {
    if (this.state.inputPage !== this.props.currentPage){
      console.log("Pageflipper component named", this.props.name, "is resetting state to props. Old state:", this.state.inputPage," New state/props:", this.props.currentPage)
      this.setState({
        inputPage: this.props.currentPage,
        isInputMode: false
      });
    }
  }

  handleFocus() {
    this.setState({
      inputPage: this.props.currentPage, //reset just in case
      isInputMode: true
    })
  }

  returnSizedClasses(type) {
    if (type === "big boy") {
      return "form-control form-control-sm px-1 mx-1 col-2 text-right align-self-center";
    } else {
      return "form-control form-control-sm px-1 mx-1 col-1 text-right align-self-center";
    }
  }
  
  render() {
    let displayPages = (this.isNatural(this.props.pages)? this.props.pages : "-");
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
          className={this.returnSizedClasses(this.props.name)}
          name="nthPageField"
          type="text"
          value={this.state.isInputMode? this.state.inputPage : this.props.currentPage} //hacky
          onChange={(e) => this.setState({inputPage: e.target.value})}
          onKeyPress={(e) => {if (e.key === "Enter"){e.target.blur()}}}
          onFocus={this.handleFocus}
          onBlur={this.navigateIfValid}>
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
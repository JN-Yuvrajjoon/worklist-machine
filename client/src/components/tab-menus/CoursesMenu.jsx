import React, {Component} from "react";

export default class CoursesMenu extends Component {
	constructor(props) {
		super(props);

		this.onAddCourse = this.onAddCourse.bind(this);
		this.onAddCustomBlock = this.onAddCustomBlock.bind(this);

		this.state = {
			inputCourses: [],
			inputCustomBlocks: []
		}
	}

	componentDidMount() {
		this.setState({
			inputCourses: [],
			inputCustomBlocks: []
		})
	}

	onAddCourse() {
		let newState = this.state;
		newState.inputCourses.unshift(new InputCourse);

		this.setState({
			inputCourses: newState.inputCourses
		})
		
		console.log("e");
	}

	onAddCustomBlock() {
		console.log("i am tired");
	}

	onDelete() {
	}
	
	render() {
		return(
			<div className="container-fluid">
				<h5>Courses</h5>
				<hr></hr>
				<button className="btn btn-light btn-block my-3 custom-corners" onClick={this.onAddCourse}>+ Add course</button>
				<button className="btn btn-light btn-block my-3 custom-corners" onClick={this.onAddCustomBlock}>+ Add custom block</button>
				<hr></hr>
				<ul>
				{this.state.inputCourses.map(function(course) {return <li>{course.state.name}</li>})}
				</ul>
			</div>
		)
	}
}

class InputCourse extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			mustBeTerm: 0,
			mustHaveSections: []
		};
	}

	handleChange(){
	}

	render() {
		return(
			<p>This is a InputCourse component!</p>
		)
	}
}

class InputCustom extends Component {
	constructor(props) {
		super(props);
	}

	handleChange() {
	}
	
	render() {
		return(
			<p>This is a InputCustom component!</p>
		)
	}
}
import React, {Component} from "react";

export default class CoursesMenu extends Component {
	constructor(props) {
		super(props);

		this.onAddCourse = this.onAddCourse.bind(this);
		this.getKey = this.getKey.bind(this);
		this.onAddCustomBlock = this.onAddCustomBlock.bind(this);

		this.state = {
			inputCourses: [],
			inputCustomBlocks: [],
			maxCourses: 16
		}
	}

	onAddCourse() {
		const newInputCourses = this.state.inputCourses;
		if(newInputCourses.length >= this.state.maxCourses) {
			console.log("slow down engineer, worklist machine can only deal with 16 courses for now");
		} else {
			const newCourse = React.createElement(InputCourse);
			// newState.inputCourses.unshift(new InputCourse); 
			// ^ Does not work, since it doesn't mount the object as a react element
			newInputCourses.unshift(newCourse); 

			this.setState({
				inputCourses: newInputCourses
			})
		}
	}

	// I do not even care if this system is more/less efficient than using an item's index
	// react keeps filling up my console with warnings
	getKey(num) {
		return("course", num)
	}

	onAddCustomBlock() {
		console.log("i am tired"); //TODO: Make this work
	}

	onDelete() {
	}
	
	render() {
		return(
			<div className="container-fluid m-0 p-0">
				<h5>Courses</h5>
				<button className="btn btn-light btn-block my-3 " onClick={this.onAddCourse}>+ Add course</button>
				<button className="btn btn-sm btn-outline-light btn-block my-3 " onClick={this.onAddCustomBlock}>+ Add custom block</button>
				<hr></hr>
				
				{this.state.inputCourses.map(
					function(course) {
						return (
							<div className="container-fluid p-0 m-0">
								{course}
								<hr></hr>
							</div>
						)
					})
				}
				
			</div>
		)
	}
}

class InputCourse extends Component {
	constructor(props) {
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);

		this.state = {
			name: "",
			mustBeTerm: 0,
			mustHaveSections: []
		};
	}

	handleNameChange(event){
		this.setState({
			name: event.target.value
		});
	}

	handleTermChange(event){
		this.setState({
			mustBeTerm: event.target.value
		});
	}

	render() {
		return(
			<form className="px-3">
				<input
					className="form-control form-control-sm"
					name="courseNameInput"
					type="text"
					placeholder="Course"
					value={this.state.name}
					onChange={this.handleNameChange}>
				</input>
			
				<label className="">Must be in term:
					<select 
						className="form-control form-control-sm"
						name="courseTermInput"
						type="dropdown"
						value={this.state.mustBeTerm}
						onChange={this.handleTermChange}>
						<option value="0">Any term</option>
						<option value="1">Term 1</option>
						<option value="2">Term 2</option>
						<option value="3">Term 1-2</option>
					</select>
				</label>

				<label hidden>Must have sections:
					<select 
						className="form-control form-control-sm"
						name="courseSectionInput"
						type="text"
						//value={this.state.mustBeTerm}
						//onChange={this.handleTermChange}
						>
						<option value="0">Any term</option>
						<option value="1">Term 1</option>
						<option value="2">Term 2</option>
						<option value="3">Term 1-2</option>
					</select>
				</label>
			</form>
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
import React, {Component} from "react";

export default class CoursesMenu extends Component {
	constructor(props) {
		super(props);

		this.generateKey = this.generateKey.bind(this);
		this.onAddCourse = this.onAddCourse.bind(this);
		this.onModifyCourse = this.onModifyCourse.bind(this);
		this.onDeleteCourse = this.onDeleteCourse.bind(this);
		this.onAddCustomBlock = this.onAddCustomBlock.bind(this);
		this.passCoursesToParent = this.passCoursesToParent.bind(this);
		this.passCustomsToParent = this.passCustomsToParent.bind(this);

		this.state = {
			currentKey: 0,
			inputCourses: this.props.coursesToRender, // a list of InputCourse Objects
			inputCoursesDeprecated: [],
			inputCustomBlocks: [], // a list of InputCustom Objects
			maxCourses: 16
		}
	}
	generateKey(course) {
		return this.state.inputCourses.indexOf(course);
	}

	passCoursesToParent() {
		this.props.changeCoursesFunction(this.state.inputCourses);
	}
	passCustomsToParent() {
		this.props.changeCustomsFunction(this.state.inputCustomBlocks);
	}

	onAddCourse() {
		const newInputCourses = this.state.inputCoursesDeprecated;
		if(newInputCourses.length >= this.state.maxCourses) {
			console.log("slow down engineer, worklist machine can only deal with 16 courses for now");
		} else {
			//const newCourse = React.createElement(InputCourseDeprecated);
			// newState.inputCourses.unshift(new InputCourse); 
			// ^ Does not work, since it doesn't mount the object as a react element
			//newInputCourses.unshift(newCourse); 

			this.setState({
				inputCoursesDeprecated: newInputCourses
			})
		}
	}

	onAddCustomBlock() {
		console.log("i am tired"); //TODO: Make this work
	}

	onModifyCourse(updatedCourse, key) {
		console.log("modifying a course, ", this.state.inputCourses[key], " to this: ", updatedCourse, " key: ", key);
		
		let updated = this.state.inputCourses;
		updated[key] = updatedCourse;

		this.setState({
			inputCourses: updated
		},

		this.passCoursesToParent());
	}

	onDeleteCourse(key) {
		this.setState({
			inputCourses: this.state.inputCourses.filter(course => key !== course.key)
		})
	}
	
	render() {
		return(
			<React.Fragment>
				<h5>Courses</h5>
				<button className="btn btn-light btn-block my-3 " onClick={this.onAddCourse}>+ Add course</button>
				<button className="btn btn-sm btn-outline-light btn-block my-3 " onClick={this.onAddCustomBlock}>+ Add custom block</button>
				<hr></hr>

				{this.state.inputCourses.map((inputCourse) => 
					<div className="p-0 m-0 container-fluid">
					<InputCourse 
						key={inputCourse.key}
						course={inputCourse}
						changeFunction={this.onModifyCourse}
						deleteFunction={this.onDeleteCourse}
						availableTerms={this.props.availableTerms}
					/>
					<hr></hr>
					</div>
				)}
				
			</React.Fragment>
		)
	}
}


class InputCourse extends Component{
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		console.log("we changing boys, old course here: ", this.props.course)
		let newCourse = this.props.course;
		newCourse[event.target.name] = event.target.value
		
		this.props.changeFunction(newCourse, this.props.course.key)
	}

	render() {
		return(
			<form className="px-2">
				<input
					className="form-control form-control-sm"
					name="name"
					type="text"
					placeholder="Course"
					value={this.props.course.name}
					onChange={this.handleChange}
				>
				</input>
			
				<label className="">Must be in term:
					<select 
						className="form-control form-control-sm"
						name="mustBeTerm"
						type="dropdown"
						value={this.props.course.mustBeTerm}
						onChange={this.handleChange}>
							<option value={false}>Any term</option>
							{this.props.availableTerms.map((term) => <option key={term} value={term}>{term}</option>)}	
					</select>
				</label>

				{/* <label hidden>Must have sections:
					<select 
						className="form-control form-control-sm"
						name="courseSectionInput"
						type="text"
						//value={this.state.mustBeTerm}
						//onChange={this.handleTermChange}
						>
						<option value="0">Any term</option>
					</select>
				</label> */}
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

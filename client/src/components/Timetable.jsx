import React, {Component} from "react";

// RENDERING WORKLISTS
// WorklistRendering arranges Timetables onto the output panel

// After taking in a Worklist object, it will:
// 1. Decide how many Timetables to render
// 2. Decide whether the Timetables should be extended (by adding weekends, or extending mornings, or extending evenings)
// 3. Might need to deduce the height of an "hour"

export default class WorklistRendering extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			singleTerms = [],
			otherSections = [],

			hasWeekendCourses: false,
			extendMorning: false, //Default 800, extended 600
			extendEvening: false //Default 1800, extended 2200
		};

	}

	render() {
		return(<Timetable/>);
	}

}


class Timetable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sections: [],

		}
	}

	checkForWeekends() {
	}

	checkForMornings() {
	}

	checkForEvenings() {
	}
	
	render() {
		return(
			<div className="card-group">
				<div className="card ">
					<ul class="list-group list-group-flush">
					<li class="list-group-item">Cras justo odio</li>
					<li class="list-group-item">Dapibus ac facilisis in</li>
					<li class="list-group-item">Vestibulum at eros</li>
					</ul>
				</div>
				<div className="card ">
					<ul class="list-group list-group-flush">
					<li class="list-group-item">Cras justo odio</li>
					<li class="list-group-item">Cras justo odio</li>
					<li class="list-group-item">Dapibus ac facilisis in</li>
					<li class="list-group-item">Vestibulum at eros</li>
					</ul>
					</div>
				<div className="card ">e</div>
				<div className="card ">e</div>
				<div className="card ">e</div>
			</div>
			
		)
	}
}

class DayColumn {
	DayColumn() {

	}
}



// BACKUP MECHANISM: If a timetable has a course with a start or end time not ending in 00 or 30

// class CourseBlock extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			courseCode: this.props.courseCode,
// 			section: this.props.section,

// 			startTime: this.props.startTime,
// 			endTime: this.props.endTime,
// 			color: this.props.color
// 		}
// 	}

// 	render() {
// 		return(
// 			<div className="wm-course-block rounded"></div>
// 		)
// 	}
// }
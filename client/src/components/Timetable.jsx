import React, {Component} from "react";


export default class Timetable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sections: [],

			hasWeekendCourses: false,
			extendMorning: false, //Default 800, extended 600
			extendEvening: false //Default 1800, extended 2200
		}
	}
	
	render() {
		return(
			<div class="card">
			<div class="table-responsive">
			<table className="timetable table table-bordered m-0" style={{borderCollapse:"separate", borderSpacing:0, borderWidth:"0.5pt"}}>
				<thead>
				<th colSpan="7"></th>
				</thead>
				<tbody>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				</tbody>
			</table>
			</div>
			</div>
		)
	}
}



// BACKUP MECHANISM: If a timetable has a course with a start or end time not ending in 00 or 30

// class DayColumn {
// }

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
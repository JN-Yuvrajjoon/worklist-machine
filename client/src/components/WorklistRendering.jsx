import React, {Component} from "react";
import {emptyDayBlockSet} from "../example-results.js";

const defaultWorklist = {
	info: {},
	semesters: [
		{id: "1", startDate: false, endDate: false, dayBlocks: emptyDayBlockSet}, 
		{id: "2", startDate: false, endDate: false, dayBlocks: emptyDayBlockSet}
	],
	abnormalSections: []
}

/* 
App.js props = {
	currentResult={navigationResult}
	currentVariation={navigationVariation}
	rendered={getCurrentVariation()}
} 
*/
export default class WorklistRendering extends Component {
	constructor(props) {
		super(props);

		this.returnRenderable = this.returnRenderable.bind(this);
		this.findHeight = this.findHeight.bind(this);
		this.checkWorklistFor = this.checkWorklistFor.bind(this);
		this.getBlocksIn = this.getBlocksIn.bind(this);
	}

	// TODO: SEPARATE DAYBLOCKSETS
	// If the props are not renderable, just render the default
	returnRenderable(){
		let toRender = this.props.worklist;
		if (toRender.semesters === undefined || toRender.semesters.length === 0) {
			// console.log("WorklistRendering got undefined or zero semesters, so is rendering the default.");
			return defaultWorklist;
		} else {
			// console.log("Rendering worklist:", this.props.worklist);
			return this.props.worklist;
		}
	}
	
	// Returns the on-screen height of a thirty minute block
	// should later take into account the height of the screen and the start/end times
	findHeight() {
		return 1.5;
	}
	
	checkWorklistFor(extension) {
		return false;
	}
	
	//remove
	getBlocksIn(term) {
		return [];
	}

	// OUTPUT:
	// [DayBlockSet], each with its associated start and end dates
	getBlockSets(worklist){
		if (worklist !== undefined && worklist.semesters !== undefined) {
			let blockSets = [];
			worklist.semesters.forEach(
				function(sem) {

					// Looks bad, but will only happen very rarely (when courses don't start and end with the rest of the semester)
					if (Array.isArray(sem.dayBlocks)){
						sem.dayBlocks.forEach(
							function(origSet) {
								let set = origSet;
								set.startDate = (set.subsetStartDate || sem.startDate)
								set.startDate = (set.subsetEndDate || sem.endDate)
								blockSets.push(set)
							}
						)

					// Common case
					} else {
						let set = sem.dayBlocks;
						set.startDate = (sem.startDate)
						set.startDate = (sem.endDate)
						blockSets.push(set)
					}
				}
			)
			return blockSets;
		}
	}
	
	render() {
		let weekendExtension= this.checkWorklistFor("weekendExtension");
		let morningExtension= this.checkWorklistFor("morningExtension"); //Default 800, extended 600
		let eveningExtension= this.checkWorklistFor("eveningExtension"); //Default 1800, extended 2200

		return(
			<div className="row p-0 m-0 container-fluid">
				{this.returnRenderable().semesters.map((sem) => 
					{return (
						<div className="col-lg-6 p-2 m-0" key={sem.id}>
							<Timetable 
								semester={sem.id}
								currentResult={this.props.currentResult}
								currentVariation={this.props.currentVariation}
								blocks={this.getBlocksIn(sem)}
								standardHeight={this.findHeight()}
								hideWeekends={this.checkWorklistFor("weekendExtension")} 
								startAt={this.checkWorklistFor("morningExtension")} 
								endAt={this.checkWorklistFor("eveningExtension")}/>
						</div>
					)}
				)}

				{/* Do something about untimetabled sections here */}
				
			</div>
		);
	}
}

/*
WorklistRendering props = {
	semester={sem.id}
	currentResult={this.props.currentResult}
	currentVariation={this.props.currentVariation}
	blocks={this.getBlocksIn(sem)}
	standardHeight={this.findHeight()}
	hideWeekends={this.checkWorklistFor("weekendExtension")} 
	startAt={this.checkWorklistFor("morningExtension")} 
	endAt={this.checkWorklistFor("eveningExtension")}
}
*/
// TODO: Alternating week courses
class Timetable extends Component {
	constructor(props) {
		super(props);

		this.generateTableTitle = this.generateTableTitle.bind(this);
		this.renderTimeRuler = this.renderTimeRuler.bind(this);
		this.dayBlocksOf = this.dayBlocksOf.bind(this);

		this.state = {
			blocks: [],

			hideWeekends: true,
			startAt: 800,
			endAt: 1800,
			standardHeight: this.props.standardHeight
		}
	}

	// 1. what is this sidebar called
	// 2. looks like a ruler to me
	renderTimeRuler() {
		const timeRuler = [<div className="p-0 m-0" style={{height:this.state.standardHeight + "rem"}}></div>]
		for(let i = this.state.startAt; i < this.state.endAt; i+=100) {
			let iColon = `${i.toString().slice(0,-2)}:00`
			timeRuler.push(<div className="wm-hour-marker" style={{height:(this.state.standardHeight) + "rem"}}>{iColon}</div>);
			timeRuler.push(<div className="wm-hour-marker" style={{height:(this.state.standardHeight) + "rem"}}></div>);
		}
		return timeRuler;
	}

	dayBlocksOf(){
		// If on the specified day, creates a RenderableBlock out of the block and adds it to the list
		// Simplifies the time to become more easily renderable
		// e.g. 1200 - 930 = 270 = length of 5
		// e.g. 1230 - 900 = 230 = length of 5
	
		// e.g. 1000 - 900 = 100 = length of 2
	
		// e.g. 1000 - 930 = 70 = length of 1
		// e.g. 1030 - 900 = 30 = length of 1
		return([]);
	}

	// INPUT:
	// sem: number
	// start: Date or false
	// end: Date or false
	//
	// OUTPUT:
	// Title = {semester: string, interval: string, navigation: string}
	generateTableTitle(sem, start, end) {
		let intervalString = (
			(!start || !end)? "" :
			(`${start.toDateString().slice(4,10)}-${end.toDateString().slice(4,10)}`)
		)
		let navString = (
			(this.props.currentResult === 0 || this.props.currentVariation === 0)? "" :
			(`(Result ${this.props.currentResult}.${this.props.currentVariation})`)
		)
		return {
			semester: (`Semester ${sem}`),
			interval: intervalString,
			navigation: navString
		};
	}
	
	render() {
		const rows = 20; // calculate from start and end times
		let title = this.generateTableTitle(this.props.semester, this.props.startDate, this.props.endDate);

		return(
			<React.Fragment>
			<div className="card p-2 mb-2 zero-space text-center wm-table-title">
				<p className="m-0">
					<b>{title.semester}</b>
					{" "+ title.interval}
					{" "+ title.navigation}
				</p>
			</div>
			<div className="row p-0 m-0 zero-space">
				<div className="col-1 p-0 m-0">
					{this.renderTimeRuler()}
				</div>

				<div className="card-group p-0 m-0 col-11">
					<div className="row p-0 m-0 w-100">

					{this.state.hideWeekends ? null :
						<DayColumn 
							day="Sunday" 
							rows={rows}
							standardHeight = {this.state.standardHeight}
							renderableBlocks={this.dayBlocksOf("Sunday")} />
					}

					<DayColumn 
						day="Monday" 
						rows={rows}
						standardHeight = {this.state.standardHeight}
						renderableBlocks={this.dayBlocksOf("Monday")} />
					<DayColumn 
						day="Tuesday" 
						rows={rows}
						standardHeight = {this.state.standardHeight}
						renderableBlocks={this.dayBlocksOf("Tuesday")} />
					<DayColumn 
						day="Wednesday" 
						rows={rows}
						standardHeight = {this.state.standardHeight}
						renderableBlocks={this.dayBlocksOf("Wednesday")} />
					<DayColumn 
						day="Thursday" 
						rows={rows}
						standardHeight = {this.state.standardHeight}
						renderableBlocks={this.dayBlocksOf("Thursday")} />
					<DayColumn 
						day="Friday" 
						rows={rows}
						standardHeight = {this.state.standardHeight}
						renderableBlocks={this.dayBlocksOf("Friday")} />
					
					{this.state.hideWeekends ? null :
						<DayColumn 
							day="Saturday" 
							rows={rows}
							standardHeight = {this.state.standardHeight}
							renderableBlocks={this.dayBlocksOf("Saturday")} />
					}
					</div>
				</div>
			</div>
			</React.Fragment>
		)
	}
}


const fakeDayColumnProps = {
	day: "whatever this isn't going in",
	standardHeight: "not going in either",
	rows: "not going in either",
	
	renderableBlocks: [
		{courseCode: "CPSC 213",
			sectionCode: "101",
			activityType: "Lecture", // ?
			startTime: 0, //800
			length: 3, //930
			alternating: 0
		},
		{courseCode: "CPSC 213",
			sectionCode: "L01",
			activityType: "Laboratory", // ?
			startTime: 3, //930
			length: 4, //1130
			alternating: 0
		},
		{courseCode: "COMM 202",
			sectionCode: "101",
			activityType: "Lecture", // ?
			startTime: 16, //1600 but my math could be off
			length: 2, //1700
			alternating: 1
		}
	]
}

/*
props = {
	day:				just the title of the day (e.g. Monday)
	standardHeight:	height of one 30-minute block in rem
	rows:				Number of 30-minute blocks it's rendering for the day
	renderableBlocks: an ordered list of RenderableBlock objects that all occur on the same day and do not overlap
		courseCode: "CPSC 213",
		sectionCode: "101",
		activityType: "Lecture", 
		startTime: 0, //800
		length: 3, //930
		alternating: 0
}
*/
// This item likely doesn't need to be a Component
class DayColumn extends Component {
	constructor(props) {
		super(props);

		this.returnGap = this.returnGap.bind(this);
		this.renderCourse = this.renderCourse.bind(this);

		this.state = {
			day: this.props.day,
			standardHeight: this.props.standardHeight,
			rows: this.props.rows,

			renderableBlocks: fakeDayColumnProps.renderableBlocks
		}
	}

	// maybe later pass in "startodd?" and "startlight?" param so tables are stripey based on hours
	// Better yet, make a gap a single block that is striped using CSS rather than using a for loop
	returnGap(length) {
		let gap = [];
		for(let i = 0; i < length; i++) {
			gap.push(<li className="list-group-item p-0 m-0" style={{height:this.state.standardHeight + "rem"}}></li>);
		}
		return gap;
	}

	renderCourse(block) {
		let blockHeight = block.length * this.state.standardHeight;
		let courseName = block.courseCode;
		let courseSection = block.sectionCode;
		return(<div className="wm-course-block rounded" style={{height:blockHeight + "rem"}}>{courseName + " section " +courseSection}</div>); //fix height
	}

	// hoverGlow(block){
	// 	// makes all blocks of a Section glow when one block is hovered on
	// 	// I think this could slow things down; I will not include it if it does
	// }

	render() {
		let unrendered = this.state.renderableBlocks;
		let currentRow = 0;
		let col = [];

		while (currentRow < this.state.rows) {

			// No more courses in the day
			if (unrendered === undefined || unrendered.length === 0) {
				col = col.concat(this.returnGap(this.state.rows - currentRow));
				currentRow = this.state.rows; //break

			// Need to render a course in this row
			} else if (unrendered[0].startTime === currentRow) {
				col.push(this.renderCourse(unrendered[0]));
				currentRow += unrendered[0].length;
				unrendered.shift();

			// Need to render a break before the next class
			} else if (unrendered[0].startTime > currentRow) {
				let difference = unrendered[0].startTime - currentRow;
				col = col.concat(this.returnGap(difference));
				currentRow += difference;

			// Should not happen, indicates infinite loop
			} else {
				console.log("bad");
				currentRow++;
			}
		}

		return(
			<div className="col card flex-nowrap p-0 m-0">
				<ul className="list-group list-group-flush p-0 m-0">
					<li className="list-group-item p-0 m-0 text-center" 
						style={{height:this.state.standardHeight + "rem"}}
						>
							{this.state.day.charAt(0)}
					</li>
					{col}
				</ul>
			</div>
		)
	}
}
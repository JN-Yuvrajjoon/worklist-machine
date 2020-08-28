import React, {Component} from "react";

const fakeTerm1 = {
	name: "Semester 1",
	courses: [{},{},{}]
}

const fakeTerm2 = {
	name: "Semester 2",
	courses: []
}

const fakeWorklist = {
	resultNumber: 1,
	variationNumber: 1,

	gapScore: 100,
	morningScore: 50,
	consistencyScore: 0,

	singleTerms: [ // Term objects
		fakeTerm1,
		fakeTerm2
	],
	otherSections: [ //Section object
		{},
		{},
		{}
	]
};

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

//////// WORKLISTRENDERING COMPONENT
//////// represents one Worklist rendered as multiple SemesterTables
// 
// After taking in a WorklistRendering object, WorklistRendering will:
// 1. Decide how many SemesterTables to render
// 2. Decide whether SemesterTables should be extended (by adding weekends, or extending mornings, or extending evenings)
//    Note that ALL SemesterTables in a given rendering should have the same dimensions
//    (e.g. having weekend courses in one term will cause all SemesterTables to display weekend columns)
// 3. Calculate the height of a 30-minute block

// props = {worklist: Worklist}
export default class WorklistRendering extends Component {
	constructor(props) {
		super(props);

		this.generateTitle = this.generateTitle.bind(this);
		this.findHeight = this.findHeight.bind(this);
		this.checkWorklistFor = this.checkWorklistFor.bind(this);
		this.getBlocksIn = this.getBlocksIn.bind(this);
		
		
		this.state = {
			resultNumber: fakeWorklist.resultNumber,
			variationNumber: fakeWorklist.variationNumber,
			
			singleTerms: fakeWorklist.singleTerms,
			otherSections: fakeWorklist.otherSections,

			// Determine these right before rendering, not here
			weekendExtension: this.checkWorklistFor("weekendExtension"),
			morningExtension: this.checkWorklistFor("morningExtension"), //Default 800, extended 600
			eveningExtension: this.checkWorklistFor("eveningExtension") //Default 1800, extended 2200
		};

	}

	generateTitle(term) {
		return (`Worklist ${this.state.resultNumber} variation ${this.state.variationNumber}: ${term.name}`);
	}

	// Returns the on-screen height of a thirty minute block
	// should later take into account the height of the screen and the start/end times
	findHeight() {
		return 1.5;
	}

	checkWorklistFor(extension) {
		return false;
	}

	getBlocksIn(term) {
		return [];
	}

	render() {
		return(
			<div className="row p-0 m-0 container-fluid">
				{this.state.singleTerms.map((term) => 
					{return (
						<div className="col-lg-6 p-2 m-0">
							<p className="m-0">{this.generateTitle(term)}</p>
							<SemesterTable 
								blocks={this.getBlocksIn(term)}
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

//////// SEMESTERTABLE COMPONENT
//////// represents one semester of a worklist rendering

// SemesterTable takes in a bunch of Blocks, separates them by day, and puts them on a grid
// Must create the "renderableBlock" data type, which is different from the type used in worklist generation
// TODO: Alternating week courses
class SemesterTable extends Component {
	constructor(props) {
		super(props);

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
	
	render() {
		const rows = 20; // calculate from start and end times

		return(
			<React.Fragment>
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


//////// DAYCOLUMN COMPONENT
// This item likely doesn't need to be a Component

// PROPS
// day:				just the title of the day (e.g. Monday)
// standardHeight:	height of one 30-minute block in rem
// rows:				Number of 30-minute blocks it's rendering for the day
// renderableBlocks: an ordered(?) list of RenderableBlock objects that all occur on the same day and do not overlap
// 			courseCode: "CPSC 213",
// 			sectionCode: "101",
// 			activityType: "Lecture", 
// 			startTime: 0, //800
// 			length: 3, //930
// 			alternating: 0

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

	hoverGlow(block){
		//makes all blocks of a Section glow when one block is hovered on
		// I think this could slow things down; I will not include it if it does
	}

	render() {
		// fakeDayColumnProps should produce: 3-long block, 4-long block, 9 gaps, 2-long block, 2 gaps
		let unrendered = this.state.renderableBlocks;
		let currentRow = 0;
		let col = [];

		while (currentRow < this.state.rows) {

			// No more courses in the day
			if(unrendered === undefined || unrendered.length === 0) {
				col = col.concat(this.returnGap(this.state.rows - currentRow));
				currentRow = this.state.rows; //break

			// Need to render a course in this row
			} else if(unrendered[0].startTime === currentRow) {
				col.push(this.renderCourse(unrendered[0]));
				currentRow += unrendered[0].length;
				unrendered.shift();

			// Need to render a break before the next class
			} else if(unrendered[0].startTime > currentRow) {
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
					<li className="list-group-item p-0 m-0 text-center" style={{height:this.state.standardHeight + "rem"}}>{this.state.day.charAt(0)}</li>
					{col}
				</ul>
			</div>
		)
	}
}
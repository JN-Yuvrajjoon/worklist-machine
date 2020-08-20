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
		return "1.5rem"
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
						<div className="col-6 p-0 m-0">
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

		const what = "test";

		this.state = {
			blocks: [],

			hideWeekends: true,
			startAt: 800,
			endAt: 1800,
			standardHeight: this.props.standardHeight
		}
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
				<div className="col-xs-1  p-0 m-0">
					<div style={{height:this.state.standardHeight}}></div>
					<div style={{height:this.state.standardHeight}}>8</div>
					<div style={{height:this.state.standardHeight}}></div>
					<div style={{height:this.state.standardHeight}}>9</div>
					<div style={{height:this.state.standardHeight}}></div>
					<div style={{height:this.state.standardHeight}}>10</div>
				</div>

				<div className="col-10 card-group p-0 m-0">

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

					{/* Testing junk column below */}
					<div className="card">
						<ul class="list-group list-group-flush">
							<li class="list-group-item p-0 m-0">test</li>
							<li class="list-group-item p-0 m-0">30mins</li>
							<li class="list-group-item p-0 m-0" style={{height:"1.75rem"}}>30mins</li>
							<li class="list-group-item p-0 m-0" style={{height:"2.625rem"}}>30mins</li>
							<li class="list-group-item p-0 m-0" style={{height:"3.5rem"}}>30mins</li>
							<li class="list-group-item p-0 m-0" style={{height:"3.5rem"}}>
								<div className="wm-course-block rounded" style={{height:"calc(3.5rem - 1px)"}}>CPSC</div>
							</li>
							<li class="list-group-item p-0 m-0">30mins</li>
						</ul>
					</div>
					{/* end */}

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

	returnGap() {
		return(<li class="list-group-item p-0 m-0" style={{height:this.state.standardHeight}}>30mins</li>);
	}
	renderCourse(block) {}

	hoverGlow(block){
		//makes all blocks of a Section glow when one block is hovered on
		// I think this could slow things down; I will not include it if it does
	}

	render() {
		// fakeDayColumnProps should produce: 3-long block, 4-long block, 9 gaps, 2-long block, 2 gaps
		var unrendered = this.state.renderableBlocks;
		let col = [];

		let currentRow = 0;
		while (currentRow <= this.state.rows) {
			col.push(this.returnGap());
			currentRow++;
		}

		return(
			<div className="card">
				<ul class="list-group list-group-flush">
					<li class="list-group-item p-0 m-0 text-center" style={{height:this.state.standardHeight}}>{this.state.day.charAt(0)}</li>
					{col}
					{/* <li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">
						30mins
					</li> */}
				</ul>
			</div>
		)
	}
}
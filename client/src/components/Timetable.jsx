import React, {Component} from "react";

// RENDERING WORKLISTS
// WorklistRendering arranges Timetables onto the output panel
// Both Timetables should have the same layout (e.g. having weekend courses in one term will cause all timetables to display weekend columns)

// After taking in a Worklist object, it will:
// 1. Decide how many Timetables to render and their titles
// 2. Decide whether all Timetables should be extended (by adding weekends, or extending mornings, or extending evenings)
// 3. Might need to deduce the height of an "hour"

export default class WorklistRendering extends Component {
	constructor(props) {
		super(props);

		this.generateTitle = this.generateTitle.bind(this);
		this.checkWorklistFor = this.checkWorklistFor.bind(this);
		this.getBlocksIn = this.getBlocksIn.bind(this);


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
		return (`Worklist ${this.state.resultNumber} variation ${this.state.variationNumber}: Term ${term.name}`);
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
							<p>{this.generateTitle(term)}</p>
							<Timetable 
								blocks={this.getBlocksIn(term)} 
								showWeekends={this.checkWorklistFor("weekendExtension")} 
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

// Timetable takes in a bunch of Blocks, separates them by day, and puts them on a grid
// TODO: Alternating week courses
class Timetable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			blocks: [],

			hideWeekends: true,
			startAt: 800,
			endAt: 1800,
			heightOfThirtyMinutes: 1
		}
	}

	dayBlocksOf(){
		return([]);
	}

	
	render() {
		return(
			<React.Fragment>
			<div className="row p-0 m-0 zero-space">
				<div className="col-xs-1  p-0 m-0">
					<div>gap</div>
					<div>8</div>
					<div>gap</div>
					<div>9</div>
					<div>gap</div>
					<div>10</div>
				</div>

				<div className="col-10 card-group p-0 m-0">
					{this.state.hideWeekends 
						? null
						: <DayColumn day="Sunday" blocks={this.dayBlocksOf("Sunday")}/>}
					<DayColumn day="Monday" blocks={this.dayBlocksOf("Monday")}/>
					<DayColumn day="Tuesday" blocks={this.dayBlocksOf("Tuesday")}/>
					<DayColumn day="Wednesday" blocks={this.dayBlocksOf("Wednesday")}/>
					<DayColumn day="Thursday" blocks={this.dayBlocksOf("Thursday")}/>
					<DayColumn day="Friday" blocks={this.dayBlocksOf("Friday")}/>
					{this.state.hideWeekends 
						? null
						: <DayColumn day="Saturday" blocks={this.dayBlocksOf("Saturday")}/>}
					<div className="card">
						<ul class="list-group list-group-flush">
							<li class="list-group-item p-0 m-0">30mins</li>
							<li class="list-group-item p-0 m-0">30mins</li>
							<li class="list-group-item p-0 m-0">30mins</li>
							<li class="list-group-item p-0 m-0">30mins</li>
							<li class="list-group-item p-0 m-0">30mins</li>
							<li class="list-group-item p-0 m-0">
								<div className="wm-course-block rounded">CPSC</div>
							</li>
							<li class="list-group-item p-0 m-0">30mins</li>
						</ul>
					</div>
				</div>
			</div>
			</React.Fragment>
			
		)
	}
}

//PROPS:
//props.startTime and props.endTime are numbers
//props.blocks is an ordered(?) list of Block objects that all occur on the same day
class DayColumn extends Component {
	constructor(props) {
		//props = startTime, endTime, blocks
		super(props);

		this.state = {
			day: this.props.day,
			blocks: this.props.blocks
		}

	}

	renderBreak() {}
	renderCourse() {}

	//makes all blocks of a Section glow when one block is hovered on
	hoverGlow(block){}

	render() {
		return(
			<div className="card">
				<ul class="list-group list-group-flush">
					<li class="list-group-item p-0 m-0">{this.state.day.charAt(0)}</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">30mins</li>
					<li class="list-group-item p-0 m-0">
						30mins
					</li>
				</ul>
			</div>
		)
	}
}
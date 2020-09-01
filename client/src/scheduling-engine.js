import {exportjust001, exportcpsc213, exportcpsc213a} from "./example-courses.js";
import {wl1, wl2, wl3} from "./example-results.js";
// import("./example-courses.js")
// 	.then((module) => {
// 	const database = module;
// 	});

const fakeResults = [
	[wl1, wl2, wl3],
	[wl2, wl2, wl2],
	[wl1],
	["invalid lol"]
];

// INPUT: 
// UserRequest = { 
// 		settings: {
// 		}, 
// 		courses: [
// 			{},
// 			{},
// 			{}
// 		], 
// 		customs: [
// 		]
// 	}
//
// OUTPUT: 
// Array of Result (a Result is a "base" with a list of add-ons, one per variation)

export default function generateResults(userRequest) {
	if(isRequestBad(userRequest.inputCourses, userRequest.settings)) {
		return(console.error("Engine couldn't find any results."));
	} else {
		
		let results = fakeResults
		console.log("*********************************************************************");
		console.log("*********************************************************************");
		console.log("here arer you results madam:")
		console.log(results)
		console.log("*********************************************************************");
		console.log("*********************************************************************");
		return results;
	}
}



function isRequestBad(courses, settings){
	// if(settings.minAtOnce !== undefined && minAtOnce > courses.length) {
		// console.error("Your minimum course boundary is set too high. Add more courses or decrease the minimum.")
		return true;
	// }
}

// Determines possible combinations of courses * semesters
// OUTPUT: arrangedRequests = [[inputCourse], [inputCourse], ...]
function generateArrangements(requestedCourses, minAtOnce, maxAtOnce) {
	let arrangements = [];

	// Base arrangement
	requestedCourses.forEach((rc) => {
		if (typeof rc.mustBeTerm === "string") {
			arrangeCourse(rc, arrangements)
		}
	})
	
	return arrangements;
}

function arrangeCourse(courseName, arrangement){

}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// DATABASE FUNCTIONS //////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const database = [exportjust001, exportcpsc213, exportcpsc213a]

function retrieveCourse(name) {
	for(let i = 0; i < database.length; i++) {
		if (database[i].id === name) {return database[i];}
	}
	console.error("retrieveCourses couldn't find ", name, " in the database");
	return false;
}

//OUTPUT: CourseSemester or [CourseSemester]
function retrieveCourseSemesters(course, mustBeTerm) {

}

//OUTPUT: CourseSection or [CourseSection]
function retrieveSpecificSections(name, mustBeTerm, sections) {
}



// class dayBlockSet{
// 	constructor() {
// 		this.sunday = false;
// 		this.monday = false;
// 		this.tuesday = false;
// 		this.wednesday = false;
// 		this.thursday = false;
// 		this.friday = false;
// 		this.saturday = false;
// 	}
// 	}
	
// 	class dayBools{
// 	constructor() {
// 		this.sunday = false;
// 		this.monday = false;
// 		this.tuesday = false;
// 		this.wednesday = false;
// 		this.thursday = false;
// 		this.friday = false;
// 		this.saturday = false;
// 	}
// 	}
	
// 	let monWedFri = new dayBlockSet();
// 	monWedFri.sunday= false;
// 	monWedFri.monday= [{}];
// 	monWedFri.tuesday= false;
// 	monWedFri.wednesday= [{}];
// 	monWedFri.thursday= false;
// 	monWedFri.friday= [{"g": "whatg"}];
// 	monWedFri.saturday= false;
	
	
// 	let tueThuFri = new dayBlockSet();
// 	tueThuFri.sunday= false;
// 	tueThuFri.monday= false;
// 	tueThuFri.tuesday= [{}];
// 	tueThuFri.wednesday= false;
// 	tueThuFri.thursday= [{}];
// 	tueThuFri.friday= [{"e": "what"}];
// 	tueThuFri.saturday= false;
	
	
// 	function daywiseAnd(set1, set2) {
// 	result = new dayBools();
// 	result.sunday = set1.sunday && set2.sunday;
// 	result.monday = set1.monday && set2.monday;
// 	result.tuesday = set1.tuesday && set2.tuesday;
// 	result.wednesday = set1.wednesday && set2.wednesday;
// 	result.thursday = set1.thursday && set2.thursday;
// 	result.friday = set1.friday && set2.friday;
// 	result.saturday = set1.saturday && set2.saturday;
	
// 	return result;
// 	}
	
	
// 	console.log(daywiseAnd(monWedFri, tueThuFri));
	
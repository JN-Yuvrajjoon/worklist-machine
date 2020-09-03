import {exportjust001, exportcpsc213, exportcpsc213a} from "./example-courses.js";
import {wl1, wl2, wl3} from "./example-results.js";

const fakeResults = [
	[wl1, wl2, wl3],
	[wl2, wl2, wl2],
	[wl1],
	["invalid lol"]
];

// INPUT: 
// UserRequest
// 		All courses are formatted, with non-empty names, with no duplicate names
//
// OUTPUT: 
// [Result], or Failure = {databaseErrors: [], schedulingError: ""}
export default function generateResults(userRequest) {
	
	if(false) {
		return(console.error("Engine couldn't find any results."));
	} else {
		let results = fakeResults;

		let customBlockSet = customsToBlockSet(userRequest.customs)
		if (customBlockSet === false) {
			return {schedulingError: "There was a problem with your custom blocks."}
		}
		makeResult(customBlockSet, null)

		console.log("*********************************************************************");
		console.log("*********************************************************************");
		console.log("here arer you results madam:")
		console.log(results)
		console.log("*********************************************************************");
		console.log("*********************************************************************");
		return fakeResults;
	}
}

// customBlock[] -> dayBlockSet[] or false
function customsToBlockSet(customBlocks) {
	//blockSet.reduce(combineBlockSets)
}

function makeResult(blockSet, solvableNeeds) {}

//(string, string) => [SolvableNeed]
function getSolvableNeeds(courseSemester) {
	let solvableNeeds = [];
	courseSemester.requiredActivities.forEach((ra)=>{
		solvableNeeds.push({
			activity: ra.name, 
			solutions: ra.solutions, 
			waitlist: ra.waitlist, 
			tiedTo: false})
		})
	return solvableNeeds;
}


// (DayBlockSet, DayBlockSet) => DayBlockSet or false
function combineBlockSets(smallSet, largeSet){
	let result = {};
}

// Block[]s are ORDERED
// ([], Block, Block[]) => Block[]
function insertBlock(earlier, block, blocks) {
	if (earlier.length > 0 && block.startTime < earlier[earlier.length-1].endTime) {
		return false;
	} else {
		if(block.endTime <= blocks[0].startTime) {
			return [...earlier, block, ...blocks]
		} else {
			return insertBlock([...earlier, blocks[0]], block, blocks.slice(1))
		}
	}
}

// (Block, Block) => boolean
function compareBlocks(block1, block2){
	return (block1.startTime > block2.endTime && block2.startTime > block1.endTime);
}

function groupCourses(parsedCourses){
	let sorted = {
		specSection: [],
		specSemester: [],
		unspec: []
	};
	parsedCourses.forEach(
		(pc) => {
			console.log(pc)
			if (pc.mustBeSection !== false) {
				if (pc.mustBeSemester !== false){
					
					sorted.specSection.push(pc)
				}
			} else if (pc.mustBeSemester !== false){
				sorted.specSemester.push(pc)
			} else {
				sorted.unspec.push(pc)
			}
		}
	);
	return sorted;
}

// INPUT:  
// courseRequest
//
// OUTPUT: 
// errors: [{index: number, message: string}]
//
// Searches database for each inputCourse to verify that they exist and have sections
function askDatabase(courseRequest) {
	// Navigate to correct database using school, campus, session (globalSettings)
	let notFound = [];
	
	courseRequest.specSection.forEach(yep=>yep);
	courseRequest.semiSpecSection.forEach(yep=>yep);
	courseRequest.specSemester.forEach(yep=>yep);
	courseRequest.semiSpecSemester.forEach(yep=>yep);
	courseRequest.unspec.forEach(yep=>yep);

	// inputCourses.forEach(function(ic){
	// 	let found_TODO = true;

	// 	let foundCourse = found_TODO;
	// 	let foundCourseSemester = (ic.mustBeSemester === false || found_TODO);
	// 	let foundCourseSection = (ic.mustBeSection === [] || found_TODO);
		
	// 	if(!foundCourse){
	// 		notFound.push({
	// 			index: ic.id,
	// 			message: (`Could not find course ${ic.name}`)
	// 		})
	// 	} else if(!foundCourseSemester) {
	// 		notFound.push({
	// 			index: ic.id,
	// 			message: (`Found ${ic.name}, but could not find ${ic.name} in ${ic.mustBeSemester}`)
	// 		})
	// 	} else if(!foundCourseSection) {
	// 		notFound.push({
	// 			index: ic.id,
	// 			message: (`Found ${ic.name}, but could not find all of the specified sections.`)
	// 		})
	// 	}
	// })
	return notFound;
}

function groupBy(objectArray, property) {
	return objectArray.reduce(function (acc, obj) {
		let key = obj[property]
		if (!acc[key]) {
			acc[key] = []
		}
		acc[key].push(obj)
		return acc
	},{})
  }

function arrangeCourse(courseName, arrangement){}
function addSection(section, schedule){
	// For each blockset in the section, combine it with the relevant schedule blockset
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// DATABASE FUNCTIONS //////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const database = [exportjust001, exportcpsc213, exportcpsc213a]

// string =DATABASE=> Course or false
function retrieveCourse(courseId) {
	for(let i = 0; i < database.length; i++) {
		if (database[i].id === courseId) {return database[i];}
	}
	console.error("retrieveCourses couldn't find ", courseId, " in the database");
	return false;
}

// string =DATABASE=> [string] or (rarely) false
function retrieveSemestersOf(courseId) {}

// (string, string) =DATABASE=> CourseSemester or false
function retrieveCourseSemester(courseId, semesterId) {}

// (string, string? string) =DATABASE=> CourseSection or false
function retrieveCourseSection(courseId, semesterId, sectionId) {
	if(semesterId) {} else {}
}

	
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
	
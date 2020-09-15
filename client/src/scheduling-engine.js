import {exportjust001, exportcpsc213, exportcpsc213a} from "./example-courses.js";

const emptyBlockSet = {
	standardBlock: false,

	sunday: false,
	monday: false,
	tuesday: false,
	wednesday: false,
	thursday: false,
	friday: false,
	saturday: false,

	semester: "1",
	subsetStartDate: false,
	subsetEndDate: false,
}

// INPUT: 
// UserRequest
// 		All courses are formatted, with non-empty names, with no duplicate names
//
// OUTPUT: 
// [Result],
// or { databaseErrors: [] },
// or { schedulingError: "" }

/** Generates schedules according to UserRequest, or fails
 * 
 * @param {UserRequest} userRequest user input object
 * @param {InputCustoms[]} userRequest.customs user's custom blocks
 * @param {InputCourse[]} userRequest.courses user's requested courses
 * 
 * @returns {Result[] | Object} results, or error
 */
export default function generateResults(userRequest) {
	// STEP 1: CustomBlock[] => DayBlockSet[]
	// FIXME: Currently only returns empty blockset
	let customBlockSets = customsToBlockSets(userRequest.customs);
	if (customBlockSets === false) {
		return {schedulingError: "There was a problem with your custom blocks."}
	}
	// STEP 2: Verify input courses, semesters, sections exist
	// FIXME: No DB connection
	let courseRequest = verifyCourses(userRequest.courses);
	if (Array.isArray(courseRequest)) {
		console.log("SE is returning database errors");
		return {databaseErrors: courseRequest};
	}
	console.log("here's courserequest:", courseRequest)
	// STEP 3: Create results using specific sections, if any
	// FIXME: No DB connection
	// TODO: current
	let initialResults = [
		{
		base: customBlockSets,
		variations: [],
		//courseRequest: courseRequest, // do we need this?
		satisfiedNeeds: [],
		solvableNeeds: []
		}
	]
	let bases = generateBaseResults(initialResults, courseRequest.specSection);
	console.log("bases here:", bases);
	// STEP 4: Multiplies each base by its possible arrangements
	// TODO:
	let solvables = bases.flatMap((b)=>generateArrangements(b, courseRequest.specSemester, courseRequest.unspec));
		// let solvables = bases.reduce((result, base) => {
		// 	let arrangedBase = generateArrangements(base, courseRequest.specSemester, courseRequest.unspec);
		// 	return arrangedBase ? result.concat(arrangedBase) : result, []
		// });
	console.log("solvables here:", solvables);
	// STEP 5: Make many results from each base
	// TODO:
	// solvables = solvables.map((s) => partialSolve(s));

	// STEP 6: Fill out the variations of each result
	// TODO:
	// solvables = fillVariations(solvables);
	
	// Output
	let __________test__________ = 
	combineBlockSets(exportcpsc213.singleSemesters[0].sections[2].dayBlocks, emptyBlockSet);

	console.log("*********************************************************************");
	console.log("*********************************************************************");
	console.log("here arer you results madam:");
	console.log(__________test__________);
	console.log("*********************************************************************");
	console.log("*********************************************************************");
	return [];
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// HIGH-LEVEL FUNCTIONS ////////////////////////////////////////////////////////// HIGH-LEVEL FUNCTIONS /////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CustomBlock[] => DayBlockSet[] or false
function customsToBlockSets(customBlocks) {
	console.info("Function customsToBlockSet(customBlocks)  was called!")
	//blockSet.reduce(combineBlockSets)
	let result1 = emptyBlockSet;
	let result2 = emptyBlockSet;
	result1.semester = "1";
	result2.semester = "2";
	return [result1, result2];
}

// ParsedCourse[] => CourseRequest, or DatabaseError[]
function verifyCourses(parsedCourses){
	console.info("Function verifyCourses(parsedCourses) was called!")
	let badCourses = [];
	let sorted = {
		specSection: [], 
		specSemester: [], 
		unspec: [] 
	};
	parsedCourses.forEach((pc) => {
		let course = retrieveCourse(pc.name);
		if (!course) {
			badCourses.push({index: pc.id, message: (`Could not find course ${pc.name}`)})
		} else {
			if (pc.mustBeSection) {
				let badSections = [];
				// if (pc.mustBeSemester){ //TODO: search with semesters
				// 	pc.mustBeSection.forEach((sec) => { 
				// 		if (!courseSectionExists(sec, false, pc.name)) { badSections.push(sec); }
				// 	})
				// } else {
					pc.mustBeSection.forEach((sec) => {
						if (!courseSectionExists(sec, false, pc.name)) { badSections.push(sec); }
					})
				// }
				if (badSections.length === 0) {sorted.specSection.push(pc)} else {badCourses.push(`Found ${pc.name}, but could not find all of the specified sections: ${badSections}`)}
			} else if (pc.mustBeSemester) {
				let badSemesters = [];
				pc.mustBeSemester.forEach((sem) => {
					if (!courseSemesterExists(sem, pc.name)) { badSemesters.push(sem); }
				})
				if (badSemesters.length === 0) {sorted.specSemester.push(pc)} else {badCourses.push(`Found ${pc.name}, but could not find ${pc.name} in ${badSemesters}`)}
			} else {
				sorted.unspec.push(pc)
			}
		}
	});
	return badCourses.length > 0? badCourses : sorted;
}

// Result[], parsedCourse[] => Result[] or false
function generateBaseResults(currentResults, toAdd){
	console.info("Function generateBaseResults(customBlockSet, sectionCourses) was called!")
	if (toAdd.length === 0) {
		return currentResults;
	} else {
		return generateBaseResults(sectionsOnResults(currentResults, toAdd[0]), toAdd.slice(1));
	}

	// Result[], inputCourse => Result[]
	function sectionsOnResults(results, course) {
		if (!results) {
			return false;
		} else {
			let newResults = [];
			results.forEach((r)=>{
				course.mustBeSection.forEach((sec)=>{
					let test = addSection(retrieveSection(sec, false, course.name), r)
					if (test) {newResults.push(test);}
				})
			})
			return newResults;
		}
	}
	function insertSection(result, courseId, sectionId) {
		return result;
	}
}

// Result, parsedCourse[], parsedCourse[] => Result[]
function generateArrangements(baseResult, specSemCourses, unspecCourses){
	console.info("Function generateArrangements(baseResult, semesterCourses, unspecCourses) was called!")
	let results = [baseResult]

	specSemCourses.forEach((sc)=>{
		sc.mustBeSemester.forEach((sem)=>{
			retrieveSolvableNeedsOf(sem, sc.name)
		});
	});
	unspecCourses.forEach(()=>{});
	//retrieveSolvableNeedsOf
	return results;
}

// Result[] => Result[]
function partialSolve(solvables){
	console.info("Function partialSolve(solvables) was called!")
	// solvables.forEach((s)=>{
	// 	s.solvableNeeds.forEach(()=>{
	// 		// fulfil the sn here
	//		// must check for the switch to variations
	// 	})
	// })
	return solvables;
}

// Result with a few complex solvableNeeds => Result (Solution)
function fillVariations(result){
	console.info("Function fillVariations(result){ was called!")
}	



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SCHEDULING TOOLBOX //////////////////////////////////////////////////////////// SCHEDULING TOOLBOX //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Section
function addSection(section, result){
	console.info("Function addSection(section, result) was called!")
	// let test = combineSchedules([section.dayBlocks], result.base)
	// return ({
	// 	base: test,
	// 	variations: result.variations,
	// 	//solvableNeeds: result.solvableNeeds.slice(1)
	// })
	// For each blockset in the section, combine it with the relevant schedule blockset
}

// for debugging purposes
function dispose(thing, reason) {
	console.info("Function dispose(thing, reason)  was called!")
	console.log(thing, "was thrown out because", reason)
}
	
function arrangeCourse(courseName, arrangement){
	console.info("Function arrangeCourse(courseName, arrangement){ was called!")
}

function makeResult(base, variations, initialNeeds, satisfied, solvableNeeds, expectedBranches) {
	console.info("Function makeResult(base, variations, initialNeeds, satisfied, solvableNeeds, expectedBranches) { was called!")
}

// DayBlockSet[], DayBlockSet[] => DayBlockSet[] or false
function combineSchedules(schedule1, schedule2){
	console.info("Function combineSchedules(schedule1, schedule2) was called!")
	let result = schedule2;
	schedule1.forEach((dbs1)=>{
		let target = result.findIndex((dbs2)=>{return dbs1.semester === dbs2.semester})
		if (target > -1) {
			result[target] = combineBlockSets(dbs1, result[target])
		} else {
			result.push(dbs1)
		}
	})
}

// (DayBlockSet, DayBlockSet) => DayBlockSet or false
// smallSet will usually have single blocks, and may have a standard block
function combineBlockSets(smallSet, largeSet){
	console.info("Function combineBlockSets(smallSet, largeSet) was called!")
	let result = largeSet;
	let smallStandard = smallSet.standardBlock;
	["sunday","monday","tuesday","thursday","friday","saturday"]
		.filter(day => smallSet[day])
		.forEach((day)=>{
			let combined = combineDays(
				(smallStandard || smallSet[day]), 
				(largeSet[day] || [])
			)
			if (combined) {
				result[day] = combined
			} else {
				return false;
			}
		})
	return result;
}

// (Block, Block[]) => Block[] or false
// (Block[], Block[]) => Block[] or false
function combineDays(smallDay, largeDay){
	console.info("Function combineDays(smallDay, largeDay) was called!")
	if (typeof smallDay === "object") {
		return (insertBlock([], smallDay, largeDay))
	} else {
		let result = largeDay
		smallDay.forEach((block)=>{insertBlock([], block, result)})
		return result;
	}
}

// Block[]s are ORDERED
// ([], Block, Block[]) => Block[] or false
function insertBlock(earlier, block, blocks) {
	console.info("Function insertBlock(earlier, block, blocks)  was called!")
	if (earlier.length > 0 && block.startTime < earlier[earlier.length-1].endTime) {
		return false;
	} else {
		if (blocks.length === 0 || block.endTime <= blocks[0].startTime) {
			return [...earlier, block, ...blocks]
		} else {
			return insertBlock([...earlier, blocks[0]], block, blocks.slice(1))
		}
	}
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// DATABASE FUNCTIONS //////////////////////////////////////////////////////////// DATABASE FUNCTIONS //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const database = [exportjust001, exportcpsc213, exportcpsc213a]

//TODO: Refactor to be efficient; don't involve the actual course data if you can
function courseExists(courseId){return true && retrieveCourse(courseId)}
function courseSemesterExists(courseId, semesterId){return true && retrieveCourseSemester(courseId, semesterId)}
function courseSectionExists(courseId, semesterId, sectionId){return true && retrieveSection(courseId, semesterId, sectionId)}

// string =DATABASE=> Course or false
function retrieveCourse(courseId) {
	return database.find((course) => course.id === courseId) || false;
	// for(let i = 0; i < database.length; i++) {
	// 	if (database[i].id === courseId) {return database[i];}
	// }
	// console.error("retrieveCourses couldn't find ", courseId, " in the database");
	// return false;
}

// (string, string) =DATABASE=> CourseSemester or false
function retrieveCourseSemester(semesterId, courseId) {
	try {
		return (
			retrieveCourse(courseId).singleSemesters.find(sem => sem.id === semesterId)
			|| retrieveCourse(courseId).otherSemesters.find(sem => sem.id === semesterId)
			|| false
		);
	} catch(e) {
		console.log("Couldn't retrieve the specified course: ", courseId);
		return false;
	}
}

// (string, string? string) =DATABASE=> CourseSection or false
function retrieveSection(sectionId, semesterId, courseId) {
	try{
		if (semesterId) {
			return (
				retrieveCourseSemester(semesterId, courseId).sections.find(sec => sec.id === sectionId) 
				|| false
			);
		} else {
			return retrieveSemestersOf(courseId).reduce(
				(found, semId)=> {
					return (found || retrieveSection(sectionId, semId, courseId))//retrieveCourseSemester(semId, courseId).sections.find(sec => sec.id === sectionId) 
				}, false
			)
		}
	} catch(e) {
		console.log("Couldn't retrieve the specified course or semester");
		return false;
	}
}

// string =DATABASE=> [string] or (rarely) false
function retrieveSemestersOf(courseId) {
	try {
		return retrieveSingleSemestersOf(courseId).concat(retrieveOtherSemestersOf(courseId));
	} catch(e) {
		console.log("Couldn't retrieve the specified course: ", courseId);
		return false;
	}
}

function retrieveSingleSemestersOf(courseId) {
	try {
		return retrieveCourse(courseId).singleSemesters.map(sem => sem.id);
	} catch(e) {
		console.log("Couldn't retrieve the specified course: ", courseId);
		return false;
	}
}

function retrieveOtherSemestersOf(courseId) {
	try {
		return retrieveCourse(courseId).otherSemesters.map(sem => sem.id);
	} catch(e) {
		console.log("Couldn't retrieve the specified course: ", courseId);
		return false;
	}
}

// TODO: The map is currently unnecessary
// string =DATABASE=> [SolvableNeed] (typical length = 1 or 2)
function retrieveSolvableNeedsOf(semesterId, courseId) {
	return retrieveCourseSemester(semesterId, courseId).requiredActivities.map(ra=>{ 
		return {
			activity: ra.activity, 
			solutions: ra.solutions, 
			tiedTo: ra.tiedTo
		}
	})
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// TYPE DEFINITIONS ////////////////////////////////////////////////////////////// TYPE DEFINITIONS ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {Object} UserRequest
 * @property {InputCustom[]} customs
 * @property {InputCourse[]} courses
 * @property {Object} settings
	* @property {string[]} settings.schools from database
	* @property {string[]} settings.campuses from school's info
	* @property {string[]} settings.sessions from school's info or school campus's info
	* @property {string} settings.school
	* @property {string} settings.campus
	* @property {string} settings.session
	* @property {string | false} settings.maxParallelCourses
	* @property {string | false} settings.maxConsecutiveHours
	* @property {string} settings.preferredTime
	* @property {boolean} settings.reduceGaps
	* @property {boolean} settings.reduceDays
	* @property {boolean} settings.increaseConsistency
	* @todo add more!
	* @todo (maybe) school, campus, and session may be stored as a number
 */

 /**
 * @typedef {Object} InputCustom
 * @property {string} name
 * @todo
 * 
 * @todo (maybe) creation of custom DayBlockSets can happen within the state of the CoursesMenu
 */

/**
 * @typedef {Object} InputCourse
 * @property {string} name
 * @property {string[] | false} mustBeSemester
 * @property {string[] | false} mustBeSection
 */

/**
 * @typedef {Object} Block
 * @property {number} startTime
 * @property {number} endTime
 * @property {number} alternating
 * @property {false | string} subsetSectionActivities
 * @property {string} location
 * @property {string} prof
 * @property {string | undefined} renderName
 */

 /**
 * @typedef {Object} DayBlockSet
 * @property {Block | false} standardBlock
 * @property {Block | Block[] | false} sunday
 * @property {Block | Block[] | false} monday
 * @property {Block | Block[] | false} tuesday
 * @property {Block | Block[] | false} wednesday
 * @property {Block | Block[] | false} thursday
 * @property {Block | Block[] | false} friday
 * @property {Block | Block[] | false} saturday
 * @property {string} semester
 * @property {Date | false} subsetStartDate
 * @property {Date | false} subsetEndDate
 */

 /**
 * @typedef {Object} CourseSection
 */

 /**
 * @typedef {Object} CourseSemester
 */

 /**
 * @typedef {Object} Course
 */
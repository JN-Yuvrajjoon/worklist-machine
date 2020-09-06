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

	semester: false,
	subsetStartDate: false,
	subsetEndDate: false,
}

// INPUT: 
// UserRequest
// 		All courses are formatted, with non-empty names, with no duplicate names
//
// OUTPUT: 
// [Result], or Failure = {databaseErrors: [], schedulingError: ""}
export default function generateResults(userRequest) {
	let customBlockSet = customsToBlockSet(userRequest.customs);
	if (customBlockSet === false) {
		return {schedulingError: "There was a problem with your custom blocks."}
	}
	
	let courseRequest = verifyCourses(userRequest.courses);
	if (Array.isArray(courseRequest)) {
		console.log("SE is returning database errors")
		return {databaseErrors: courseRequest};
	}

	let bases = generateBaseResults(customBlockSet, courseRequest.specSection)
	let solvables = bases.forEach((b)=>generateArrangements(b, courseRequest.specSemester, courseRequest.unspec))
	let results = partialSolve(solvables)
	
	let __________test__________ = 
	combineBlockSets(exportcpsc213.singleSemesters[0].sections[2].dayBlocks,emptyBlockSet);

	console.log("*********************************************************************");
	console.log("*********************************************************************");
	console.log("here arer you results madam:")
	console.log(__________test__________)
	console.log(retrieveSection("101", false, "JUST001"))
	console.log("*********************************************************************");
	console.log("*********************************************************************");
	return [];
}

// TODO: Implement
// CustomBlock[] => DayBlockSet[] or false
function customsToBlockSet(customBlocks) {
	console.log("-----------------customsToBlockSet(customBlocks)  was called!")
	//blockSet.reduce(combineBlockSets)
	let result1 = emptyBlockSet;
	let result2 = emptyBlockSet;
	result1.semester = "1";
	result2.semester = "2";
	return [result1, result2];
}

// ParsedCourse[] => CourseRequest, or DatabaseError[]
// because if i'm iterating thru them, why not sort them too
function verifyCourses(parsedCourses){
	console.log("-----------------verifyCourses(parsedCourses) was called!")
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

// DayBlockSet[], parsedCourse[] => Result[]
function generateBaseResults(customBlockSet, sectionCourses){
	console.log("-----------------generateBaseResults(customBlockSet, sectionCourses) was called!")
	return []
}

// Result, parsedCourse[], parsedCourse[] => Result[]
function generateArrangements(baseResult, semesterCourses, unspecCourses){
	console.log("-----------------generateArrangements(baseResult, semesterCourses, unspecCourses) was called!")
	return []
}

// Result[] => Result[]
function partialSolve(solvables){
	console.log("-----------------partialSolve(solvables) was called!")
	return []
}

function dispose(thing, reason) {
	console.log("-----------------dispose(thing, reason)  was called!")
	console.log(thing, "was thrown out because", reason)
}

//(string, string) => [SolvableNeed]
function getSolvableNeeds(courseSemester) {
	console.log("-----------------getSolvableNeeds(courseSemester)  was called!")
	let solvableNeeds = [];
	courseSemester.requiredActivities.forEach((ra)=>{
		solvableNeeds.push({
			activity: ra.name, 
			solutions: ra.solutions, 
			waitlist: ra.waitlist, 
			tiedTo: false
		});
	});
	return solvableNeeds;
}
	
function arrangeCourse(courseName, arrangement){
	console.log("-----------------arrangeCourse(courseName, arrangement){ was called!")
}

function makeResult(base, variations, initialNeeds, satisfied, solvableNeeds, expectedBranches) {
	console.log("-----------------makeResult(base, variations, initialNeeds, satisfied, solvableNeeds, expectedBranches) { was called!")
}

// Result with a few complex solvableNeeds => Result with many variations
function fillVariations(result){
	console.log("-----------------fillVariations(result){ was called!")
}	

function addSection(section, result){
	console.log("-----------------addSection(section, result) was called!")
	// For each blockset in the section, combine it with the relevant schedule blockset
}

// DayBlockSet[], DayBlockSet[] => DayBlockSet[] or false
function combineSchedules(schedule1, schedule2){
	console.log("-----------------combineSchedules(schedule1, schedule2) was called!")
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
	console.log("-----------------combineBlockSets(smallSet, largeSet) was called!")
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
	console.log("-----------------combineDays(smallDay, largeDay) was called!")
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
	console.log("-----------------insertBlock(earlier, block, blocks)  was called!")
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

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// DATABASE FUNCTIONS //////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const database = [exportjust001, exportcpsc213, exportcpsc213a]

//TODO: Refactor to be efficient; don't involve the actual course data if you can
function courseExists(courseId){return true && retrieveCourse(courseId)}
function courseSemesterExists(courseId, semesterId){return true && retrieveCourseSemester(courseId, semesterId)}
function courseSectionExists(courseId, semesterId, sectionId){return true && retrieveSection(courseId, semesterId, sectionId)}

// string =DATABASE=> Course or false
function retrieveCourse(courseId) {
	console.log(courseId)
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
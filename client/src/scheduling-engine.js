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
	
	if(false) {
		return(console.error("Engine couldn't find any results."));
	} else {
		let results = combineBlockSets(exportcpsc213.singleSemesters[0].sections[2].dayBlocks,emptyBlockSet);

		let customBlockSet = customsToBlockSet(userRequest.customs)
		if (customBlockSet === false) {
			return {schedulingError: "There was a problem with your custom blocks."}
		}
		makeResult(customBlockSet, null)

		console.log("*********************************************************************");
		console.log("*********************************************************************");
		console.log("here arer you results madam:")
		console.log(results)
		console.log(retrieveSection("101", false, "JUST001"))
		console.log("*********************************************************************");
		console.log("*********************************************************************");
		return [];
	}
}

// CustomBlock[] -> DayBlockSet[] or false
function customsToBlockSet(customBlocks) {
	//blockSet.reduce(combineBlockSets)
	return [emptyBlockSet];
}

// ParsedCourse[] -> CourseRequest, or DatabaseError[]
// because if i'm iterating thru them, why not sort them too
function verifyCourses(parsedCourses){
	let sorted = {
		specSection: [],
		// semiSpecSection: [],
		specSemester: [],
		// semiSpecSemester: [],
		unspec: []
	};
	
	let notFound = [];
	parsedCourses.forEach((pc) => {
		console.log(pc)
		if (pc.mustBeSection !== false) {
			if (pc.mustBeSemester !== false){
			} else {
				pc.mustBeSection.forEach((sec) =>{
					if(courseSectionExists(sec, false, pc.name)){
						// sorted.specSection.push()
					}
				})
			}
			sorted.specSection.push(pc)
		} else if (pc.mustBeSemester !== false){
			sorted.specSemester.push(pc)
		} else {
			sorted.unspec.push(pc)
		}
	});

	// if(!foundCourse){
	// 	notFound.push({
	// 		index: pc.id,
	// 		message: (`Could not find course ${pc.name}`)
	// 	})
	// } else if(!foundCourseSemester) {
	// 	notFound.push({
	// 		index: pc.id,
	// 		message: (`Found ${pc.name}, but could not find ${pc.name} in ${pc.mustBeSemester}`)
	// 	})
	// } else if(!foundCourseSection) {
	// 	notFound.push({
	// 		index: pc.id,
	// 		message: (`Found ${pc.name}, but could not find all of the specified sections.`)
	// 	})
	// }
	return notFound.length > 0? notFound : sorted;
}

//(string, string) => [SolvableNeed]
function getSolvableNeeds(courseSemester) {
	let solvableNeeds = [];
	courseSemester.requiredActivities.forEach((ra)=>{
		solvableNeeds.push({
			activity: ra.name, 
			solutions: ra.solutions, 
			waitlist: ra.waitlist, 
			tiedTo: false
		})
	})
	return solvableNeeds;
}
	
function arrangeCourse(courseName, arrangement){}

// (DayBlockSet[], SolvableNeed[]) -> Result
function makeResult(base, solvableNeeds) {}

function addSection(section, result){
	// For each blockset in the section, combine it with the relevant schedule blockset
}

// (DayBlockSet, DayBlockSet) => DayBlockSet or false
// smallSet will usually have single blocks, and may have a standard block
function combineBlockSets(smallSet, largeSet){
	let result = largeSet;
	let smallStandard = smallSet.standardBlock;
	["sunday","monday","tuesday","thursday","friday","saturday"]
		.filter(day => smallSet[day])
		.forEach((day)=>{
			let combined = combineDays(
				(smallStandard || smallSet[day]), 
				(largeSet[day] || [])
			)
			if(combined) {
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
	if (earlier.length > 0 && block.startTime < earlier[earlier.length-1].endTime) {
		return false;
	} else {
		if(blocks.length === 0 || block.endTime <= blocks[0].startTime) {
			return [...earlier, block, ...blocks]
		} else {
			return insertBlock([...earlier, blocks[0]], block, blocks.slice(1))
		}
	}
}

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
		if(semesterId) {
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
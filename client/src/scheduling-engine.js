// import { exportjust001, exportcpsc213, exportcpsc213a } from './example-courses.js';
import { postApi } from './api'

const emptyBlockSet = { standardBlock: false, sunday: false, monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, semester: undefined, subsetStartDate: false, subsetEndDate: false, };

/** 
 * 
 * @param {UserRequest} userRequest
 * @param {InputCustom[]} userRequest.customBlocks 
 * @param {InputCourse[]} userRequest.inputCourses
 * @param {Course[]} courses api courses
 * @returns {Result[] | Object} results
 * @throws errors lol
 */
export function generateResults(courses, userRequest) {
  /**
   * step 1: get list of ways to complete each course (not all activities are necessary)
   */
  let paths = courses.map(c => getCompletionPaths(c));
  console.log('1: paths', paths);

  /**
   * step 2: get ways to complete all courses
   */
  let arrangements = arrange(paths, userRequest.settings.maxParallelCourses);
  arrangements.forEach(arr => { arr.requirements.sort((r1, r2) => r1.sections.length - r2.sections.length) });
  // todo: if there are a LOT of arrangements, maybe ask user to pick a few
  console.log('2. arrangements', arrangements);

  /**
   * step 3: create schedules from each arrangement (first one for now)
   */
  // arrangements = [arrangements[0]];

  let scheds = arrangements.flatMap(a => solve([], 0, a)) // map if you want to keep them separate
  console.log(scheds);

  return scheds.map((s, idx) => ({
    info: {},
    dayBlockSets: s,
    variations: [],
    unscheduled : [],
  }))
  // {
  //   info: {},
  //   dayBlockSets: scheds.map((s, idx) => ({
  //     startDate: false,
  //     endDate: false,
  //     id: idx,
  //     dayBlocks: s[0],
  //   })),
  //   variations: []
  // }
  return [{
    info: {},
    base: [
      { id: "1", startDate: false, endDate: false, dayBlocks: emptyBlockSet },
      { id: "2", startDate: false, endDate: false, dayBlocks: emptyBlockSet },
      { id: "A", startDate: false, endDate: false, dayBlocks: emptyBlockSet },
      { id: "B", startDate: false, endDate: false, dayBlocks: emptyBlockSet }
    ],
    variations: [
      [
        { id: "1", startDate: false, endDate: false, dayBlocks: emptyBlockSet },
        { id: "2", startDate: false, endDate: false, dayBlocks: emptyBlockSet },
        { id: "A", startDate: false, endDate: false, dayBlocks: emptyBlockSet },
        { id: "B", startDate: false, endDate: false, dayBlocks: emptyBlockSet }
      ],
      [
        { id: "1", startDate: false, endDate: false, dayBlocks: emptyBlockSet },
        { id: "2", startDate: false, endDate: false, dayBlocks: emptyBlockSet },
        { id: "A", startDate: false, endDate: false, dayBlocks: emptyBlockSet },
        { id: "B", startDate: false, endDate: false, dayBlocks: emptyBlockSet }
      ]
    ],
    abnormalSections: []
  }];
}


// //TODO: returns basic sched
// // CustomBlock[] => DayBlockSet[] or false
// function customsToBlockSets(customBlocks) {
  // console.log("Function customsToBlockSet(customBlocks)  was called!");
//   //blockSet.reduce(combineBlockSets)
//   let result1 = emptyBlockSet;
//   let result2 = emptyBlockSet;
//   result1.semester = "1";
//   result2.semester = "2";
//   return [result1, result2];
// }

/**
 * @description For each course, get a list of ways to complete the course
 * @param {Course} courses
 * @returns {Requirement[][]} where ret[x] is maybe 1-2 activities needed to complete a course
 */
function getCompletionPaths(course, activities = ubcActivities) {
  /**
   *  sectionTree[term][activity] = Section[]
   */
  let sectionTree = course.sections.reduce((acc, s) => {
    acc[s.term] = acc[s.term] || {};
    (acc[s.term][s.activity] = acc[s.term][s.activity] || []).push(s);
    return acc;
  }, {});
  // console.log(sectionTree);

  // terrible lol
  // todo: use activitySpec tree
  // todo: maybe combine with the above block
  let paths = []; // Requirement[][]
  for (let term in sectionTree) { // term probably only has one path, unless dist. ed.
    const de = sectionTree[term]['Distance Education'];
    if (de) { paths.push([de]); }
    const lec = sectionTree[term]['Lecture'];
    const woc = sectionTree[term]['Web-Oriented Course'];
    const fl = sectionTree[term]['Flexible Learning'];
    const otherActivities = Object.keys(sectionTree[term])
      .filter(activity => (activity !== 'Distance Education') && (activity !== 'Waiting List') && (activity !== 'Lecture') && (activity !== 'Web-Oriented Course') && (activity !== 'Flexible Learning'))
      .map(activity => ({ course, activity, term, sections: sectionTree[term][activity] }));

    if (lec) { paths.push([{ activity: 'Lecture', course, term, sections: lec }].concat(otherActivities)) }
    if (woc) { paths.push([{ activity: 'Web-Oriented Course', course, term, sections: woc }].concat(otherActivities)) }
    if (fl) { paths.push([{ activity: 'Flexible Learning', course, term, sections: woc }].concat(otherActivities)) }
    if (!lec && !woc) { paths.push(otherActivities) }
  }
  // console.log(paths)
  return paths;
}

/**
 * @param {Requirement[][][]} coursePaths
 * @returns {Arrangement[]}
 */
function arrange(coursePaths, maxCoursesPerTerm = 5) {
  // apply each course to each arrangement
  return coursePaths.reduce((arrangements, course, idx, arr) => {
    if (idx === 0) {
      return course.map(path => ({
        requirements: path,
        terms: {
          [path[0]?.term]: 1,
          // should be safe unless there's a course with no completion path, which is dumb
        },
      }));
    }

    return arrangements.flatMap(a =>
      // apply each course path to an arrangement
      // this could be a regular .map, but flattening empty arrays makes filtering easier
      course.flatMap(path => (a.terms[path[0]?.term] || 0) >= maxCoursesPerTerm ? [] :
        [{
          requirements: a.requirements.concat(path),
          terms: {
            ...a.terms,
            [path[0].term]: (a.terms[path[0].term] || 0) + 1
          },
          // complexity: reduce path.sections.length * a.complexity
        }]
      )
    )
  }, []);
}

/**
 * @description apply one requirement to many worklists
 * @param {DayBlockSet[][]} worklists - accumulated from arrangement
 * @param {number} i - index of next req to look at in arrangement.requirements
 * @param {Arrangement} arrangement 
 * @returns {DayBlockSet[][]} 
 */
function solve(worklists, i, arrangement) {
  console.log(arrangement)
  console.log(worklists)
  if (i === arrangement.requirements.length) { console.log('base case, returning wls so far'); return worklists; }
  console.group('current requirement:',  arrangement.requirements[i])
  // if (arrangement.requirements.length - i <= arrangement.requirements.length / 4) { return variations(worklists, i + 1, arrangement); }
  
  // one section on each worklist, returns dbs[][]
  const newWorklists = (i === 0) ?
    arrangement.requirements[0].sections.map(sec => addSection([], sec))
    : arrangement.requirements[i].sections.flatMap((section, sec_idx) => {
      console.log('current section:', section.subject, section.course, '-', section.section);

      const worklistsPlusASection = worklists.flatMap(wl => {
        // console.log(wl[0], section.schedule)
        const newWl = addSection(wl, section);
        // console.log(newWl[0])
        return newWl ? [newWl] : [];
      })
      console.log(worklistsPlusASection)
      return(worklistsPlusASection)
    })
  console.groupEnd();
  return solve(newWorklists, i + 1, arrangement);
}

// function variations() { }

/**
 * @param {DayBlockSet[]} worklist 
 * @param {SectionInfo} section
 * @returns {DayBlockSet[]|false}
 */
export function addSection(worklist, section) {
  // console.log(worklist)
  // console.log(section.schedule)

  let ret = worklist.map(dbs => copyBlockSet(dbs));

  for (let sec_dbs of section.schedule) {

    let targetTerm = ret.findIndex(wl_dbs => wl_dbs.term === sec_dbs.term);
    if (targetTerm === -1) {
      ret.push(combineBlockSets({ term: sec_dbs.term }, sec_dbs, section));
      console.log('this should happen like twice')
    } else {
      ret[targetTerm] = combineBlockSets(ret[targetTerm], sec_dbs, section);
      if (!ret[targetTerm]) {
        return false;
      }
    }
  }
  // console.log(ret)
  return ret;
}

/**
 * @param {DayBlockSet} largeSet 
 * @param {DayBlockSet} smallSet 
 * @returns {DayBlockSet|false}
 */
function combineBlockSets(largeSet, smallSet, section) {
  let ret = copyBlockSet(largeSet);
  // console.log(largeSet)
  // console.log(smallSet)
  for (let day in smallSet) {
    if (!['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].find(i => i === day)) { continue; }
    let combined = combineDays(largeSet[day] || [], smallSet[day], section);
    // console.log(combined)
    if (!combined) { return false; }
    ret[day] = combined;
  }
  // console.log(ret)
  return ret;
}

/**
 * @param {Block[]} largeDay 
 * @param {Block[]} smallDay 
 * @returns {Block[]|false}
 */
function combineDays(largeDay, smallDay, section) {
  let ret = [...largeDay];
  for (let block of smallDay) {
    let fail = insertBlock(ret, block, section);
    if (fail) return false;
  }
  return ret;
}

/**
 * @param {Block[]} blocks - is modified
 * @param {Block} newBlock 
 * @returns {string} only on fail
 */
function insertBlock(blocks, newBlock, section) {
  for (let b of blocks) {
    if (newBlock.startTime <= b.endTime && b.startTime <= newBlock.endTime) {
      return 'yea';
    }
  }
  let target = blocks.findIndex(b => b.startTime > newBlock.startTime);
  if (target !== -1) {
    blocks.splice(target, 0, { ...newBlock, section });
  } else {
    blocks.push({ ...newBlock, section });
  }
}

function copyBlockSet(dbs) {
  return {
    ...dbs.sun && { sun: [...dbs.sun] },
    ...dbs.mon && { mon: [...dbs.mon] },
    ...dbs.tue && { tue: [...dbs.tue] },
    ...dbs.wed && { wed: [...dbs.wed] },
    ...dbs.thu && { thu: [...dbs.thu] },
    ...dbs.fri && { fri: [...dbs.fri] },
    ...dbs.sat && { sat: [...dbs.sat] },
    ...dbs.term && { term: dbs.term },
  }
}



  // console.log("Function getSectionOptions(parsedCourses) was called!");
//   let badCourses = [];
//   let sorted = {
//     specSection: [],
//     specSemester: [],
//     unspec: []
//   };
//   parsedCourses.forEach((pc) => {
//     let course = retrieveCourse(pc.name);
//     if (!course) {
//       badCourses.push({ index: pc.id, message: (`Could not find course ${pc.name}`) })
//     } else {
//       if (pc.mustBeSection) {
//         let badSections = [];
//         // if (pc.mustBeSemester){ //TODO: search with semesters
//         // 	pc.mustBeSection.forEach((sec) => { 
//         // 		if (!courseSectionExists(sec, false, pc.name)) { badSections.push(sec); }
//         // 	})
//         // } else {
//         pc.mustBeSection.forEach((sec) => {
//           if (!courseSectionExists(sec, false, pc.name)) { badSections.push(sec); }
//         })
//         // }
//         if (badSections.length === 0) { sorted.specSection.push(pc) } else { badCourses.push(`Found ${pc.name}, but could not find all of the specified sections: ${badSections}`) }
//       } else if (pc.mustBeSemester) {
//         let badSemesters = [];
//         pc.mustBeSemester.forEach((sem) => {
//           if (!courseSemesterExists(sem, pc.name)) { badSemesters.push(sem); }
//         })
//         if (badSemesters.length === 0) { sorted.specSemester.push(pc) } else { badCourses.push(`Found ${pc.name}, but could not find ${pc.name} in ${badSemesters}`) }
//       } else {
//         sorted.unspec.push(pc)
//       }
//     }
//   });
//   return badCourses.length > 0 ? badCourses : sorted;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// TYPE DEFINITIONS ////////////////////////////////////////////////////////////// TYPE DEFINITIONS ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {Object} UserRequest
 * @property {InputCustom[]} customs
 * @property {InputCourse[]} courses
 * @property {Object} settings
  * @property {string} settings.schools from database
  * @property {string} settings.campuses from school's info
  * @property {string} settings.sessions from school's info or school campus's info
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
 * @property {string[]?} mustBeSemester
 * @property {string[]?} mustBeSection
 */

// /**
//  * @typedef {Object} Block
//  * @property {number} startTime
//  * @property {number} endTime
//  * @property {number} alternating
//  * @property {false | string} subsetSectionActivities
//  * @property {string} location
//  * @property {string} prof
//  * @property {string | undefined} renderName
//  */

/**
* @typedef {Object} DayBlockSet
* @property {Block[]} [sun]
* @property {Block[]} [mon]
* @property {Block[]} [tue]
* @property {Block[]} [wed]
* @property {Block[]} [thu]
* @property {Block[]} [fri]
* @property {Block[]} [sat]
* @property {string} term
* @property {Date?} subsetStartDate
* @property {Date?} subsetEndDate
*/

/**
 * @typedef Arrangement
 * If you pick one from each Requirement, you have a full, although maybe time-conflicting, schedule.
 * If any requirement.sections is empty, the arrangement is doomed to fail.
 * @property {Requirement[]} requirements - generally, sort ascending requirements.sections.length
 * @property {Object} terms - kv pairs to intdicate # of courses per term
 */

/**
 * @typedef Requirement
 * "Pick any one to fill your needs."
 * sections: All are equivalent, and this is the exhaustive list of applicable (same term and activity, and not removed for some reason) sections.
 * @property {Course} course
 * @property {string} term
 * @property {string} activity
 * @property {Section[]} sections
 */

/**
 * @typedef Course
 * @property {string} name
 * @property {string} course
 * @property {string} title
 * @property {string} description
 * @property {number} credits
 * @property {string[]} comments
 * @property {string} endpoint
 * @property {string} link
 * @property {Date} lastUpdated
 * @property {SectionInfo[]} sections
 */

/**
 * @typedef SectionInfo
 * @property {string} status
 * @property {string} activity
 * @property {string} name
 * @property {string} subject
 * @property {string} course
 * @property {string} section
 * @property {string[]} textbooks
 * @property {string} prof
 * @property {string} term
 * @property {string} year
 * @//property {Block[]} schedule
 * @property {DayBlockSet[]} schedule
 * @property {number} total_seats_remaining
 * @property {number} currently_registered
 * @property {number} general_seats_remaining
 * @property {number} restricted_seats_remaining
 * @property {string[]} seats_reserved_for
 * @property {string} credits
 * @property {string} link
 * @property {number} lastUpdated
 */

/**
 * @typedef Block
 * @//property {string} day
 * @property {string} startTime
 * @property {string} endTime
 * @//property {string} term
 * @//property {string?} building
 * @//property {string?} room
 */


/**
 * @typedef {activitySpecGroup|activitySpecLeaf} activitySpec
 * @typedef {{or: activitySpec[]}|{and: activitySpec[]}} activitySpecGroup
 * @typedef {{activity: string}} activitySpecLeaf
 * @type {activitySpec}
 */

// the sections needed to complete a course
const ubcActivities = {
  or: [
    { activity: 'Distance Education' },
    {
      and: [
        {
          or: [
            { activity: 'Lecture' }, 
            { activity: 'Web-Oriented Course' },
            { activity: 'Flexible Learning' },
          ],
        },
        { activity: 'Laboratory' },
        { activity: 'Tutorial' },
        { activity: 'Seminar' },
        { activity: 'Discussion' },
        { activity: 'Thesis' },
        { activity: 'Directed Studies' },
        { activity: 'Practicum' },
        // everything else goes here for now
      ]
    }
  ],
}
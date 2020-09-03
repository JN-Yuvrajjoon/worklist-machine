const s1start = new Date(2020, 8, 8)
const s1end = new Date(2020, 11, 3)
const s2start = new Date(2020, 0, 4)
const s2end =  new Date(2020, 3, 8)

const cpsc213 = {
	id: "CPSC213",
	subject: "CPSC",
	courseNumber: "213",
	description: "",
	prereqs: "",
	dateAdded: "",

	hasNoSections: false,
	singleSemesters: [
		{
			id: "1",
			requiredActivities: [
				{
					activity: "Web-Oriented Course", 
					solutions: 2, 
					tiedTo: false
				},
				{
					activity: "Laboratory", 
					solutions: 2,
					tiedTo: false
				}
			],
			startDate: s1start,
			endDate: s1end,
			sections: [
			{
				id: "101",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Web-Oriented Course",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: true,
				standardBlock: {
					"location": "ICICS X260",
					"instructor": "prof. prof",
					"subsetSectionActivities": false,
					"startTime": 1400,
					"endTime": 1530,
					"alternating": 0
				},
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: false,
					tuesday: true,
					wednesday: false,
					thursday: true,
					friday: false,
					saturday: false
				}
			},
			{
				id: "102",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Web-Oriented Course",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: true,
				standardBlock: {
					"location": "ICICS X260",
					"instructor": "prof. prof",
					"subsetSectionActivities": false,
					"startTime": 1700,
					"endTime": 1830,
					"alternating": 0
					},
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: false,
					tuesday: true,
					wednesday: false,
					thursday: true,
					friday: false,
					saturday: false
				}
			},
			{
				id: "L1A",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Laboratory",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: false,
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: false,
					tuesday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 1530,
						"endTime": 1630,
						"alternating": 0
						},
					wednesday: false,
					thursday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 1530,
						"endTime": 1730,
						"alternating": 0
						},
					friday: false,
					saturday: false
				}
			},
			{
				id: "L1B",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Laboratory",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: false,
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: false,
					tuesday: false,
					wednesday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 1200,
						"endTime": 1300,
						"alternating": 0
						},
					thursday: false,
					friday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 1100,
						"endTime": 1300,
						"alternating": 0
						},
					saturday: false
				}
			}]
		},
		{
			id: "2",
			requiredActivities: [
				{
					activity: "Lecture", 
					solutions: 3, 
					tiedTo: false
				},
				{
					activity: "Laboratory", 
					solutions: 2,
					tiedTo: false
				}
			],
			startDate: s2start,
			endDate: s2end,
			sections: [
			{
				id: "203",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Lecture",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: true,
				standardBlock: {
					"location": "ICICS X260",
					"instructor": "prof. prof",
					"subsetSectionActivities": false,
					"startTime": 1300,
					"endTime": 1400,
					"alternating": 0
					},
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: true,
					tuesday: false,
					wednesday: true,
					thursday: false,
					friday: true,
					saturday: false
				}
			},
			{
				id: "204",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Lecture",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: true,
				standardBlock: {
					"location": "ICICS X260",
					"instructor": "prof. prof",
					"subsetSectionActivities": false,
					"startTime": 900,
					"endTime": 1000,
					"alternating": 0
					},
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: true,
					tuesday: false,
					wednesday: true,
					thursday: false,
					friday: true,
					saturday: false
				}
			},
			{
				id: "205",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Lecture",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: true,
				standardBlock: {
					"location": "ICICS X260",
					"instructor": "prof. prof",
					"subsetSectionActivities": false,
					"startTime": 1200,
					"endTime": 1300,
					"alternating": 0
					},
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: true,
					tuesday: false,
					wednesday: true,
					thursday: false,
					friday: true,
					saturday: false
				}
			},
			{
				id: "L2A",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Laboratory",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: false,
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 1000,
						"endTime": 1200,
						"alternating": 0
						},
					tuesday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 1400,
						"endTime": 1500,
						"alternating": 0
						},
					wednesday: false,
					thursday: false,
					friday: false,
					saturday: false
				}
			},
			{
				id: "L2B",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Laboratory",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: false,
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 1400,
						"endTime": 1500,
						"alternating": 0
						},
					tuesday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 900,
						"endTime": 1000,
						"alternating": 0
						},
					wednesday: false,
					thursday: false,
					friday: false,
					saturday: false
				}
			}]
		}
	],
	otherSemesters: []
}

const cpsc213a = {
	id: "CPSC213A",
	subject: "CPSC",
	courseNumber: "213A",
	description: "",
	prereqs: "",
	dateAdded: "",

	hasNoSections: false,
	singleSemesters: [
		{
			id: "1",
			requiredActivities: [
				{
					activity: "Web-Oriented Course", 
					solutions: 2, 
					tiedTo: false
				},
				{
					activity: "Laboratory", 
					solutions: 2,
					tiedTo: false
				}
			],
			startDate: s1start,
			endDate: s1end,
			sections: [
			{
				id: "101",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Web-Oriented Course",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: true,
				standardBlock: {
					"location": "ICICS X260",
					"instructor": "prof. prof",
					"subsetSectionActivities": false,
					"startTime": 1400,
					"endTime": 1530,
					"alternating": 0
				},
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: false,
					tuesday: true,
					wednesday: false,
					thursday: true,
					friday: false,
					saturday: false
				}
			},
			{
				id: "102",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Web-Oriented Course",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: true,
				standardBlock: {
					"location": "ICICS X260",
					"instructor": "prof. prof",
					"subsetSectionActivities": false,
					"startTime": 1700,
					"endTime": 1830,
					"alternating": 0
					},
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: false,
					tuesday: true,
					wednesday: false,
					thursday: true,
					friday: false,
					saturday: false
				}
			},
			{
				id: "L1A",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Laboratory",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: false,
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: false,
					tuesday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 1530,
						"endTime": 1630,
						"alternating": 0
						},
					wednesday: false,
					thursday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 1530,
						"endTime": 1730,
						"alternating": 0
						},
					friday: false,
					saturday: false
				}
			},
			{
				id: "L1B",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Laboratory",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: false,
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: false,
					tuesday: false,
					wednesday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 1200,
						"endTime": 1300,
						"alternating": 0
						},
					thursday: false,
					friday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 1100,
						"endTime": 1300,
						"alternating": 0
						},
					saturday: false
				}
			}]
		},
		{
			id: "2",
			requiredActivities: [
				{
					activity: "Lecture", 
					solutions: 3, 
					tiedTo: false
				},
				{
					activity: "Laboratory", 
					solutions: 2,
					tiedTo: false
				}
			],
			startDate: s2start,
			endDate: s2end,
			sections: [
			{
				id: "203",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Lecture",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: true,
				standardBlock: {
					"location": "ICICS X260",
					"instructor": "prof. prof",
					"subsetSectionActivities": false,
					"startTime": 1300,
					"endTime": 1400,
					"alternating": 0
					},
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: true,
					tuesday: false,
					wednesday: true,
					thursday: false,
					friday: true,
					saturday: false
				}
			},
			{
				id: "204",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Lecture",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: true,
				standardBlock: {
					"location": "ICICS X260",
					"instructor": "prof. prof",
					"subsetSectionActivities": false,
					"startTime": 900,
					"endTime": 1000,
					"alternating": 0
					},
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: true,
					tuesday: false,
					wednesday: true,
					thursday: false,
					friday: true,
					saturday: false
				}
			},
			{
				id: "205",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Lecture",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: true,
				standardBlock: {
					"location": "ICICS X260",
					"instructor": "prof. prof",
					"subsetSectionActivities": false,
					"startTime": 1200,
					"endTime": 1300,
					"alternating": 0
					},
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: true,
					tuesday: false,
					wednesday: true,
					thursday: false,
					friday: true,
					saturday: false
				}
			},
			{
				id: "L2A",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Laboratory",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: false,
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 1000,
						"endTime": 1200,
						"alternating": 0
						},
					tuesday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 1400,
						"endTime": 1500,
						"alternating": 0
						},
					wednesday: false,
					thursday: false,
					friday: false,
					saturday: false
				}
			},
			{
				id: "L2B",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities:"Laboratory",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: false,
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 1400,
						"endTime": 1500,
						"alternating": 0
						},
					tuesday: {
						"location": "ICICS X260",
						"instructor": "prof. prof",
						"subsetSectionActivities": false,
						"startTime": 900,
						"endTime": 1000,
						"alternating": 0
						},
					wednesday: false,
					thursday: false,
					friday: false,
					saturday: false
				}
			}]
		}
	],
	otherSemesters: []
}

const just001 = {
	id: "JUST001",
	subject: "JUST",
	courseNumber: "001",
	description: "To check what the engine does when there's only one section available",
	prereqs: "",
	dateAdded: "",

	hasNoSections: false,
	singleSemesters: [
		{
			id: "1",
			requiredActivities: [
				{
					activity: "Lecture", 
					solutions: 1, 
					tiedTo: false
				}
			],
			startDate: s1start,
			endDate: s1end,
			sections: [
			{
				id: "101",
				sectionComments: "This is the section's comments",

				sectionStatus: "",
				sectionRestrictions: "",

				hasNoBlocks: false,
				subsetCourseSemesterActivities: "Lecture",
				//subsetCourseSemesterStartDate: false,
				//subsetCourseSemesterEndDate: false,

				isStandard: true,
				standardBlock: {
					"location": "main mall",
					"instructor": "prof. prof",
					"subsetSectionActivities": false,
					"startTime": 800,
					"endTime": 900,
					"alternating": 0
				},
				multiSemester: false,
				dayBlocks: {
					subsetSectionSemesters: false,
					subsetSectionStartDate: false,
					subsetSectionEndDate: false,

					sunday: false,
					monday: true,
					tuesday: false,
					wednesday: false,
					thursday: false,
					friday: false,
					saturday: false
				}
			}]
		}
	],
	otherSemesters: []
}

export const exportjust001 = just001;
export const exportcpsc213 = cpsc213;
export const exportcpsc213a = cpsc213a;
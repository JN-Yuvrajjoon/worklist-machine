const janIndex = 0, febIndex = 1, marIndex = 2, aprIndex = 3, mayIndex = 4, junIndex = 5, julIndex = 6, augIndex = 7, sepIndex = 8, octIndex = 9, novIndex = 10, decIndex = 11;
 
const block700800 = {
	id: "BLOK 100",
	location: "LOCATION 029",
	instructor: "prof. prof",
	subsetSectionActivities: false,
	startTime: 700,
	endTime: 800,
	alternating: 0
}

const block800900 = {
	id: "BLOK 100",
	location: "LOCATION 029",
	instructor: "prof. prof",
	subsetSectionActivities: false,
	startTime: 800,
	endTime: 900,
	alternating: 0
}

const block9001000 = {
	id: "BLOK 100",
	location: "LOCATION 029",
	instructor: "prof. prof",
	subsetSectionActivities: false,
	startTime: 900,
	endTime: 1000,
	alternating: 0
}

const block10001130 = {
	id: "BLOK 100",
	location: "LOCATION 029",
	instructor: "prof. prof",
	subsetSectionActivities: false,
	startTime: 1000,
	endTime: 1130,
	alternating: 0
}

const block17001800 = {
	id: "BLOK 100",
	location: "LOCATION 029",
	instructor: "prof. prof",
	subsetSectionActivities: false,
	startTime: 1700,
	endTime: 1800,
	alternating: 0
}

const block18001930 = {
	id: "BLOK 100",
	location: "LOCATION 029",
	instructor: "prof. prof",
	subsetSectionActivities: false,
	startTime: 1800,
	endTime: 1930,
	alternating: 0
}

const emptyDayBlockSet = {
	sunday: false,
	monday: false,
	tuesday: false,
	wednesday: false,
	thursday: false,
	friday: false,
	saturday: false,

	subsetStartDate: false,
	subsetEndDate: false
}

const dayBlockSetWeekdays1 = {
	sunday: false,
	monday: [block800900, block9001000, block10001130],
	tuesday: [block9001000, block10001130],
	wednesday: [block10001130],
	thursday: [block10001130, block17001800],
	friday: [block800900, block17001800],
	saturday: false,

	subsetStartDate: false,
	subsetEndDate: false
}

const dayBlockSetWeekdays2 = {
	sunday: false,
	monday: [block17001800],
	tuesday: [block800900, block9001000, block10001130, block17001800],
	wednesday: [],
	thursday: [block10001130, block17001800],
	friday: [block800900],
	saturday: false,

	subsetStartDate: false,
	subsetEndDate: false
}

const dayBlockSetAll = {
	sunday: [block800900, block9001000],
	monday: [block9001000],
	tuesday: [block10001130],
	wednesday: [block9001000],
	thursday: [block800900],
	friday: [block9001000],
	saturday: [block17001800],

	subsetStartDate: false,
	subsetEndDate: false
}

const emptyWLSemester1 = {
	id: "1",
	startDate: new Date(2020, sepIndex, 8),
	endDate: new Date(2020, decIndex, 3),
	dayBlocks: {emptyDayBlockSet}
};

const emptyWLSemester2 = {
	id: "2",
	startDate: new Date(2020, janIndex, 4),
	endDate: new Date(2020, aprIndex, 8),
	dayBlocks: {emptyDayBlockSet}
};

const emptyWLSemester3 = {
	id: "3",
	startDate: new Date(2020, aprIndex, 9),
	endDate: new Date(2020, aprIndex, 10),
	dayBlocks: {emptyDayBlockSet}
};

const emptyWLSemester4 = {
	id: "4",
	startDate: new Date(2020, aprIndex, 11),
	endDate: new Date(2020, aprIndex, 12),
	dayBlocks: {emptyDayBlockSet}
};

const WLSemester1 = {
	id: "1",
	startDate: new Date(2020, sepIndex, 8),
	endDate: new Date(2020, decIndex, 3),
	dayBlocks: {dayBlockSetWeekdays1}
};

const WLSemester2 = {
	id: "2",
	startDate: new Date(2020, janIndex, 4),
	endDate: new Date(2020, aprIndex, 8),
	dayBlocks: {dayBlockSetWeekdays2}
};

const emptyWorklist1Sem = {
	info: {gapScore: 100, morningScore: 50, consistencyScore: 0},
	semesters: [
		emptyWLSemester1
	],
	abnormalSections: []
};

const emptyWorklist2Sem = {
	info: {gapScore: 100, morningScore: 50, consistencyScore: 0},
	semesters: [
		emptyWLSemester1,
		emptyWLSemester2
	],
	abnormalSections: []
};

const emptyWorklist4Sem = {
	info: {gapScore: 100, morningScore: 50, consistencyScore: 0},
	semesters: [
		emptyWLSemester1,
		emptyWLSemester2,
		emptyWLSemester3,
		emptyWLSemester4
	],
	abnormalSections: []
};

const simpleWorklist2Sem1 = {
	info: {gapScore: 100, morningScore: 50, consistencyScore: 0},
	semesters: [
		WLSemester1,
		WLSemester2,
	],
	abnormalSections: []
};

const simpleWorklist2Sem2 = {
	info: {gapScore: 100, morningScore: 50, consistencyScore: 0},
	semesters: [
		WLSemester1,
		WLSemester1,
	],
	abnormalSections: []
};

const simpleWorklist2Sem3 = {
	info: {gapScore: 100, morningScore: 50, consistencyScore: 0},
	semesters: [
		WLSemester2,
		WLSemester2,
	],
	abnormalSections: []
};

module.exports = {
	emptyDayBlockSet: emptyDayBlockSet, 
	emptyWorklist1Sem: emptyWorklist1Sem,
	emptyWorklist2Sem: emptyWorklist2Sem,
	emptyWorklist4Sem: emptyWorklist4Sem,
	wl1: simpleWorklist2Sem1,
	wl2: simpleWorklist2Sem2,
	wl3: simpleWorklist2Sem3
}
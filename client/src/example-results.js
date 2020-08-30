const janIndex = 0, febIndex = 1, marIndex = 2, aprIndex = 3, mayIndex = 4, junIndex = 5, julIndex = 6, augIndex = 7, sepIndex = 8, octIndex = 9, novIndex = 10, decIndex = 11;

emptyDayBlockSet = {
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

emptyDayBlockSet = {
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

const emptyWLSemester1 = {
	id: "1",
	startDate: new Date(2020, sepIndex, 8),
	endDate: new Date(2020, decIndex, 3),
	dayBlocks: {}
};

const emptyWLSemester2 = {
	id: "2",
	startDate: new Date(2020, janIndex, 4),
	endDate: new Date(2020, aprIndex, 8),
	dayBlocks: {}
};

const emptyWLSemester3 = {
	id: "3",
	startDate: new Date(2020, aprIndex, 9),
	endDate: new Date(2020, aprIndex, 10),
	dayBlocks: {}
};

const emptyWLSemester4 = {
	id: "4",
	startDate: new Date(2020, aprIndex, 11),
	endDate: new Date(2020, aprIndex, 12),
	dayBlocks: {}
};

// EXPORTS BELOW
const emptyWorklist1Sem= {
	info: {gapScore: 100, morningScore: 50, consistencyScore: 0},
	semesters: [
		emptyWLSemester1
	],
	abnormalSections: []
};

const emptyWorklist2Sem= {
	info: {gapScore: 100, morningScore: 50, consistencyScore: 0},
	semesters: [
		emptyWLSemester1,
		emptyWLSemester2
	],
	abnormalSections: []
};

const emptyWorklist4Sem= {
	info: {gapScore: 100, morningScore: 50, consistencyScore: 0},
	semesters: [
		emptyWLSemester1,
		emptyWLSemester2,
		emptyWLSemester3,
		emptyWLSemester4
	],
	abnormalSections: []
};


module.exports = {
	emptyWorklist1Sem: emptyWorklist1Sem,
	emptyWorklist2Sem: emptyWorklist2Sem,
	emptyWorklist4Sem: emptyWorklist4Sem,
}
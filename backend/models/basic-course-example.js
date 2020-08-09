var Course = mongoose.model('Course', courseSchema);

/*

CPSC 213 2020W
	Web-oriented courses:
		- Section 101 (semester 1)
			- Tuesday 1400-1530
			- Thursday 1400-1530
		- Section 102 (semester 1)
			- Tuesday 1700-1830
			- Thursday 1700-1830
	Laboratories:
		- Section L1A
			- Tuesday 1530-1630
			- Thursday 1530-1730
		- Section L1B
			- Wednesday 1200-1300
			- Friday 1100-1300
*/

var CPSC213 = new Course ({
	courseSubject: "CPSC",
	courseNumber: 213,
	yearSession: { 
		year: 2020, 
		session: "W"
	},
	courseActivities: [ 
		{ 
			activityType: "WEB-ORIENTED COURSE", 
			sections: [ 
				{
					sectionName: "101",
					semester: "1",
					blocks: [ 
						{
							day: "TUESDAY",
							startTime: 1400,
							endTime: 1530
						}, {
							day: "THURSDAY",
							startTime: 1400,
							endTime: 1530
						}
					]

				}, {
					sectionName: "102",
					semester: "1",
					blocks: [ 
						{
							day: "TUESDAY",
							startTime: 1700,
							endTime: 1830
						}, {
							day: "THURSDAY",
							startTime: 1700,
							endTime: 1830
						}
					]

				}

			]

		}, { 
			activityType: "LABORATORY", 
			sections: [ 
				{
					sectionName: "L1A",
					semester: "1",
					blocks: [ 
						{
							day: "TUESDAY",
							startTime: 1530,
							endTime: 1630
						}, {
							day: "THURSDAY",
							startTime: 1530,
							endTime: 1730 
						}
					]

				}, {
					sectionName: "L1B",
					semester: "1",
					blocks: [ 
						{
							day: "WEDNESDAY",
							startTime: 1200,
							endTime: 1300, 
						}, {
							day: "FRIDAY",
							startTime: 1100,
							endTime: 1300, 
						}
					]

				}

			]

		}
	]

});

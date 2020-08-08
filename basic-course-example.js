var Course = mongoose.model('Course', courseSchema);

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

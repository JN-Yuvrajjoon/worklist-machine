const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// IF the queries on the database would be more efficient, 
// Make multiple nested schema instead of one huge one for a course

/*		courseSchema(
			[listOfCourse(
				courseSubject, 
				courseNumber, 
				[listOfCourseActivity(		:schema
					activityType,
					[listOfSection(			:schema
						sectionName,
						semester,
						[listOfBlock(		:schema
							day,
							startTime,
							endTime
						)]
					)]
				)]
			)]
		)

*/

// ENUM: https://mongoosejs.com/docs/api.html#schemanumberoptions_SchemaNumberOptions-enum

var courseSchema = new Schema({
	courseSubject: String, //e.g. "CPSC" 
	courseNumber: Number, //e.g. 213 
	yearSession: { 
		year: Number, //e.g. 2020
		session: String //TODO: enum ["W", "S"]
	},
	courseActivities: [ 
		{ 
			activityType: String, //TODO: enum ["LECTURE", "LAB", .....]
			sections: [ 
				{
					sectionName: String, //e.g. "1W1"
					semester: String, //TODO: enum["1", "2", "BOTH"]
					blocks: [ 
						{
							day: String, //TODO: enum[""]
							startTime: Number, //e.g. 1400
							endTime: Number, //e.g. 1530
						}
					]

				}
			]

		}
	]

});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
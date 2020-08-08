const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//TODO: should my custom data be in UpperCamelCase?
//TODO: courseSchema should refer to a collection of courses probably. See https://mongoosejs.com/docs/models.html

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
import {cpsc213, cpsc213a} from "./example-courses.js";
//const cpsc213 = require("./example-course-cpsc213.js");
//const cpsc213a = require("./example-course-cpsc213a.js");

// Input: CheckedUserRequest
// Output: Array of Result (a Result is an array of Worklists)
const results = [["W1V1", "W1V2"],["W2V1"],["W3V1", "W3V2", "W3V3"]];

export default function generateResults(userRequest) {
	if(isRequestBad()) {
		return(console.error());
	} else {
		return results;
	}
}

function isRequestBad(){
	return false;
}

class UserRequest {

}

// class dayBlockSet{
// 	constructor() {
// 		this.sunday = false;
// 		this.monday = false;
// 		this.tuesday = false;
// 		this.wednesday = false;
// 		this.thursday = false;
// 		this.friday = false;
// 		this.saturday = false;
// 	}
// 	}
	
// 	class dayBools{
// 	constructor() {
// 		this.sunday = false;
// 		this.monday = false;
// 		this.tuesday = false;
// 		this.wednesday = false;
// 		this.thursday = false;
// 		this.friday = false;
// 		this.saturday = false;
// 	}
// 	}
	
// 	let monWedFri = new dayBlockSet();
// 	monWedFri.sunday= false;
// 	monWedFri.monday= [{}];
// 	monWedFri.tuesday= false;
// 	monWedFri.wednesday= [{}];
// 	monWedFri.thursday= false;
// 	monWedFri.friday= [{"g": "whatg"}];
// 	monWedFri.saturday= false;
	
	
// 	let tueThuFri = new dayBlockSet();
// 	tueThuFri.sunday= false;
// 	tueThuFri.monday= false;
// 	tueThuFri.tuesday= [{}];
// 	tueThuFri.wednesday= false;
// 	tueThuFri.thursday= [{}];
// 	tueThuFri.friday= [{"e": "what"}];
// 	tueThuFri.saturday= false;
	
	
// 	function daywiseAnd(set1, set2) {
// 	result = new dayBools();
// 	result.sunday = set1.sunday && set2.sunday;
// 	result.monday = set1.monday && set2.monday;
// 	result.tuesday = set1.tuesday && set2.tuesday;
// 	result.wednesday = set1.wednesday && set2.wednesday;
// 	result.thursday = set1.thursday && set2.thursday;
// 	result.friday = set1.friday && set2.friday;
// 	result.saturday = set1.saturday && set2.saturday;
	
// 	return result;
// 	}
	
	
// 	console.log(daywiseAnd(monWedFri, tueThuFri));
	
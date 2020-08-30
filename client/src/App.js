import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import React, {useState} from 'react';

import engineFunction from "./scheduling-engine.js"

import InputMenu from "./components/InputMenu"
import WorklistNavigatorBar from "./components/WorklistNavigatorBar";
import WorklistRendering from "./components/WorklistRendering";

export default function App() {

	// Using hooks to give App() a global state
	// https://reactjs.org/docs/hooks-state.html
	//    [state, functionToSetState] = useState(initial state)
	const [globalSettings, setGlobalSettings] = useState(loadSettings());
	const [globalLatestRequest, setGlobalLatestRequest] = useState({});
	const [globalResults, setGlobalResults] = useState([]);
	const [navigationResult, setNavigationResult] = useState(0);
	const [navigationVariation, setNavigationVariation] = useState(0);

	//TODO: from database
	function loadSettings() {
		let tempSettings = {
			schools: ["UBC"],
			campuses: ["", "Vancouver", "Okanagan"],
			sessions: ["", "2020W", "1999Z"],
			school: "",
			campus: "",
			session: "",
		
			preferredTime: "afternoon",
			reduceGaps: false
		};
		tempSettings.school= tempSettings.schools[0];
		tempSettings.campus= tempSettings.campuses[0];
		tempSettings.session= tempSettings.sessions[0];
		return tempSettings;
	}

	function globalSubmit(requestedCourses, requestedCustoms) {
		setNavigationResult(1);
		setNavigationVariation(1);
		let formattedCourses = formatCourses(requestedCourses);
		let errors = askDatabase(formattedCourses)
		let userRequest = {
			settings: globalSettings,
			courses: formatCourses(requestedCourses),
			customs: requestedCustoms
		}
		console.log("This is the request that will be sent off to the scheduler:", userRequest);
		try {
			setGlobalResults(engineFunction(userRequest));
			setGlobalLatestRequest(userRequest); // Saves the latest input
		} catch(error) {
			console.log(error);
		}
		
	}

	// INPUT:  unverifiedCourses: [inputCourse]
	// OUTPUT: [inputCourse]
	// Removes blank courses from the input
	// Removes all characters other than alphanumerical, converts letters to uppercase
	function formatCourses(inputCourses) {
		let result = []
		inputCourses.forEach(function(ic) {
			if (ic.name !== "" && ic.name !== null) {
				let formatted = ic;
				formatted.name = ic.name.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
				result.push(formatted);
			}
		})
		return result;
	}
	

	// INPUT:  inputCourses: [inputCourse] // Names must be formatted as they are in the DB
	//         school: string
	//         campus: string
	//         session: string
	// OUTPUT: errors: [{index: number, message: string}]
	// Searches database for each inputCourse to verify that they exist and have sections
	// Returns errors (pairings of erroneous course index and what went wrong)
	function askDatabase(inputCourses) {
		// Navigate to correct database using school, campus, session (globalSettings)
		let errors = []
		inputCourses.forEach(function(ic){
			let TODO = true;
			let foundCourse = TODO;
			let foundCourseSemester = (ic.mustBeSemester === false || TODO);
			let foundCourseSection = (ic.mustHaveSections === [] || TODO);
			
			if(!foundCourse){
				errors.push({
					index: ic.id,
					message: (`Could not find course ${ic.name}`)
				})
			} else if(!foundCourseSemester) {
				errors.push({
					index: ic.id,
					message: (`Found ${ic.name}, but could not find ${ic.name} in ${ic.mustBeSemester}`)
				})
			} else if(!foundCourseSection) {
				errors.push({
					index: ic.id,
					message: (`Found ${ic.name}, but could not find all of the specified sections.`)
				})
			}
		})
		return errors;
	}

	// OUTPUT: [Worklist], or empty array
	function getCurrentResult(){
		let resultIndex = navigationResult - 1;
		if (globalResults.length > 0) {
			if (0 <= resultIndex && resultIndex < globalResults.length) {
				return (globalResults[resultIndex]);
			}
		}
		return ([]);
	}

	// OUTPUT: Worklist, or empty object
	function getCurrentVariation(){
		let results = getCurrentResult();
		let variationIndex = navigationVariation - 1;
		if (results !== undefined){
			if (0 <= variationIndex && variationIndex < results.length) {
				return (results[variationIndex]);
			} 
		}
		return ({});
	}
	
	return (
		<div className="row" id="contains-everything">
			<div className="container-fluid col-md m-0" id="wm-input-column">
				<InputMenu 
					settings={globalSettings} 
					changeSettingsFunction={setGlobalSettings} 
					goFunction={globalSubmit}
				/>
			</div>
			<div className="container-fluid col-md m-0 h-100" id="wm-output-column">
				<div className="shadow custom-corners h-100" id="wm-output-panel">
					<WorklistNavigatorBar 
						results={globalResults.length}
						variations={getCurrentResult().length}
						currentResult={navigationResult}
						currentVariation={navigationVariation}
						navigateResultFn={setNavigationResult}
						navigateVariationFn={setNavigationVariation}
						worklistInfo={getCurrentVariation().info}
					/>
					<WorklistRendering 
						renderedResult={getCurrentVariation()}
					/>
				</div>
			</div>
			
		</div>
	);
}
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import React, {useState} from 'react';

import engineFunction from "./scheduling-engine.js"

import InputMenu from "./components/InputMenu"
import WorklistNavigatorBar from "./components/WorklistNavigatorBar";
import WorklistRendering from "./components/WorklistRendering";

var tempSettings = {
	schools: ["UBC"],
	campuses: ["", "Vancouver", "Okanagan"],
	sessions: ["2020W"],
	school: "",
	campus: "",
	session: "",

	preferredTime: "afternoon",
	reduceGaps: false
};

tempSettings.school= tempSettings.schools[0];
tempSettings.campus= tempSettings.campuses[0];
tempSettings.session= tempSettings.sessions[0];

export default function App() {

	// Using hooks to give App() a global state
	// https://reactjs.org/docs/hooks-state.html
	const [globalSettings, setGlobalSettings] = useState(tempSettings)
	const [globalLatestRequest, setGlobalLatestRequest] = useState({});
	const [globalResults, setGlobalResults] = useState([[]])
	const [globalNavigationSpot, setglobalNavigationSpot] = useState({resultNumber: 1, variationNumber: 2}); //change


	// let userRequest = {
	// 	settings: this.state.settings,
	// 	courses: this.state.courses,
	// 	customs: this.state.customBlocks
	// }
	function globalSubmit(requestedCourses, requestedCustoms) {
		let userRequest = {
			settings: globalSettings,
			courses: requestedCourses,
			customs: requestedCustoms
		}
		console.log("globalSubmit called, here's the userRequest object:", userRequest);

		try {
			setGlobalResults(engineFunction(userRequest));
			setGlobalLatestRequest(userRequest); // Saves the latest input
		}
		catch(error) {
			
		}
	}

	function pickResultToRender(){
		let currResult = globalNavigationSpot.resultNumber;
		let currVariation = globalNavigationSpot.variationNumber;

		return (globalResults[currResult - 1][currVariation - 1]);
	}
	
	return (
		<div className="row" id="contains-everything">
			
			<div className="container-fluid col-md m-0" id="wm-input-column">
				<InputMenu changeSettingsFunction={setGlobalSettings} settings={globalSettings} goFunction={globalSubmit}/>
			</div>

			<div className="container-fluid col-md m-0 h-100" id="wm-output-column">
				<div className="shadow custom-corners h-100" id="wm-output-panel">
					<WorklistNavigatorBar navigateTo={globalNavigationSpot} navigateFunction={setglobalNavigationSpot}/>
					<WorklistRendering renderedResult={pickResultToRender()}/>
					{/* <p>{globalSubmit()}</p> */}
				</div>
			</div>
			
		</div>
	);
}
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import React from 'react';

import generateResults from "./scheduling-engine.js"


import InputMenu from "./components/InputMenu"
import WorklistNavigatorBar from "./components/WorklistNavigatorBar";
import WorklistRendering from "./components/WorklistRendering";


// import Navbar from "./components-deprecated/navbar.component"
// import ExercisesList from "./components-deprecated/exercises-list.component";
// import EditExercise from "./components-deprecated/edit-exercise.component";
// import CreateExercise from "./components-deprecated/create-exercise.component";
// import CreateUser from "./components-deprecated/create-user.component";

function App() {
	const inputMenuElement = React.createElement(InputMenu);
	const worklistNavBarElement = React.createElement(WorklistNavigatorBar);
	const worklistRenderingElement = React.createElement(WorklistRendering);
	//const scheduleFunction = require("./scheduling-engine");
	
	return (
		<div className="row" id="contains-everything">
			
			<div className="container-fluid col-md m-0" id="wm-input-column">
				{inputMenuElement}
			</div>

			<div className="container-fluid col-md m-0 h-100" id="wm-output-column">
				<div className="shadow custom-corners h-100" id="wm-output-panel">
					{worklistNavBarElement}
					{worklistRenderingElement}
					<p>{generateResults()}</p>
				</div>
			</div>
			
		</div>
	);
}

export default App;

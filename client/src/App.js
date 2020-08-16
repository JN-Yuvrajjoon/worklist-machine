import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import React from 'react';
// import { BrowserRouter as Router, Route } from "react-router-dom";

import InputMenu from "./components/InputMenu"
import Timetable from "./components/Timetable";
import WorklistNavigatorBar from "./components/WorklistNavigatorBar";
import WorklistInformationBar from "./components/WorklistInformationBar";


// import Navbar from "./components-deprecated/navbar.component"
// import ExercisesList from "./components-deprecated/exercises-list.component";
// import EditExercise from "./components-deprecated/edit-exercise.component";
// import CreateExercise from "./components-deprecated/create-exercise.component";
// import CreateUser from "./components-deprecated/create-user.component";

function App() {
	return (
		<div className="row" id="contains-everything">
			<div className="container-fluid col-md m-0" id="wm-input-column">
				<InputMenu />
			</div>

			<div className="container-fluid col-md m-0 h-100" id="wm-output-column">
				<div className="shadow custom-corners h-100" id="wm-output-panel">
					<WorklistNavigatorBar />
					<hr></hr>
					<WorklistInformationBar/>
					<hr></hr>
					<Timetable /> <Timetable />
				</div>
			</div>
			
			{/* <Router>
				<Navbar />
				<br/>
				<Route path="/" exact component={ExercisesList} />
				<Route path="/edit/:id" component={EditExercise} />
				<Route path="/create" component={CreateExercise} />
				<Route path="/user" component={CreateUser} />
			</Router> */}


			
		</div>
	);
}

export default App;

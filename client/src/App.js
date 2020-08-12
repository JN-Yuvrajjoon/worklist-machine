import React from 'react';
//import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components-deprecated/navbar.component"
import ExercisesList from "./components-deprecated/exercises-list.component";
import EditExercise from "./components-deprecated/edit-exercise.component";
import CreateExercise from "./components-deprecated/create-exercise.component";
import CreateUser from "./components-deprecated/create-user.component";

function App() {
	return (
		
			<div class="container-fluid p-3">
			<div class="row">
				<div class="col-md-3" id="worklist-machine-left-column">
				<div class="shadow rounded-lg">
				<ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">

					<li class="nav-item" role="presentation">
						<a class="nav-link active" id="settings-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="settings" aria-selected="true">
					Settings
					</a>
					</li>

					<li class="nav-item" role="presentation">
						<a class="nav-link" id="courses-tab" data-toggle="tab" href="#courses" role="tab" aria-controls="courses" aria-selected="false">Courses</a>
					</li>

					<li class="nav-item" role="presentation">
						<a class="nav-link" id="about-tab" data-toggle="tab" href="#about" role="tab" aria-controls="about" aria-selected="false">About</a>
					</li>

				</ul>
				<div class="tab-content p-3" id="myTabContent">
					<div class="tab-pane fade show active" id="settings" role="tabpanel" aria-labelledby="settings-tab">settings</div>
					<div class="tab-pane fade" id="courses" role="tabpanel" aria-labelledby="courses-tab">courses</div>
					<div class="tab-pane fade" id="about" role="tabpanel" aria-labelledby="about-tab">about</div>
				</div>
			</div>
				</div>
				<div className="container-fluid col-md-9 p-0" id="worklist-machine-main">
				<Router>
					<Navbar />
					<br/>
					<Route path="/" exact component={ExercisesList} />
					<Route path="/edit/:id" component={EditExercise} />
					<Route path="/create" component={CreateExercise} />
					<Route path="/user" component={CreateUser} />
				</Router>
				</div>
			</div>
			</div>
	);
}

export default App;

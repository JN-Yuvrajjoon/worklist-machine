import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import { Tabs, Tab } from 'react-bootstrap';


import Navbar from "./components-deprecated/navbar.component"
import ExercisesList from "./components-deprecated/exercises-list.component";
import EditExercise from "./components-deprecated/edit-exercise.component";
import CreateExercise from "./components-deprecated/create-exercise.component";
import CreateUser from "./components-deprecated/create-user.component";

function App() {
	return (
		<div class="row container-fluid p-3">
			<div class="col-md-3" id="wm-input-column">
				<div class="shadow rounded-lg">
					
					<ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
						{/* Settings tab */}
						<li class="nav-item" role="presentation">
							<a class="nav-link active" id="settings-tab" data-toggle="tab" href="#settings-menu" role="tab" aria-controls="settings" aria-selected="true">
								Settings
							</a>
						</li>
						{/* Courses tab */}
						<li class="nav-item" role="presentation">
							<a class="nav-link" id="courses-tab" data-toggle="tab" href="#courses-menu" role="tab" aria-controls="courses" aria-selected="false">
								Courses
							</a>
						</li>
						{/* About tab */}
						<li class="nav-item" role="presentation">
							<a class="nav-link" id="about-tab" data-toggle="tab" href="#about-menu" role="tab" aria-controls="about" aria-selected="false">
								About
							</a>
						</li>
					</ul>

					{/* Tab content */}
					<div class="tab-content p-3" id="myTabContent">
						<div class="tab-pane fade in show active" id="settings-menu" role="tabpanel" aria-labelledby="settings-menu"> 
							settings
						</div>
						<div class="tab-pane fade" id="courses-menu" role="tabpanel" aria-labelledby="courses-menu">
							courses
						</div>
						<div class="tab-pane fade" id="about-menu" role="tabpanel" aria-labelledby="about-menu">
							about
						</div>
						

					</div>
				</div>
				
			</div>
			<div className="container-fluid col-md-9 p-0" id="worklist-machine-main">
			<div class="shadow rounded-lg">
				<p>whaddup</p>
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
		</div>
	);
}

export default App;

import React, {Component} from "react";

import SettingsMenu from "./tab-menus/SettingsMenu";
import CoursesMenu from "./tab-menus/CoursesMenu";
import AboutMenu from "./tab-menus/AboutMenu";

export default class InputMenu extends Component {
	render() {
		return(
			<div className="container-fluid p-0 m-0">

				<div className="row container-fluid p-0 m-0" id="wm-logo"> 
					[LOGO] worklist \n machine
				</div>

				<div className="row container-fluid py-3 p-0 m-0">
					<div className="container-fluid tab-content shadow wm-tab-menu" id="wm-tab-menu-content">
						<div className="tab-pane fade in show active" id="settings-menu" role="tabpanel" aria-labelledby="settings-menu"> 
							<SettingsMenu />
						</div>
						<div className="tab-pane fade" id="courses-menu" role="tabpanel" aria-labelledby="courses-menu">
							<CoursesMenu />
						</div>
						<div className="tab-pane fade" id="about-menu" role="tabpanel" aria-labelledby="about-menu">
							<AboutMenu />
						</div>
					</div>

					<ul className="nav nav-tabs nav-fill container-fluid p-0 wm-tab-menu" id="wm-tab-list" role="tablist">
						{/* Settings tab */}
						<li className="nav-item" role="presentation">
							<a className="nav-link active shadow" id="settings-tab" data-toggle="tab" href="#settings-menu" role="tab" aria-controls="settings" aria-selected="true">
								
								S
							</a>
						</li>
						{/* Courses tab */}
						<li className="nav-item" role="presentation">
							<a className="nav-link shadow" id="courses-tab" data-toggle="tab" href="#courses-menu" role="tab" aria-controls="courses" aria-selected="false">
								C
							</a>
						</li>
						{/* About tab */}
						<li className="nav-item" role="presentation">
							<a className="nav-link shadow" id="about-tab" data-toggle="tab" href="#about-menu" role="tab" aria-controls="about" aria-selected="false">
								A
							</a>
						</li>
					</ul>
				</div>

				<div className="row container-fluid p-0 m-0">
					<button className="btn btn-block custom-corners shadow" type="button" id="wm-go-button">GO!</button>
				</div>
			</div>
		)
	}
}
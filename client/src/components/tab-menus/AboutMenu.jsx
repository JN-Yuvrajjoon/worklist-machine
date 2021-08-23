import React, {Component} from "react";

export default class AboutMenu extends Component {
  render() {
    return(
      <React.Fragment>
        <h5>About</h5>
        <hr></hr>
        {/* <p>How to use worklist machine</p>
        <hr></hr> */}
        <a href="https://github.com/mlechu/worklist-machine">GitHub</a>
        <p>Send bugs/feature requests here! WM is still very much a work in progress.</p>
        <hr></hr>
        <a href="https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments">UBC course registration</a>
        <hr></hr>
        <a href="https://docs.ubccourses.com/">UBC courses API</a>
      </React.Fragment>
    )
  }
}
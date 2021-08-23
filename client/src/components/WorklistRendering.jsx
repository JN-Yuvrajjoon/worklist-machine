import React, { Component } from "react";

const defaultWorklist = {
  info: {},
  dayBlockSets: [
    { term: '1', subsetStartDate: false, subsetEndDate: false },
    { term: '2', subsetStartDate: false, subsetEndDate: false },
  ],
  variations: [],
  unscheduled: [],
}

export default class WorklistRendering extends Component {
  constructor(props) {
    super(props);

    this.returnRenderable = this.returnRenderable.bind(this);
    this.findHeight = this.findHeight.bind(this);
    this.checkEarliest = this.checkEarliest.bind(this);
    this.checkLatest = this.checkLatest.bind(this);
    this.checkNoWeekends = this.checkNoWeekends.bind(this);

  }

  // Output: A renderable worklist regardless of the props
  returnRenderable() {
    let toRender = this.props.worklist;
    if (!toRender || !toRender.dayBlockSets || !toRender.dayBlockSets.length) {
      console.info("WorklistRendering is rendering the default worklist");
      return defaultWorklist;
    }
    console.info("WorklistRendering is rendering: ", toRender);
    return toRender;
  }

  // Returns the on-screen height of a thirty minute block
  // TODO: should later take into account the height of the screen and the start/end times
  findHeight() { return 1.5; }

  //other dimensions, so all timetables are consistent
  checkNoWeekends() { return true; }

  checkEarliest() { return 800; }

  checkLatest() { return 1800; }

  render() {
    let worklist = this.returnRenderable();

    return (
      <div className="row p-0 m-0 container-fluid">
        {worklist.dayBlockSets.map(dbs =>
          <div className="col-lg-6 p-2 m-0" key={dbs.term}>
            <Timetable
              dayBlockSet={dbs}
              currentResult={this.props.currentResult}
              currentVariation={this.props.currentVariation}
              standardHeight={this.findHeight()}
              hideWeekends={this.checkNoWeekends()}
              topTime={this.checkEarliest()}
              bottomTime={this.checkLatest()} />
          </div>)
        }
        {/* Do something about unscheduled sections here */}
      </div>
    );
  }
}

class Timetable extends Component {
  constructor(props) {
    super(props);

    this.generateTableTitle = this.generateTableTitle.bind(this);
    this.renderTimeRuler = this.renderTimeRuler.bind(this);
  }

  // looks like a ruler to me
  renderTimeRuler() {
    const timeRuler = [<div className="p-0 m-0" key="timeRuler" style={{ height: this.props.standardHeight + "rem" }}></div>]
    for (let i = this.props.topTime; i < this.props.bottomTime; i += 100) {
      let iColon = `${i.toString().slice(0, -2)}:00`
      timeRuler.push(<div className="wm-hour-marker" style={{ height: (this.props.standardHeight) + "rem" }}>{iColon}</div>);
      timeRuler.push(<div className="wm-hour-marker" style={{ height: (this.props.standardHeight) + "rem" }}></div>);
    }
    return timeRuler;
  }

  // Input:
  // sem: number
  // start: Date or false
  // end: Date or false
  //
  // Output:
  // Title = {semester: string, interval: string, navigation: string}
  generateTableTitle(sem, start, end) {
    let intervalString = (!start || !end) ? "" : (`${start.toDateString().slice(4, 10)}-${end.toDateString().slice(4, 10)}`);
    let navString = (
      (this.props.currentResult === 0 || this.props.currentVariation === 0) ? "" :
        (`(Worklist ${this.props.currentResult}.${this.props.currentVariation})`)
    )
    return {
      semester: (`Semester ${sem}`),
      interval: intervalString,
      navigation: navString
    };
  }

  render() {
    let title = this.generateTableTitle(this.props.dayBlockSet.term, this.props.startDate, this.props.endDate);
    let dbs = this.props.dayBlockSet;
    console.log(dbs);
    let days = this.props.hideWeekends ? ['mon', 'tue', 'wed', 'thu', 'fri'] : ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return (
      <React.Fragment>
        <div className="wm-table-title">
          <b>{title.semester}</b> {" " + title.interval} {" " + title.navigation}
        </div>

        <div className="row p-0 m-0 zero-space">
          <div className="col-1 p-0 m-0">
            {this.renderTimeRuler()}
          </div>

          <div className="card-group p-0 m-0 col-11">
            <div className="row p-0 m-0 w-100">
              {days.map(day => {
                return (
                  <DayColumn
                    day={day}
                    key={(this.props.dayBlockSet.term + day)}
                    topTime={this.props.topTime}
                    bottomTime={this.props.bottomTime}
                    standardHeight={this.props.standardHeight}
                    dayBlocks={dbs[day] || []} />
                )
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

// This item likely doesn't need to be a Component
class DayColumn extends Component {
  constructor(props) {
    super(props);

    this.renderGap = this.renderGap.bind(this);
    this.renderCourse = this.renderCourse.bind(this);
  }

  rows(timeDiff) {
    return (((timeDiff / 100) * 2) | 0) // | 0 for integer division
      + (timeDiff % 100 !== 0 ? 1 : 0) // one more row for half hour
  }

  // Maybe make a gap a single block that is striped using CSS rather than using a for loop
  renderGap(time) {
    let gap = [];
    for (let i = 0; i < this.rows(time); i++) {
      gap.push(<li className="list-group-item p-0 m-0" style={{ height: this.props.standardHeight + "rem" }}></li>);
    }
    return gap;
  }

  renderCourse(block) {
    let blockHeight = this.rows(block.endTime - block.startTime) * this.props.standardHeight;
    let courseName = block.section.name;
    let courseSection = '';
    return (
      <a href={block.section.link}>
        <div className="wm-course-block rounded" style={{ height: blockHeight + "rem" }}>
          {courseName + " section " + courseSection}
        </div>
      </a>
    ); //fix height
  }

  render() {
    let unrendered = [...this.props.dayBlocks];
    let curr = this.props.topTime;
    let end = this.props.bottomTime;
    let nextBlock = 0; //idx of next block to render
    let col = [];

    while (curr < end) {

      // No more blocks in the day
      if (!unrendered || !unrendered.length || nextBlock >= unrendered.length) {
        col = col.concat(this.renderGap(end - curr));
        curr = end; //break

        // Need to render a block at this time
      } else if (unrendered[nextBlock].startTime === curr) {
        col.push(this.renderCourse(unrendered[nextBlock]));
        curr += (unrendered[nextBlock].endTime - unrendered[nextBlock].startTime);
        nextBlock++;

        // Need to render a break before the next block
      } else if (unrendered[nextBlock].startTime > curr) {
        col = col.concat(this.renderGap(unrendered[nextBlock].startTime - curr));
        curr += (unrendered[nextBlock].startTime - curr);

        // Should not happen, indicates infinite loop
      } else {
        console.warn("bad");
        curr++;
      }
    }

    return (
      <div className="col card flex-nowrap p-0 m-0">
        <ul className="list-group list-group-flush p-0 m-0">
          <li className="list-group-item p-0 m-0 text-center" style={{ height: this.props.standardHeight + "rem" }}>
            {this.props.day.charAt(0).toUpperCase()}
          </li>
          {col}
        </ul>
      </div>
    )
  }
}
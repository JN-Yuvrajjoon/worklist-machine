import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import React, { useState } from 'react';

import InputMenu from "./components/InputMenu";
import WorklistNavigatorBar from "./components/WorklistNavigatorBar";
import WorklistRendering from "./components/WorklistRendering";

import { generateResults } from "./scheduling-engine.js";
import { postApi } from './api'

export default function App() {
  // https://reactjs.org/docs/hooks-state.html [state, functionToSetState] = useState(initial state)
  const [cachedRequest, setCachedRequest] = useState({});
  const [results, setResults] = useState([]);
  const [schedulePage, setSchedulePage] = useState(0);
  const [variationPage, setVariationPage] = useState(0);

  /**
   * @description query backend for courses, send to scheduling engine, and return
   * @param {InputCourse} inputCourses 
   * @param {InputCustom} customs 
   * @param {Settings} settings 
   */
  function globalSubmit(inputCourses, customBlocks, settings) {
    fetchCourses(inputCourses).then(resp => {
      console.group('App.js is sending the following to the SE', resp.courses);
      return generateResults(resp.courses, {inputCourses, customBlocks, settings});
    }).then(engineOutput => {
      console.groupEnd();
      console.log("Engine successfuly produced results:", engineOutput);
      setResults(engineOutput);
      setSchedulePage(1);
      setVariationPage(1);
      // setCachedRequest(userRequest);
    }).catch(err => console.log);
  }

  /**
   * @param {*} inputCourses 
   */
  function fetchCourses(inputCourses) {
    const reqCourses = inputCourses.flatMap(ic =>
      !ic.name.trim() ?
        [] : 
        [{
          name: ic.name.replace(/[^A-Za-z0-9]/g, '').toUpperCase(),
          mustBeSemester: ic.mustBeSemester && ic.mustBeSemester.replace(/\s/g, '').toUpperCase().split(",").filter(sem => sem),
          mustBeSection: ic.mustBeSection && ic.mustBeSection.replace(/\s/g, '').toUpperCase().split(",").filter(sec => sec),
          id: ic.id
        }]);

    return postApi('/ubc-vancouver/2021/courses', { courses: reqCourses });
  }


  // Output: Result
  function getCurrentResult() {
    let resultIndex = schedulePage - 1;
    if (results.length > 0) {
      if (0 <= resultIndex && resultIndex < results.length) {
        return (results[resultIndex]);
        console.log(results)
      }
    }
    return ({ variations: [] }); //an empty result
  }

  // Output: Variation
  function getCurrentVariation() {
    let result = getCurrentResult(); // one "result" with many variations inside
    let variationIndex = variationPage - 1;
    if (result !== undefined) {
      if (0 <= variationIndex && variationIndex < result.variations.length) {
        // return combineSchedules(result.base, result.variations[variationIndex].modifier);
        return result.variations[variationIndex];
      }
    }
    return ({ semesters: [] }); //an empty variation
  }

  // Renderer will only ever access days (sun-sat) of a DBS
  // Package necessary info alongside DBS's
  function getRenderable() {
    return getCurrentResult();
    // let base = [];
    // let variation = [];

    // let test = combineSchedules()

    return {
      info: {},
      dateSpans: [
        {
          semesterId: "1",
          startDate: false,
          endDate: false,
          dayBlocks: {
            wednesday: [{ courseId: "hello", startTime: 900, endTime: 1200 }, { courseId: "test", startTime: 1300, endTime: 1700 }]
          }
        },
        {
          semesterId: "2",
          startDate: false,
          endDate: false,
          dayBlocks: {
            wednesday: [{ courseId: "middle", startTime: 1200, endTime: 1300 }],
            thursday: [{ courseId: "hello", startTime: 900, endTime: 1200 }, { courseId: "test", startTime: 1300, endTime: 1700 }]
          }
        },
        {
          semesterId: "3",
          startDate: false,
          endDate: false,
          dayBlocks: {}
        }
      ],
      unscheduled: []
    }
  }

  return (
    <div className="row" id="contains-everything">
      <div className="container-fluid col-md m-0" id="wm-input-column">
        <InputMenu
          previousRequest={cachedRequest}
          goFunction={globalSubmit}
        />
      </div>
      <div className="container-fluid col-md m-0 h-100" id="wm-output-column">
        <div className="shadow custom-corners h-100" id="wm-output-panel">
          <WorklistNavigatorBar
            results={results.length}
            variations={getCurrentResult().variations.length}
            currentResult={schedulePage}
            currentVariation={variationPage}
            navigateResultFn={setSchedulePage}
            navigateVariationFn={setVariationPage}
            worklistInfo={getCurrentVariation().info}
          />
          <WorklistRendering
            currentResult={schedulePage}
            currentVariation={variationPage}
            worklist={results[schedulePage]}
          />
        </div>
      </div>
    </div>
  );
}
/* eslint-disable react/prop-types */

import { useState } from "react";
import arrow from "../assets/up.svg";

export default function Filter({ filter, updateFilter, clearFilter }) {
  //manage state for filter div
  let [filterDiv, setFilterDiv] = useState(false);

  //manage state for radio btn
  let [radio, setRadio] = useState("injury");

  //handle input change
  function inputChange(e) {
    updateFilter(e);
  }

  //handle radio change
  function handleRadio(e) {
    setRadio(e.target.value);
  }

  return (
    <div className="sort--container">
      <p className="sort--prompt">
        Filter
        <img
          className="arrow"
          src={arrow}
          style={{
            transform: `${filterDiv ? "rotate(0deg)" : "rotate(180deg)"}`,
          }}
          onClick={() => setFilterDiv((prevState) => !prevState)}
          alt="arrow"
        ></img>
      </p>
      {filterDiv && (
        <div className="filter--container">
          <div className="filter--radio">
            <label>
              <input
                name="filterType"
                className="radio--btn"
                type="radio"
                value="injury"
                checked={radio === "injury"}
                onChange={(e) => handleRadio(e)}
              ></input>
              Injury
            </label>

            <label>
              <input
                name="filterType"
                className="radio--btn"
                type="radio"
                value="report"
                checked={radio === "report"}
                onChange={(e) => handleRadio(e)}
              ></input>
              Report
            </label>
          </div>

          <div className="filter--dates__container">
            <label className="label--date">
              Start Date
              <input
                name="startDate"
                className="filter--date"
                type="datetime-local"
                value={filter.startDate}
                onChange={(e) => inputChange(e)}
              />
            </label>

            <label className="label--date">
              End Date
              <input
                name="endDate"
                className="filter--date"
                type="datetime-local"
                value={filter.endDate}
                onChange={(e) => inputChange(e)}
              />
            </label>
          </div>
          <div className="filter--btn">
            <button
              className="filter--apply"
              onClick={() => {
                let item = { target: { name: "filterType", value: radio } };
                inputChange(item);
                setFilterDiv((prevState) => !prevState);
              }}
            >
              Apply
            </button>
            <button
              className="filter--clear"
              onClick={() => {
                setFilterDiv((prevState) => !prevState);
                clearFilter();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

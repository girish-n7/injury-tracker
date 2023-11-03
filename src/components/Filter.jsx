/* eslint-disable react/prop-types */

export default function Filter({ filter, updateFilter }) {
  //handle input change
  function inputChange(e) {
    updateFilter(e);
  }
  return (
    <div className="filter--container">
      <div className="filter--radio">
        <label>
          <input
            name="filterType"
            className="radio--btn"
            type="radio"
            value="injury"
            checked={filter.filterType === "injury"}
            onChange={(e) => inputChange(e)}
          ></input>
          Injury
        </label>

        <label>
          <input
            name="filterType"
            className="radio--btn"
            type="radio"
            value="report"
            checked={filter.filterType === "report"}
            onChange={(e) => inputChange(e)}
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
    </div>
  );
}

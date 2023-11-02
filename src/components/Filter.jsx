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
          Injury
          <input
            name="filterType"
            type="radio"
            value="injury"
            checked={filter.filterType === "injury"}
            onChange={(e) => inputChange(e)}
          ></input>
        </label>
        <label>
          Report
          <input
            name="filterType"
            type="radio"
            value="report"
            checked={filter.filterType === "report"}
            onChange={(e) => inputChange(e)}
          ></input>
        </label>
      </div>

      <label>
        Start Date:{" "}
        <input
          name="startDate"
          type="datetime-local"
          value={filter.startDate}
          onChange={(e) => inputChange(e)}
        />
      </label>
      <label>
        End Date:{" "}
        <input
          name="endDate"
          type="datetime-local"
          value={filter.endDate}
          onChange={(e) => inputChange(e)}
        />
      </label>
    </div>
  );
}

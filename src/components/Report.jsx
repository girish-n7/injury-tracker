import { useState } from "react";
import map from "../assets/body-map.png";
// import { addInjury } from "./API";

export default function Report() {
  //manage state for injury
  let [injury, setInjury] = useState({
    name: "",
    injuryTime: "",
    reportTime: "",
    injuryDate: "",
    reportDate: "",
    circles: [],
    details: [],
  });

  //manage state for details
  let [details, setDetails] = useState([]);

  //manage state for circle count
  const [circles, setCircles] = useState([]);

  function getClickCoords(event) {
    var e = event.target;
    var dim = e.getBoundingClientRect();
    var x = event.clientX - dim.left;
    var y = event.clientY - dim.top;
    return [x, y];
  }

  function addCircle(event) {
    // get click coordinates
    let [x, y] = getClickCoords(event);

    // make new svg circle element
    let newCircle = { id: circles.length + 1, x: x, y: y };

    // update the array of circles
    let allCircles = [...circles, newCircle];

    // update 'circles'
    setCircles(allCircles);
  }

  //create circlesMap
  let circlesMap = circles?.map((item) => {
    return (
      <div
        key={item.id}
        className="circle"
        style={{
          position: "absolute",
          top: `${item.y - 12.5}px`,
          left: `${item.x - 12.5}px`,
        }}
      >
        {item.id}
      </div>
    );
  });

  //create map for inputs
  let inputMap = circles.map((item) => {
    return (
      <label key={item.id}>
        Details for injury {item.id}:{" "}
        <textarea
          name={`${item.id}`}
          type="text"
          value={details[item - 1]?.details}
          onChange={detailsChange}
        />
      </label>
    );
  });

  //handle input change
  function inputChange(event) {
    const { name, value } = event.target;
    setInjury((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  //handle details change
  function detailsChange(event) {
    const { name, value } = event.target;
    let newDetail = { name: name, details: value };
    setDetails((prevState) => [...prevState, newDetail]);
  }

  //handle add injury
  function addInjury() {
    setInjury((prevState) => ({
      ...prevState,
      circles: circles,
      details: details,
    }));
    console.log(injury);
  }

  return (
    <div className="report--container">
      <div
        className="report--map"
        style={{ backgroundImage: `url(${map})`, position: "relative" }}
        onClick={addCircle}
      >
        {circlesMap}
      </div>
      <div className="details--container">
        <label>
          Name of reporter:{" "}
          <input
            name="name"
            type="text"
            value={injury.name}
            onChange={inputChange}
          />
        </label>
        <label>
          Date of injury:{" "}
          <input
            name="injuryDate"
            type="date"
            value={injury.injuryDate}
            onChange={inputChange}
          />
        </label>
        <label>
          Time of injury:{" "}
          <input
            name="injuryTime"
            type="time"
            value={injury.injuryTime}
            onChange={inputChange}
          />
        </label>
        {inputMap}
        <input className="submit" type="submit" onClick={addInjury} />
      </div>
    </div>
  );
}

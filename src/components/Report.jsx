import { useState } from "react";
import map from "../assets/body-map.png";

export default function Report() {
  //manage state for injury count
  const [circles, setCircles] = useState([]);

  const getClickCoords = (event) => {
    var e = event.target;
    var dim = e.getBoundingClientRect();
    var x = event.clientX - dim.left;
    var y = event.clientY - dim.top;
    return [x, y];
  };

  const addCircle = (event) => {
    // get click coordinates
    let [x, y] = getClickCoords(event);

    // make new svg circle element
    let newCircle = { id: circles.length + 1, x: x, y: y };

    // update the array of circles
    let allCircles = [...circles, newCircle];

    // update 'circles'
    setCircles(allCircles);
  };

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
        Details for injury {item.id}: <textarea name="injuryTime" />
      </label>
    );
  });

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
          Name of reporter: <input name="reporterName" />
        </label>
        <label>
          Date of injury: <input name="injuryDate" />
        </label>
        <label>
          Time of injury: <input name="injuryTime" />
        </label>
        {inputMap}
      </div>
    </div>
  );
}

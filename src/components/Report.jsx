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

  //manage state for submit
  let [submit, setSubmit] = useState(false);

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
    let newDetail = { id: name, details: value }; //create new obj to insert

    let objIndex = details.findIndex((obj) => obj.id == name); //find the obj if exists with the given id

    //if the obj already exists, if yes then edit it else insert a new obj
    details.some((obj) => obj.id == name)
      ? //update existing obj
        (details[objIndex].details = value)
      : //insert new obj
        setDetails((prevState) => [...prevState, newDetail]);
  }

  //handle add injury
  function addInjury() {
    setInjury((prevState) => ({
      ...prevState,
      circles: circles,
      details: details,
    }));
    setSubmit((prevState) => !prevState);
  }

  //map the final injury details from injury object
  let detailsMap =
    submit &&
    injury.details.map((item) => {
      return (
        <div className="details--final" key={item.id}>
          <p>Injury {item.id}</p>
          <p>{item.details}</p>
        </div>
      );
    });

  //handle upload
  function uploadInjury() {
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
      {submit ? (
        <div className="details--container">
          <p>Name of the reporter: {injury.name}</p>
          <p>Date of injury: {injury.injuryDate}</p>
          <p>Time of injury: {injury.injuryTime}</p>
          {detailsMap}
          <button
            className="edit"
            onClick={() => setSubmit((prevState) => !prevState)}
          >
            Edit
          </button>
          <button className="upload" onClick={uploadInjury}>
            Upload
          </button>
        </div>
      ) : (
        <div className="details--container">
          <label>
            Name of the reporter:{" "}
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
      )}
    </div>
  );
}

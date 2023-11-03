import { useState } from "react";
import { useNavigate } from "react-router-dom";
import map from "../assets/body-map.png";
import deleteIcon from "../assets/delete.svg";
import { addInjury } from "./API";

export default function Report() {
  let navigate = useNavigate();

  //manage state for injury
  let [injury, setInjury] = useState({
    name: "",
    injuryTime: "",
    reportTime: "",
    injuryDate: "",
    reportDate: "",
    circles: [],
  });

  //manage state for submit
  let [submit, setSubmit] = useState(false);

  //manage state for circle count
  let [circles, setCircles] = useState([]);

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
    let newCircle = { id: circles.length + 1, x: x, y: y, details: "" };

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
      <div key={item.id} className="textarea--container">
        <label className="input--label">
          Injury {item.id}:{" "}
          <textarea
            name={`${item.id}`}
            className="details--textarea"
            type="text"
            placeholder="Enter details here"
            value={item.details}
            onChange={detailsChange}
          />
        </label>
        {item.id === circles.length && (
          <img
            className="card--icon"
            src={deleteIcon}
            onClick={handleDelete}
            alt="delete"
          ></img>
        )}
      </div>
    );
  });

  //handle input delete
  function handleDelete() {
    let newArr = circles.filter((item) => item.id != circles.length);
    setCircles(newArr);
  }

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

    //update details in obj
    let newArr = [...circles]; // copying the old circles array

    newArr[name - 1].details = value;

    setCircles(newArr);
  }

  //handle add injury
  function handleSubmit() {
    let fullDate = new Date();

    let date = fullDate.getDate();
    let month = fullDate.getMonth() + 1;
    let year = fullDate.getFullYear();

    let reportDate = year + "-" + month + "-" + date;

    let hours = fullDate.getHours();
    let minutes = fullDate.getMinutes();

    let reportTime = hours + ":" + minutes;

    setInjury((prevState) => ({
      ...prevState,
      circles: circles,
      reportDate: reportDate,
      reportTime: reportTime,
    }));

    setSubmit((prevState) => !prevState);
  }

  //map the final injury details from injury object
  let detailsMap =
    submit &&
    injury.circles.map((item) => {
      return (
        <div className="details--final" key={item.id}>
          <p className="details--final__head">Injury {item.id}</p>
          <p className="details--final__body">{item.details}</p>
        </div>
      );
    });

  //handle upload
  function handleUpload() {
    addInjury(injury)
      .then((response) => response.json())
      .then((result) => result.message === "OK" && navigate("/"));
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
          <p className="detail--name">Name of the reporter: {injury.name}</p>
          <p className="detail--date">Date of injury: {injury.injuryDate}</p>
          <p className="detail--time">Time of injury: {injury.injuryTime}</p>
          {detailsMap}
          <button
            className="edit"
            onClick={() => setSubmit((prevState) => !prevState)}
          >
            Edit
          </button>
          <button className="upload" onClick={handleUpload}>
            Upload
          </button>
        </div>
      ) : (
        <div className="details--container">
          <label className="input--label">
            Name of the reporter:{" "}
            <input
              name="name"
              className="details--input"
              type="text"
              placeholder="First name Last name"
              value={injury.name}
              onChange={inputChange}
            />
          </label>
          <label className="input--label">
            Date of injury:{" "}
            <input
              name="injuryDate"
              className="details--input"
              type="date"
              value={injury.injuryDate}
              onChange={inputChange}
            />
          </label>
          <label className="input--label">
            Time of injury:{" "}
            <input
              name="injuryTime"
              className="details--input"
              type="time"
              value={injury.injuryTime}
              onChange={inputChange}
            />
          </label>
          {inputMap}
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

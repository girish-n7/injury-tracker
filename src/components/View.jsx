import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "./API";
import map from "../assets/body-map.png";

export default function Report() {
  let navigate = useNavigate();

  //get id from route parameters
  let { id } = useParams();

  //manage state for injury
  let [injury, setInjury] = useState();

  //call backend api to get required injury using id
  useEffect(() => {
    getById(id)
      .then((response) => response.json())
      .then((result) => setInjury(result))
      .catch((err) => console.error(err));
  }, [id]);

  //create circlesMap
  let circlesMap = injury?.circles.map((item) => {
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

  //   map the final injury details from injury object
  let detailsMap = injury?.details.map((item) => {
    return (
      <div className="details--final" key={item.id}>
        <p>Injury {item.id}</p>
        <p>{item.details}</p>
      </div>
    );
  });

  return (
    injury && (
      <div className="report--container">
        <div
          className="report--map"
          style={{ backgroundImage: `url(${map})`, position: "relative" }}
        >
          {circlesMap}
        </div>
        <div className="details--container">
          <p>Name of the reporter: {injury.name}</p>
          <p>Date of injury: {injury.injuryDate}</p>
          <p>Time of injury: {injury.injuryTime}</p>
          {detailsMap}
          <button className="edit" onClick={() => navigate(`/edit/${id}`)}>
            Edit
          </button>
        </div>
      </div>
    )
  );
}

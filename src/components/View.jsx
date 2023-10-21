import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "./API";
import map from "../assets/body-map.png";

export default function View() {
  let navigate = useNavigate();

  //get id from route parameters
  let { id } = useParams();

  //manage state for injury
  let [injury, setInjury] = useState(null);

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
  let detailsMap = injury?.circles.map((item) => {
    return (
      <div className="details--final" key={item.id}>
        <p className="details--final__head">Injury {item.id}</p>
        <p className="details--final__body">{item.details}</p>
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
          <p className="detail--name">Name of the reporter: {injury.name}</p>
          <p className="detail--date">Date of injury: {injury.injuryDate}</p>
          <p className="detail--time">Time of injury: {injury.injuryTime}</p>
          {detailsMap}
          <button className="edit" onClick={() => navigate(`/edit/${id}`)}>
            Edit
          </button>
        </div>
      </div>
    )
  );
}

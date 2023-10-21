/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { deleteInjury } from "./API";

export default function HomeCard({
  id,
  name,
  injuryDate,
  injuryTime,
  reportTime,
  reportDate,
}) {
  let navigate = useNavigate();

  //handle injury deletion
  function handleDelete() {
    deleteInjury(id)
      .then((response) => response.json())
      .then(
        (result) =>
          result.message === "OK" && alert("Item deleted!")
            ? null
            : location.reload() //reload page after user clicks OK, to re-fetch from api
      )
      .catch((err) => console.error(err));
  }

  return (
    <div className="card--border">
      <div className="card--left">
        <p className="card--title">Reported by: {name}</p>
        <p className="injury--date">Injury date: {injuryDate}</p>
        <p className="injury--time">Injury time: {injuryTime}</p>
        <p className="card--reported">
          Reported on : {reportDate} at {reportTime}
        </p>
      </div>
      <div className="card--buttons">
        <button className="card--btn" onClick={() => navigate(`/view/${id}`)}>
          View
        </button>
        <button className="card--btn" onClick={() => navigate(`/edit/${id}`)}>
          Edit
        </button>
        <button className="card--btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

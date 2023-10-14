/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

export default function HomeCard({
  id,
  name,
  injuryDate,
  injuryTime,
  reportTime,
  reportDate,
}) {
  let navigate = useNavigate();

  function handleEdit() {
    console.log("Edit" + id);
  }

  function handleDelete() {
    console.log("Delete" + id);
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
        <button className="card--btn" onClick={handleEdit}>
          Edit
        </button>
        <button className="card--btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

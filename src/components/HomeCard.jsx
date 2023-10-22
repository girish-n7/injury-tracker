/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { deleteInjury } from "./API";
import viewIcon from "../assets/view.svg";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";

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
  function handleDelete(e) {
    e.stopPropagation();
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
    <div className="card--border" onClick={() => navigate(`/view/${id}`)}>
      <div className="card--left">
        <p className="card--title">Reported by: {name}</p>
        <p className="injury--date">Injury date: {injuryDate}</p>
        <p className="injury--time">Injury time: {injuryTime}</p>
        <p className="card--reported">
          Reported on : {reportDate} at {reportTime}
        </p>
      </div>
      <div className="card--buttons">
        <img
          className="card--icon"
          src={viewIcon}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/view/${id}`);
          }}
          alt="view"
        ></img>
        <img
          className="card--icon"
          src={editIcon}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit/${id}`);
          }}
          alt="edit"
        ></img>
        <img
          className="card--icon"
          src={deleteIcon}
          onClick={handleDelete}
          alt="delete"
        ></img>
      </div>
    </div>
  );
}

/* eslint-disable react/prop-types */

import { useState } from "react";
import arrow from "../assets/up.svg";

export default function Sort({ updateSort }) {
  //manage state for sort div
  let [sortDiv, setSortDiv] = useState(false);

  //create array for sort
  let sortArr = [
    "Injured date: Newest first",
    "Injured date: Oldest first",
    "Reported date: Newest first",
    "Reported date: Oldest first",
  ];

  //map the array into sort options
  let sortMap = sortArr.map((item) => {
    return (
      <p
        key={item}
        className="sort"
        onClick={() => {
          setSortDiv((prevState) => !prevState);
          updateSort(item);
        }}
      >
        {item}
      </p>
    );
  });

  return (
    <div className="sort--container">
      <p className="sort--prompt">
        Sort
        <img
          className="arrow"
          src={arrow}
          style={{
            transform: `${sortDiv ? "rotate(0deg)" : "rotate(180deg)"}`,
          }}
          onClick={() => setSortDiv((prevState) => !prevState)}
          alt="arrow"
        ></img>
      </p>
      {sortDiv && <div className="sort--div">{sortMap}</div>}
    </div>
  );
}

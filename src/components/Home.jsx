import { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import { fetchAll } from "./API";

export default function Home() {
  //manage state for result
  let [result, setResult] = useState(null);

  useEffect(() => {
    fetchAll()
      .then((response) => response.json())
      .then((response) => setResult(response))
      .catch((err) => console.error(err));
  }, []);

  //map the results into cards
  let resultMap = result?.map((item) => {
    //only map the array when array length !=0 by using arr?.map
    return (
      <HomeCard
        key={item._id}
        id={item._id}
        name={item.name}
        injuryTime={item.injuryTime}
        injuryDate={item.injuryDate}
        reportTime={item.reportTime}
        reportDate={item.reportDate}
      />
    );
  });

  return (
    result && (
      <div className="home--container">
        <div></div>
        <div className="home--cards">{resultMap}</div>
      </div>
    )
  );
}

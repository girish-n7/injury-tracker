import { useEffect, useState } from "react";
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

  return (
    result && (
      <div className="home--container">
        {result.name}, {result.date}
      </div>
    )
  );
}

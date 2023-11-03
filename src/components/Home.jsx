import { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import HomeInfo from "./HomeInfo";
import Sort from "./Sort";
import Filter from "./Filter";
import { fetchAll } from "./API";

export default function Home() {
  //manage state for result
  let [result, setResult] = useState(null);

  //fetch all injuries
  useEffect(() => {
    fetchAll()
      .then((response) => response.json())
      .then((response) => setResult(response))
      .catch((err) => console.error(err));
  }, []);

  //manage state for filter
  let [filter, setFilter] = useState({
    filterType: "injury",
    startDate: "",
    endDate: "",
  });

  //manage state for sort
  let [sort, setSort] = useState(null);

  //manage stat for search query
  let [query, setQuery] = useState("");

  //handle filter update
  function updateFilter(e) {
    let { name, value } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  //handle sort update
  function updateSort(item) {
    setSort(item);
  }

  //filter result

  let filterRes =
    filter.startDate && filter.endDate
      ? filter.filterType === "injury"
        ? result?.filter(
            (item) =>
              Date.parse(item.injuryDate + "T" + item.injuryTime) >=
                Date.parse(filter.startDate) &&
              Date.parse(item.injuryDate + "T" + item.injuryTime) <=
                Date.parse(filter.endDate)
          )
        : result?.filter(
            (item) =>
              Date.parse(item.reportDate + "T" + item.reportTime) >=
                Date.parse(filter.startDate) &&
              Date.parse(item.reportDate + "T" + item.reportTime) <=
                Date.parse(filter.endDate)
          )
      : result;
  //sort result

  filterRes && //conditionally render sort after fetching data
    sort && //conditionally render sort function if sorting method is selected
    filterRes.sort((a, b) => {
      return sort === "Injured date: Newest first"
        ? Date.parse(b.injuryDate + "T" + b.injuryTime) -
            Date.parse(a.injuryDate + "T" + a.injuryTime)
        : sort === "Injured date: Oldest first"
        ? Date.parse(a.injuryDate + "T" + a.injuryTime) -
          Date.parse(b.injuryDate + "T" + b.injuryTime)
        : sort === "Reported date: Oldest first"
        ? Date.parse(a.reportDate + "T" + a.reportTime) -
          Date.parse(b.reportDate + "T" + b.reportTime)
        : Date.parse(b.reportDate + "T" + b.reportTime) -
          Date.parse(a.reportDate + "T" + a.reportTime);
    });

  //map the result into cards
  let cardMap = filterRes
    ?.filter((item) => {
      //filter the array based on search query
      if (query === "") {
        //if query is empty
        return item;
      } else if (item.name.toLowerCase().includes(query.toLowerCase())) {
        //returns filtered array
        return item;
      }
    })
    ?.map((item) => {
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
        <div className="home--head">
          <input
            className="home--search"
            placeholder="Enter the name to search"
            title="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <Filter filter={filter} updateFilter={updateFilter} />
          <Sort updateSort={updateSort} />
        </div>
        {sort && (
          <p className="sortby">
            Sort by {sort}{" "}
            <button className="sort--clear" onClick={() => setSort(null)}>
              Clear sort
            </button>
          </p>
        )}
        <HomeInfo />
        <div className="home--cards">{cardMap}</div>
      </div>
    )
  );
}

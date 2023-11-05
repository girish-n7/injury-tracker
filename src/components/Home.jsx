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
  let filterDefault = {
    filterType: "injury",
    startDate: "",
    endDate: "",
  };
  let [filter, setFilter] = useState(filterDefault);

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

  //clear filter
  function clearFilter() {
    setFilter(filterDefault);
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
      return sort === "Injury date: Newest first"
        ? Date.parse(b.injuryDate + "T" + b.injuryTime) -
            Date.parse(a.injuryDate + "T" + a.injuryTime)
        : sort === "Injury date: Oldest first"
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
    filterRes && (
      <div className="home--container">
        <div className="home--head">
          <input
            className="home--search"
            placeholder="Enter the name to search"
            title="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <Filter
            filter={filter}
            updateFilter={updateFilter}
            clearFilter={clearFilter}
          />
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
        <p
          className="card--title"
          style={{ textTransform: "uppercase", marginTop: "20px" }}
        >
          Injuries reported:
        </p>
        <hr
          style={{
            margin: "10px auto",
            border: "none",
            borderBottom: "1px solid var(--primary)",
          }}
        />

        {filterRes.length != 0 ? (
          <div className="home--cards">{cardMap} </div>
        ) : (
          <p
            style={{
              fontSize: "1rem",
              color: "grey",
              textAlign: "center",
              margin: "30px 0",
            }}
          >
            No data matches your filter range!
          </p>
        )}
      </div>
    )
  );
}

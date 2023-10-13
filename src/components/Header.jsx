import { useNavigate } from "react-router-dom";

export default function Header() {
  let navigate = useNavigate();

  //create array for navbar elements
  let navArr = [
    { name: "Home", route: "/" },
    { name: "Report", route: "/report" },
    { name: "Login/Register", route: "/login" },
  ];

  //map the array into navbar elements
  let navMap = navArr.map((item) => {
    return (
      <p
        key={item.name}
        className="nav--element"
        onClick={() => navigate(`${item.route}`)}
      >
        {item.name}
      </p>
    );
  });

  return (
    <header>
      <p className="header--title">Injury Tracker</p>
      <div className="nav--container">{navMap}</div>
    </header>
  );
}

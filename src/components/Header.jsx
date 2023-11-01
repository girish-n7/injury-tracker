import Navbar from "./Navbar";

export default function Header() {
  //create array for navbar elements
  let navArr = [
    { name: "Home", route: "/" },
    { name: "Report", route: "/report" },
  ];

  return (
    <header>
      <p className="header--title">Injury Tracker</p>
      <Navbar navArr={navArr} />
    </header>
  );
}

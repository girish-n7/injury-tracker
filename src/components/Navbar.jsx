/* eslint-disable react/prop-types */

import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SignupButton from "./SignupButton";

export default function Navbar({ navArr }) {
  const { isAuthenticated } = useAuth0();

  let navigate = useNavigate();

  //map the nav array into navbar elements
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
    <div className="nav--container">
      {navMap}
      {!isAuthenticated && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <LogoutButton />
        </>
      )}
      <a
        className="nav--element contact"
        href="https://github.com/girish-n7/portfolio_v2"
      >
        Contact
      </a>
    </div>
  );
}

import { Routes, Route } from "react-router-dom";
import { AuthenticationGuard } from "./AuthenticationGuard";
import Home from "./Home";
import Report from "./Report";
import View from "./View";
import Edit from "./Edit";

export default function SwitchPage() {
  return (
    <Routes key={location.pathname}>
      <Route exact path="/" element={<Home />} />
      <Route
        exact
        path="/report"
        element={<AuthenticationGuard component={Report} />}
      />
      <Route
        exact
        path="/view/:id"
        element={<AuthenticationGuard component={View} />}
      />
      <Route
        exact
        path="/edit/:id"
        element={<AuthenticationGuard component={Edit} />}
      />
    </Routes>
  );
}

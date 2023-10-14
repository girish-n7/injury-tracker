import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Report from "./Report";
import View from "./View";

export default function SwitchPage() {
  return (
    <Routes key={location.pathname}>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/report" element={<Report />} />
      <Route exact path="/view/:id" element={<View />} />
    </Routes>
  );
}

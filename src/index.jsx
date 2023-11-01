import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import Auth0ProviderWithNavigate from "./auth0-provider-with-navigate";
import App from "./App.jsx";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </HashRouter>
  </React.StrictMode>
);

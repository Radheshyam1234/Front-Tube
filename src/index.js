import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import { makeServer } from "./server";

import { VideosDataProvider } from "./Context/VideosDataContext/VideosDataProvider";
import { StateProvider } from "./Context/StateContext";
import { AuthProvider } from "./Context/AuthContext/AuthProvider";

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <StateProvider>
          <VideosDataProvider>
            <App />
          </VideosDataProvider>
        </StateProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

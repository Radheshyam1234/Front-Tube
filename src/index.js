import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import { makeServer } from "./server";

import { VideosDataProvider } from "./Context/VideosDataContext/VideosDataProvider";

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <VideosDataProvider>
        <App />
      </VideosDataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

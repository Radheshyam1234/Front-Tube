import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";

import { VideosDataProvider } from "./Context/VideosDataContext/VideosDataProvider";

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

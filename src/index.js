import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import { makeServer } from "./server";

import { VideosDataProvider } from "./Context/VideosDataContext/VideosDataProvider";
import { StateProvider } from "./Context/StateContext";

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StateProvider>
        <VideosDataProvider>
          <App />
        </VideosDataProvider>
      </StateProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

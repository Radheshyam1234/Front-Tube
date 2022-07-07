import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";

import { VideosDataProvider } from "./Context/VideosDataContext/VideosDataProvider";
import { StateProvider } from "./Context/StateContext";
import { AuthProvider } from "./Context/AuthContext/AuthProvider";
import { ToastProvider } from "./Context/ToastContext/ToastProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ToastProvider>
        <AuthProvider>
          <StateProvider>
            <VideosDataProvider>
              <App />
            </VideosDataProvider>
          </StateProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

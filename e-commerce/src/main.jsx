import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./CSS/component/form.css";
import "./CSS/component/button.css";
import "./CSS/component/alerts.css";
import "./CSS/component/google.css";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import MenuContext from "./Context/MenuContext.jsx";
import WindowContext from "./Context/WindowContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <App />
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);

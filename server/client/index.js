import React from "react";
import App from "./App";
import {createRoot} from "react-dom/client";
import "./static/styles/basic_styles.css";
import "./static/styles/baselayout_styles.css";
import "./static/styles/auth_styles.css";
import "./static/styles/controlpanel_styles.css";
import "./static/styles/create_styles.css";
import "./static/styles/edit_styles.css";
import "./static/styles/mainpage_styles.css";
import "./static/styles/detailview_styles.css";



const root = document.getElementById('root');
const reactRoot = createRoot(root)

reactRoot.render(<App/>)
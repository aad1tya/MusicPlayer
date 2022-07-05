import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import "./css/all.css";
import "./BScss/bootstrap.min.css";
import Login from "./Login";
import Dashboard from "./Dashboard";

const code = new URLSearchParams(window.location.search).get("code");



function App()
{
    return code ? <Dashboard code={code} /> : <Login />
}



ReactDOM.render(<App />, document.querySelector("#root"));
import React from "react";
import logo from "./logo.svg";
import "./Standings.css";

function Standings() {
	return (
		<div className="App">
			<img src={logo} className="App-logo" alt="logo" />
			<p>
				Edit <code>src/App.tsx</code> and save to reload.
			</p>
			<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
			>
				This is the Standings page
			</a>
		</div>
	);
}

export default Standings;

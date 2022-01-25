/*global chrome*/
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
	const [url, setUrl] = useState("");
	const [gameID, setGameID] = useState("");

	function detect_game(link: string) {
		const fail = "";
		if (link.includes("mlb.com")) {
			const result = link.match(/\/g([0-9]+)\//);
			setGameID(result ? result[1] : fail);
			console.log(gameID);
			// regex = \/g([0-9]+)\/
		}
	}

	return (
		<div className="App">
			<header className="App-header">
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
					Learn React
				</a>

				{chrome.tabs.query(
					{ active: true, lastFocusedWindow: true },
					(tabs) => {
						setUrl(tabs[0].url || "");
						detect_game(url);
					}
				)}
				{url}
				{gameID}
			</header>
		</div>
	);
}

export default App;

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Live from "./components/Live";
import "./App.css";
import Standings from "./components/Standings";
import Navigation from "./components/NavBar";
import Settings from "./components/Settings";
import { ServersType } from "./Types";

function App() {
	const servers_default: ServersType = {
		pybaseball: "http://127.0.0.1:5000/",
	};

	const [servers, setServers] = useState<ServersType>(servers_default);

	return (
		<div className="App">
			<div className="Content">
				<Routes>
					<Route path="/" element={<Live />} />
					<Route
						path="/standings"
						element={<Standings servers={servers} />}
					/>
					<Route
						path="/settings"
						element={
							<Settings
								servers={servers}
								setServers={setServers}
							/>
						}
					/>
				</Routes>
				{servers.pybaseball}
			</div>
			<Navigation />
		</div>
	);
}

export default App;

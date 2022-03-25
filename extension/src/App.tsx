import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Live from "./components/Live";
import Standings from "./components/Standings";
import Navigation from "./components/NavBar";
import Settings from "./components/Settings";
import { ServersType } from "./types/App_Types";
import Player from "./components/Player";

function App() {
	const servers_default: ServersType = {
		pybaseball: "http://127.0.0.1:5001/",
		mlbstats: "http://127.0.0.1:5000/",
	};

	const [servers, setServers] = useState<ServersType>(servers_default);

	return (
		<div className="tw-items-center tw-bg-app-dark tw-w-full tw-h-full tw-flex tw-flex-col tw-text-white tw-text-center tw-text-app-text">
			<div className="tw-w-full tw-h-9/10 tw-flex-1 tw-overflow-y-auto">
				<Routes>
					<Route path="/" element={<Live servers={servers} />} />
					<Route
						path="/player"
						element={<Player servers={servers} />}
					/>
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
			</div>
			<Navigation />
		</div>
	);
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Live from "./components/Live";
import Standings from "./components/Standings";
import Navigation from "./components/NavBar";
import Settings from "./components/Settings";
import { DetectType, ServersType } from "./types/App_Types";
import Player from "./components/Player";
import { useLocalStorage } from "usehooks-ts";
import useLocalStorageExpire from "./hooks/useLocalStorageExpire";

function App() {
	const servers_default: ServersType = {
		pybaseball: "https://baseballbrowserextension.herokuapp.com/",
	};

	const [servers, setServers] = useLocalStorage<ServersType>(
		"servers",
		servers_default
	);
	// 4 hours * 60min/hour * 60 seconds/min * 1000 ms/second = 4 hr expiration time in ms
	const [detect, setDetect] = useLocalStorageExpire<DetectType>(
		"detect",
		{ id: "auto", gameString: "Automatically Detect" },
		4 * 60 * 60 * 1000
	);

	return (
		<div className="tw-items-center tw-bg-app-dark tw-w-full tw-h-full tw-flex tw-flex-col tw-text-white tw-text-center tw-text-app-text">
			<div className="tw-w-full tw-h-9/10 tw-flex-1 tw-overflow-y-auto">
				<Routes>
					<Route path="/" element={<Live detect={detect} />} />
					<Route
						path="/player"
						element={<Player servers={servers} />}
					/>
					<Route path="/standings" element={<Standings />} />
					<Route
						path="/settings"
						element={
							<Settings
								servers={servers}
								setServers={setServers}
								detect={detect}
								setDetect={setDetect}
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

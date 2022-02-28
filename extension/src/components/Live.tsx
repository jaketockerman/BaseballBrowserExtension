/*global chrome*/
import React, { useEffect, useState } from "react";

function Live() {
	const [url, setUrl] = useState("");
	const [gameID, setGameID] = useState("");

	function detect_game(link: string) {
		const fail = "";
		if (link.includes("mlb.com")) {
			const result = link.match(/\/g([0-9]+)\//);
			setGameID(result ? result[1] : fail);
		}
	}

	useEffect(() => {
		try {
			chrome.tabs.query(
				{ active: true, lastFocusedWindow: true },
				(tabs) => {
					setUrl(tabs[0].url || "");
					detect_game(url);
				}
			);
		} catch (e) {
			console.log("unable to detect url due to error " + e);
		}
	});
	return (
		<div className="tw-flex tw-flex-col tw-h-full tw-items-center tw-justify-center">
			<div>This is the live page</div>
			<div> URL: {url} </div>
			<div> Game ID: {gameID}</div>
		</div>
	);
}

export default Live;

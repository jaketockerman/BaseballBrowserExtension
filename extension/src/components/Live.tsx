/*global chrome*/
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ServersType } from "../types/App_Types";
import PropTypes, { InferProps } from "prop-types";
// import { NumberLiteralType } from "typescript";
import {
	gameData_Response,
	gameData_Type,
	liveData_Response,
	player_Type,
} from "../types/Live_Types";
import { useInterval } from "usehooks-ts";

Live.propTypes = {
	servers: PropTypes.object.isRequired as never as ServersType,
};

function Live(props: InferProps<typeof Live.propTypes>) {
	const [url, setUrl] = useState("");
	const [gameID, setGameID] = useState(""); //634198 Example Game
	const [gameData, setGameData] = useState<gameData_Type>();
	const [players, setPlayers] = useState<Array<player_Type>>();
	const [liveDelay, setLiveDelay] = useState(100);
	const [gameDelay, setGameDelay] = useState<number | null>(500);
	useInterval(() => {
		if (gameID !== "") {
			axios
				.get<gameData_Response>(
					props.servers.mlbstats + "gameData/" + gameID
				)
				.then((response) => {
					setGameData(response.data.result);
					setPlayers(Object.values(response.data.result["players"]));
					setGameDelay(null);
				})
				.catch((error: AxiosError<{ additionalInfo: string }>) => {
					if (error.response?.status != 200) {
						console.log(error.message);
					}
				});
		}
	}, gameDelay);
	useInterval(
		() => {
			if (gameID !== "") {
				axios
					.get<liveData_Response>(
						props.servers.mlbstats + "liveData/" + gameID
					)
					.then((response) => {
						response.data;
						setLiveDelay(10000);
					})
					.catch((error: AxiosError<{ additionalInfo: string }>) => {
						if (error.response?.status != 200) {
							console.log(error.message);
						}
					});
			}
		},
		// Delay in milliseconds or null to stop it
		liveDelay
	);

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
	const style = {
		borderRight: "1px solid",
		borderColor: "#FFFFFF",
	};
	return (
		<div>
			<div className="tw-flex tw-flex-row tw-w-full">
				<div
					className="tw-flex-1 tw-w-0 tw-border-r tw-border-white tw-items-center"
					style={style}
				>
					{" "}
					Home Team: {gameData?.teams.home.teamName}{" "}
				</div>
				<div
					className="tw-flex-1 tw-w-0 tw-border-r tw-border-white"
					style={style}
				>
					{" "}
					Strikezone:{" "}
				</div>
				<div className="tw-flex-1 tw-w-0">
					{" "}
					Away Team: {gameData?.teams.away.teamName}{" "}
				</div>
			</div>
			<div className="tw-flex tw-flex-col tw-h-full tw-items-center tw-justify-center">
				<div> URL: {url} </div>
				<div> player: {players?.map} </div>
			</div>
		</div>
	);
}

export default Live;

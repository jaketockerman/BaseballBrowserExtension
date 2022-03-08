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
	liveData_Type,
	player_Type,
} from "../types/Live_Types";
import { useInterval } from "usehooks-ts";

Live.propTypes = {
	servers: PropTypes.object.isRequired as never as ServersType,
};

function Live(props: InferProps<typeof Live.propTypes>) {
	const [url, setUrl] = useState("");
	const [gameID, setGameID] = useState("634198"); //634198 Example Game
	const [gameData, setGameData] = useState<gameData_Type>();
	const [liveData, setLiveData] = useState<liveData_Type>();
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
						//console.log(response.data); 
						setLiveData(response.data.result);
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
	//console.log(liveData);

	function display_batting_order(id: Array<number>) {
		const playerID = id[0];
		// const name = player.fullName;
		// console.log(name);

		return(
			<div> 1st Batter: {gameData?.players["ID" + playerID].fullName} </div>
		);
	}

	return (
		<div>
			<div className="tw-flex tw-flex-row tw-w-full">
				<div
					className="tw-flex-1 tw-w-0 tw-border-r tw-border-white tw-items-center"
					style={style}
				>
					{" "}
					Away Team: {gameData?.teams.away.teamName}{" "}
					<div> 1st Batter: {liveData?.boxscore?.teams?.away?.battingOrder[0]} </div>
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
					Home Team: {gameData?.teams.home.teamName}{" "}
					{display_batting_order(liveData?.boxscore?.teams?.home?.battingOrder ? liveData?.boxscore?.teams?.home?.battingOrder : [] )}
				</div>
			</div>
			<div className="tw-flex tw-flex-col tw-h-full tw-items-center tw-justify-center">
				<div> URL: {url} </div>
			</div>
		</div>
	);
}

export default Live;

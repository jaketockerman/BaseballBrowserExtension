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
	playerID,
} from "../types/Live_Types";
import { useInterval } from "usehooks-ts";
import { Accordion } from "react-bootstrap";

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

	function display_Name(playerIDNum: number, index: number) {
		return (
			<div>
				{" "}
				{index + 1}:{" "}
				{gameData?.players[("ID" + playerIDNum) as playerID].fullName}{" "}
			</div>
		);
	}

	function display_batting_order(id: Array<number>) {
		return id.map((playerID: number, index: number) => {
			return display_Name(playerID, index);
		});
	}

	function display_Bench_Name(playerIDNum: number) {
		return (
			<div>
				{" "}
				{
					gameData?.players[("ID" + playerIDNum) as playerID].fullName
				}{" "}
			</div>
		);
	}

	function display_bench(id: Array<number>) {
		return id.map((playerID: number) => {
			return display_Bench_Name(playerID);
		});
	}

	function display_Bullpen_Name(playerIDNum: number) {
		return (
			<div>
				{" "}
				{
					gameData?.players[("ID" + playerIDNum) as playerID].fullName
				}{" "}
			</div>
		);
	}

	function display_bullpen(id: Array<number>) {
		return id.map((playerID: number) => {
			return display_Bullpen_Name(playerID);
		});
	}

	console.log(players); //CAN DELETE LATER IF PLAYERS NOT NEEDED

	return (
		<div>
			<div className="tw-flex tw-flex-row tw-w-full">
				<div
					className="tw-flex-1 tw-w-0 tw-border-r tw-border-white tw-items-center"
					style={style}
				>
					{" "}
					Away Team: {gameData?.teams.away.teamName}{" "}
					<Accordion className="tw-mt-5">
						<Accordion.Item eventKey="0">
							<Accordion.Header>Lineup</Accordion.Header>
							<Accordion.Body className="tw-text-white tw-bg-[#282c34] tw-border-none">
								{display_batting_order(
									liveData?.boxscore?.teams?.away
										?.battingOrder
										? liveData?.boxscore?.teams?.away
												?.battingOrder
										: []
								)}
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item
							eventKey="1"
							className="tw-mt-3 tw-bg-[#282c34]"
						>
							<Accordion.Header>Bench</Accordion.Header>
							<Accordion.Body className="tw-text-white tw-bg-[#282c34] tw-border-none">
								{display_bench(
									liveData?.boxscore?.teams?.away?.bench
										? liveData?.boxscore?.teams?.away?.bench
										: []
								)}
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item
							eventKey="3"
							className="tw-mt-3 tw-bg-[#282c34]"
						>
							<Accordion.Header>Bullpen</Accordion.Header>
							<Accordion.Body className="tw-text-white tw-bg-[#282c34] tw-border-none">
								{display_bullpen(
									liveData?.boxscore?.teams?.away?.bullpen
										? liveData?.boxscore?.teams?.away
												?.bullpen
										: []
								)}
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
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
					<Accordion className="tw-mt-5">
						<Accordion.Item eventKey="0">
							<Accordion.Header className="tw-text-white tw-bg-[#282c34]">
								Lineup
							</Accordion.Header>
							<Accordion.Body className="tw-text-white tw-bg-[#282c34]">
								{display_batting_order(
									liveData?.boxscore?.teams?.home
										?.battingOrder
										? liveData?.boxscore?.teams?.home
												?.battingOrder
										: []
								)}
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1">
							<Accordion.Header>Bench</Accordion.Header>
							<Accordion.Body className="tw-text-white tw-bg-[#282c34]">
								{display_bench(
									liveData?.boxscore?.teams?.home?.bench
										? liveData?.boxscore?.teams?.home?.bench
										: []
								)}
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="3">
							<Accordion.Header>Bullpen</Accordion.Header>
							<Accordion.Body className="tw-text-white tw-bg-[#282c34]">
								{display_bullpen(
									liveData?.boxscore?.teams?.home?.bullpen
										? liveData?.boxscore?.teams?.home
												?.bullpen
										: []
								)}
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</div>
			</div>
			<div className="tw-flex tw-flex-col tw-h-full tw-items-center tw-justify-center">
				<div> URL: {url} </div>
			</div>
		</div>
	);
}

export default Live;

/*global chrome*/
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ServersType } from "../types/App_Types";
import PropTypes, { InferProps } from "prop-types";
import { Stage, Layer, Rect, Circle, Text, Group, Line } from "react-konva";
// import { NumberLiteralType } from "typescript";

import {
	gameData_Response,
	gameData_Type,
	liveData_Response,
	liveData_Type,
	playerID,
	team_Type,
} from "../types/Live_Types";
import { useInterval } from "usehooks-ts";
import { Link } from "react-router-dom";
// import { render } from "react-dom";
// import { isAbsolute } from "path/posix";

// import { Accordion } from "react-bootstrap";

Live.propTypes = {
	servers: PropTypes.object.isRequired as never as ServersType,
};

function Live(props: InferProps<typeof Live.propTypes>) {
	const [url, setUrl] = useState("");
	const [gameID, setGameID] = useState(""); //634198 Example Game
	const [gameData, setGameData] = useState<gameData_Type>();
	const [liveData, setLiveData] = useState<liveData_Type>();
	const [liveDelay, setLiveDelay] = useState(100);
	const currPitcherID = liveData?.plays.currentPlay.matchup.pitcher.id;
	const currBatterID = liveData?.plays.currentPlay.matchup.batter.id;

	useEffect(() => {
		if (gameID) {
			axios
				.get<gameData_Response>(
					props.servers.mlbstats + "gameData/" + gameID
				)
				.then((response) => {
					setGameData(response.data.result);
				})
				.catch((error: AxiosError<{ additionalInfo: string }>) => {
					if (error.response?.status != 200) {
						console.log(error.message);
					}
				});
		}
	}, [gameID]);

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
		borderColor: "#525252",
	};

	function display_Name(
		playerIDNum: number,
		index: number,
		team: keyof team_Type
	) {
		return (
			<div>
				{index + 1}:
				<Link
					to={"/player"}
					state={{
						mlbamID: playerIDNum,
						playerInfo:
							gameData?.players[("ID" + playerIDNum) as playerID],
					}}
				>
					{" "}
					{
						gameData?.players[("ID" + playerIDNum) as playerID]
							.lastInitName
					}{" "}
				</Link>
				{"   "}
				<span className="tw-italic tw-text-gray-500">
					{
						liveData?.boxscore.teams[team].players[
							("ID" + playerIDNum) as playerID
						]?.position.abbreviation
					}
				</span>
			</div>
		);
	}

	function display_batting_order(id: Array<number>, team: keyof team_Type) {
		return id.map((playerID: number, index: number) => {
			return display_Name(playerID, index, team);
		});
	}

	function display_Bench_Name(playerIDNum: number, team: keyof team_Type) {
		return (
			<div>
				{" "}
				<Link
					to={"/player"}
					state={{
						mlbamID: playerIDNum,
						playerInfo:
							gameData?.players[("ID" + playerIDNum) as playerID],
					}}
				>
					{" "}
					{
						gameData?.players[("ID" + playerIDNum) as playerID]
							.lastInitName
					}{" "}
				</Link>
				{"   "}
				<span className="tw-italic tw-text-gray-500">
					{
						liveData?.boxscore.teams[team].players[
							("ID" + playerIDNum) as playerID
						]?.position.abbreviation
					}
				</span>
			</div>
		);
	}

	function display_bench(id: Array<number>, team: keyof team_Type) {
		return id.map((playerID: number) => {
			return display_Bench_Name(playerID, team);
		});
	}

	function display_Bullpen_Name(playerIDNum: number, team: keyof team_Type) {
		return (
			<div>
				{" "}
				<Link
					to={"/player"}
					state={{
						mlbamID: playerIDNum,
						playerInfo:
							gameData?.players[("ID" + playerIDNum) as playerID],
					}}
				>
					{" "}
					{
						gameData?.players[("ID" + playerIDNum) as playerID]
							.lastInitName
					}{" "}
				</Link>
				{"   "}
				<span className="tw-italic tw-text-gray-500">
					{
						liveData?.boxscore.teams[team].players[
							("ID" + playerIDNum) as playerID
						]?.position.abbreviation
					}
				</span>
			</div>
		);
	}

	function display_bullpen(id: Array<number>, team: keyof team_Type) {
		return id.map((playerID: number) => {
			return display_Bullpen_Name(playerID, team);
		});
	}

	function display_logo(teamId: number, teamName: string) {
		const link = `https://www.mlbstatic.com/team-logos/team-cap-on-dark/${teamId}.svg`;
		const altText = `${teamName} logo`;
		return (
			<div className="tw-pb-2 tw-pt-1">
				<img
					src={link}
					alt={altText}
					className="tw-max-w-12 tw-max-h-12"
				/>
			</div>
		);
	}

	function pitchInfo(index: number) {
		console.log(index);
	}

	function display_Pitch(
		index: number,
		height: number,
		width: number,
		strikezoneOffsetX: number,
		strikezoneOffsetZ: number,
		pitchNum: number
	) {
		const plateWidth = 17 / 12;
		// const call = liveData?.plays.currentPlay.playEvents[index].details.call?.description;
		// const strike = liveData?.plays.currentPlay.playEvents[index].details?.isStrike;
		// const pitchType = liveData?.plays.currentPlay.playEvents[index].details.type?.description;
		const ballColor =
			liveData?.plays.currentPlay.playEvents[index].details?.ballColor;
		// const pitchSpeed = liveData?.plays.currentPlay.playEvents[index].pitchData?.startSpeed;

		const strikezoneTop =
			liveData?.plays.currentPlay.playEvents[index].pitchData
				?.strikeZoneTop;
		const strikezoneBottom =
			liveData?.plays.currentPlay.playEvents[index].pitchData
				?.strikeZoneBottom;
		const strikezoneMiddle =
			strikezoneTop && strikezoneBottom
				? (strikezoneTop - strikezoneBottom) / 2 + strikezoneBottom
				: 0;
		const pitchX =
			liveData?.plays.currentPlay.playEvents[index].pitchData?.coordinates
				?.pX;
		const pitchZ =
			liveData?.plays.currentPlay.playEvents[index].pitchData?.coordinates
				?.pZ;
		const strikezoneZeroZ = height / 2 + strikezoneOffsetZ;
		const strikezoneZeroX = width / 2 + strikezoneOffsetX;
		if (pitchZ && pitchZ < 0) {
			//DEALING WITH BALLS IN THE DIRT
			return "";
		}
		const xLoc = pitchX ? (pitchX / (plateWidth / 2)) * (width / 2) : 0;
		const zLoc =
			pitchZ && strikezoneTop && strikezoneBottom
				? ((strikezoneMiddle - pitchZ) /
						((strikezoneTop - strikezoneBottom) / 2)) *
				  (height / 2)
				: 0;
		const x = xLoc + strikezoneZeroX;
		const z = zLoc + strikezoneZeroZ;
		return (
			<Group x={x} y={z} key={index}>
				<Circle
					radius={5}
					stroke={ballColor}
					fill={ballColor}
					onClick={() => {
						pitchInfo(index);
					}}
				/>
				<Text
					text={pitchNum.toString()}
					stroke="white"
					strokeWidth={1}
				/>
			</Group>
		);
	}

	function display_Strikezone() {
		//Display acutal strikezone grid before this
		const outs = liveData?.plays.currentPlay.count.outs;
		const balls = liveData?.plays.currentPlay.count.balls;
		const strikes = liveData?.plays.currentPlay.count.strikes;
		const height = 123;
		const width = 91.5;
		const stageWidth = 349;
		const stageHeight = 300;
		let pitchNum = 1;
		const strikezoneOffsetX = (stageWidth - width) / 2;
		const strikezoneOffsetY = (stageHeight - height) / 2 + 30;
		return (
			<div>
				<Stage width={stageWidth} height={stageHeight}>
					<Layer>
						{/* <Line
							points={[
								0,
								0,
								stageWidth,
								0,
							]}
							strokeWidth={3}
							stroke="red"
						/>
						<Line
							points={[
								0,
								0,
								0,
								stageHeight,
							]}
							strokeWidth={3}
							stroke="red"
						/>
						<Line
							points={[
								0,
								stageHeight,
								stageWidth,
								stageHeight,
							]}
							strokeWidth={3}
							stroke="red"
						/>
						<Line
							points={[
								stageWidth,
								0,
								stageWidth,
								stageHeight,
							]}
							strokeWidth={3}
							stroke="red"
						/> */}
						<Text
							text={balls?.toString() + "balls"}
							x={strikezoneOffsetX}
							y={20}
							stroke="white"
							strokeWidth={1}
						/>
						<Text
							text={strikes?.toString() + "strikes"}
							x={strikezoneOffsetX + 50}
							y={20}
							stroke="white"
							strokeWidth={1}
						/>
						<Text
							text={outs?.toString() + "outs"}
							x={strikezoneOffsetX + 100}
							y={20}
							stroke="white"
							strokeWidth={1}
						/>
						<Rect
							width={width}
							height={height}
							x={strikezoneOffsetX}
							y={strikezoneOffsetY}
							stroke="black"
							strokeWidth={2}
						/>
						<Line
							points={[
								strikezoneOffsetX,
								strikezoneOffsetY + height / 3,
								strikezoneOffsetX + width,
								strikezoneOffsetY + height / 3,
							]}
							strokeWidth={2}
							stroke="#525252"
						/>
						<Line
							points={[
								strikezoneOffsetX,
								strikezoneOffsetY + (2 * height) / 3,
								strikezoneOffsetX + width,
								strikezoneOffsetY + (2 * height) / 3,
							]}
							strokeWidth={2}
							stroke="#525252"
						/>
						<Line
							points={[
								strikezoneOffsetX + width / 3,
								strikezoneOffsetY,
								strikezoneOffsetX + width / 3,
								strikezoneOffsetY + height,
							]}
							strokeWidth={2}
							stroke="#525252"
						/>
						<Line
							points={[
								strikezoneOffsetX + (2 * width) / 3,
								strikezoneOffsetY,
								strikezoneOffsetX + (2 * width) / 3,
								strikezoneOffsetY + height,
							]}
							strokeWidth={2}
							stroke="#525252"
						/>
						{/* <Circle radius={5} x={99.5} y={114} stroke="red"/> */}
						{liveData?.plays.currentPlay.pitchIndex
							.filter((pitchIndex) => {
								return liveData?.plays.currentPlay.playEvents[
									pitchIndex
								].isPitch;
							})
							.map((index: number) => {
								return display_Pitch(
									index,
									height,
									width,
									strikezoneOffsetX,
									strikezoneOffsetY,
									pitchNum++
								);
							})}
					</Layer>
				</Stage>
			</div>
		);
	}

	return (
		<div className="tw-flex tw-flex-row tw-w-full tw-h-full">
			<div
				className="tw-flex-1 tw-w-0 tw-max-w-[25%] tw-border-r tw-border-neutral-600 tw-items-center tw-overflow-y-auto tw-h-full"
				style={style}
			>
				{" "}
				Away Team{" "}
				{
					/* prettier-ignore */
					gameData?.teams.away.id ? display_logo(gameData?.teams.away.id, gameData?.teams.away.name) : ""
				}
				<details>
					<summary className="tw-box-decoration-slice tw-bg-nav-blue tw-text-white">
						Lineup
						<span></span>
					</summary>
					<p className="tw-bg-[#eceef1] tw-text-black tw-p-0 tw-m-0">
						{display_batting_order(
							liveData?.boxscore?.teams?.away?.battingOrder
								? liveData?.boxscore?.teams?.away?.battingOrder
								: [],
							"away" as keyof team_Type
						)}
					</p>
				</details>
				<details>
					<summary className="tw-box-decoration-slice tw-bg-nav-blue tw-text-white">
						Bench
						<span></span>
					</summary>
					<p className="tw-bg-[#eceef1] tw-text-black tw-p-0 tw-m-0">
						{display_bench(
							liveData?.boxscore?.teams?.away?.bench
								? liveData?.boxscore?.teams?.away?.bench
								: [],
							"away" as keyof team_Type
						)}
					</p>
				</details>
				<details>
					<summary className="tw-box-decoration-slice tw-bg-nav-blue tw-text-white">
						Bullpen
						<span></span>
					</summary>
					<p className="tw-bg-[#eceef1] tw-text-black tw-p-0 tw-m-0">
						{display_bullpen(
							liveData?.boxscore?.teams?.away?.bullpen
								? liveData?.boxscore?.teams?.away?.bullpen
								: [],
							"away" as keyof team_Type
						)}
					</p>
				</details>
			</div>
			<div
				className="tw-flex-1 tw-w-0 tw-border-r tw-border-neutral-600 tw-h-full"
				style={style}
			>
				{" "}
				{display_Strikezone()}
				<div className="tw-text-sm">
					Batter:{" "}
					<Link
						to={"/player"}
						state={{
							mlbamID: currBatterID,
							playerInfo:
								gameData?.players[
									("ID" + currBatterID) as playerID
								],
						}}
						className="tw-text-white"
					>
						{liveData?.plays.currentPlay.matchup.batter.fullName}
					</Link>
				</div>
				<div className="tw-text-sm">
					Pitcher:{" "}
					<Link
						to={"/player"}
						state={{
							mlbamID: currPitcherID,
							playerInfo:
								gameData?.players[
									("ID" + currPitcherID) as playerID
								],
						}}
						className="tw-text-white"
					>
						{liveData?.plays.currentPlay.matchup.pitcher.fullName}
					</Link>
				</div>
				{/* <div>
					Count: {liveData?.plays.currentPlay.count.balls} - {liveData?.plays.currentPlay.count.strikes}
				</div> */}
				{/* <div>Outs: {liveData?.plays.currentPlay.count.outs}</div> */}
			</div>
			<div className="tw-flex-1 tw-w-0 tw-max-w-[25%] tw-h-full tw-overflow-y-auto">
				{" "}
				Home Team{" "}
				{
					/* prettier-ignore */
					gameData?.teams.home.id ? display_logo(gameData?.teams.home.id, gameData?.teams.away.name): ""
				}
				<details>
					<summary className="tw-box-decoration-slice tw-bg-nav-blue tw-text-white">
						Lineup
						<span></span>
					</summary>
					<p className="tw-bg-[#eceef1] tw-text-black tw-p-0 tw-m-0">
						{display_batting_order(
							liveData?.boxscore?.teams?.home?.battingOrder
								? liveData?.boxscore?.teams?.home?.battingOrder
								: [],
							"home" as keyof team_Type
						)}
					</p>
				</details>
				<details>
					<summary className="tw-box-decoration-slice tw-bg-nav-blue tw-text-white">
						Bench
						<span></span>
					</summary>
					<p className="tw-bg-[#eceef1] tw-text-black tw-p-0 tw-m-0">
						{display_bench(
							liveData?.boxscore?.teams?.home?.bench
								? liveData?.boxscore?.teams?.home?.bench
								: [],
							"home" as keyof team_Type
						)}
					</p>
				</details>
				<details>
					<summary className="tw-box-decoration-slice tw-bg-nav-blue tw-text-white">
						Bullpen
						<span></span>
					</summary>
					<p className="tw-bg-[#eceef1] tw-text-black tw-p-0 tw-m-0">
						{display_bullpen(
							liveData?.boxscore?.teams?.home?.bullpen
								? liveData?.boxscore?.teams?.home?.bullpen
								: [],
							"home" as keyof team_Type
						)}
					</p>
				</details>
			</div>
		</div>
	);
}

export default Live;

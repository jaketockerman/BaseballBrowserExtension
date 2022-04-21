/*global chrome*/
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ServersType } from "../types/App_Types";
import PropTypes, { InferProps } from "prop-types";
import { Stage, Layer, Rect, Circle, Text, Group, Line } from "react-konva";
import { useNavigate } from "react-router";
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
	const navigate = useNavigate();

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
					setUrl(tabs[0]?.url || "");
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
			<div className="tw-text-left tw-pl-2" key={playerIDNum}>
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
			<div className="tw-text-left tw-pl-2" key={playerIDNum}>
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
			<div className="tw-text-left tw-pl-2" key={playerIDNum}>
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
					className="tw-max-w-12 tw-max-h-12 tw-mx-auto"
				/>
			</div>
		);
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
		const ballColor =
			liveData?.plays.currentPlay.playEvents[index].details?.ballColor;
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
		const xLoc = pitchX ? (pitchX / (plateWidth / 2)) * (width / 2) : 0;
		const zLoc =
			pitchZ && strikezoneTop && strikezoneBottom
				? ((strikezoneMiddle - pitchZ) /
						((strikezoneTop - strikezoneBottom) / 2)) *
				  (height / 2)
				: 0;
		const x = xLoc + strikezoneZeroX;
		const z = zLoc + strikezoneZeroZ;
		if (pitchZ && pitchZ < 0) {
			//DEALING WITH BALLS IN THE DIRT
			return (
				<Group x={x} y={297} key={index}>
					<Circle radius={5} stroke={ballColor} fill={ballColor} />
					<Text
						text={pitchNum.toString()}
						stroke="white"
						strokeWidth={1}
					/>
				</Group>
			);
		}
		return (
			<Group x={x} y={z} key={index}>
				<Circle radius={5} stroke={ballColor} fill={ballColor} />
				<Text
					text={pitchNum.toString()}
					stroke="white"
					strokeWidth={1}
				/>
			</Group>
		);
	}

	function drawOuts(strikezoneOffsetX: number) {
		const outs = liveData?.plays.currentPlay.count.outs;
		if (outs == 0) {
			return (
				<Group>
					<Circle
						x={strikezoneOffsetX + 55}
						y={12}
						stroke="white"
						radius={5}
					/>
					<Circle
						x={strikezoneOffsetX + 70}
						y={12}
						stroke="white"
						radius={5}
					/>
					<Circle
						x={strikezoneOffsetX + 85}
						y={12}
						stroke="white"
						radius={5}
					/>
				</Group>
			);
		} else if (outs == 1) {
			return (
				<Group>
					<Circle
						x={strikezoneOffsetX + 55}
						y={12}
						stroke="white"
						radius={5}
						fill="white"
					/>
					<Circle
						x={strikezoneOffsetX + 70}
						y={12}
						stroke="white"
						radius={5}
					/>
					<Circle
						x={strikezoneOffsetX + 85}
						y={12}
						stroke="white"
						radius={5}
					/>
				</Group>
			);
		} else if (outs == 2) {
			return (
				<Group>
					<Circle
						x={strikezoneOffsetX + 55}
						y={12}
						stroke="white"
						radius={5}
						fill="white"
					/>
					<Circle
						x={strikezoneOffsetX + 70}
						y={12}
						stroke="white"
						radius={5}
						fill="white"
					/>
					<Circle
						x={strikezoneOffsetX + 85}
						y={12}
						stroke="white"
						radius={5}
						fill=""
					/>
				</Group>
			);
		} else if (outs == 3) {
			return (
				<Group>
					<Circle
						x={strikezoneOffsetX + 55}
						y={12}
						stroke="white"
						radius={5}
						fill="white"
					/>
					<Circle
						x={strikezoneOffsetX + 70}
						y={12}
						stroke="white"
						radius={5}
						fill="white"
					/>
					<Circle
						x={strikezoneOffsetX + 85}
						y={12}
						stroke="white"
						radius={5}
						fill="white"
					/>
				</Group>
			);
		}
	}

	function drawBaseRunners() {
		const firstRunner = liveData?.linescore.offense.first?.id;
		const secondRunner = liveData?.linescore.offense.second?.id;
		const thirdRunner = liveData?.linescore.offense.third?.id;
		const s1 = firstRunner
			? {
					mlbamID: firstRunner,
					playerInfo:
						gameData?.players[("ID" + firstRunner) as playerID],
			  }
			: {};
		const s2 = secondRunner
			? {
					mlbamID: secondRunner,
					playerInfo:
						gameData?.players[("ID" + secondRunner) as playerID],
			  }
			: {};
		const s3 = thirdRunner
			? {
					mlbamID: thirdRunner,
					playerInfo:
						gameData?.players[("ID" + thirdRunner) as playerID],
			  }
			: {};
		const first = liveData?.linescore.offense.first ? (
			<Rect
				height={10}
				width={10}
				x={30}
				y={20}
				rotation={45}
				stroke="white"
				fill="white"
				onClick={() => {
					navigate("/player", { replace: true, state: s1 });
				}}
			/>
		) : (
			<Rect
				height={10}
				width={10}
				x={30}
				y={20}
				rotation={45}
				stroke="white"
			/>
		);
		const second = liveData?.linescore.offense.second ? (
			<Rect
				height={10}
				width={10}
				x={20}
				y={6}
				rotation={45}
				stroke="white"
				fill="white"
				onClick={() => {
					navigate("/player", { replace: true, state: s2 });
				}}
			/>
		) : (
			<Rect
				height={10}
				width={10}
				x={20}
				y={8}
				rotation={45}
				stroke="white"
			/>
		);
		const third = liveData?.linescore.offense.third ? (
			<Rect
				height={10}
				width={10}
				x={10}
				y={20}
				rotation={45}
				stroke="white"
				fill="white"
				onClick={() => {
					navigate("/player", { replace: true, state: s3 });
				}}
			/>
		) : (
			<Rect
				height={10}
				width={10}
				x={10}
				y={20}
				rotation={45}
				stroke="white"
			/>
		);
		return (
			<Group>
				{first}
				{second}
				{third}
			</Group>
		);
	}

	function display_Strikezone() {
		const balls = liveData?.plays.currentPlay.count.balls;
		const strikes = liveData?.plays.currentPlay.count.strikes;
		const height = 123;
		const width = 91.5;
		const stageWidth = 275;
		const stageHeight = 300;
		let pitchNum = 1;
		const strikezoneOffsetX = (stageWidth - width) / 2;
		const strikezoneOffsetY = (stageHeight - height) / 2 + 30;
		return (
			<div>
				<Stage width={stageWidth} height={stageHeight}>
					<Layer>
						<Rect
							width={width}
							height={height / 8}
							x={strikezoneOffsetX}
							y={5}
							stroke="#002774"
							strokeWidth={2}
							fill={"#002774"}
						/>
						<Text
							text={balls?.toString() + " - "}
							x={strikezoneOffsetX + 8}
							y={7}
							stroke="white"
							strokeWidth={1}
						/>
						<Text
							text={strikes?.toString()}
							x={strikezoneOffsetX + 25}
							y={7}
							stroke="white"
							strokeWidth={1}
						/>
						{drawOuts(strikezoneOffsetX)}
						{drawBaseRunners()}
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
				className="tw-flex-1 tw-w-0 tw-max-w-[27%] tw-border-r tw-border-neutral-600 tw-items-center tw-overflow-y-auto tw-h-full"
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
					</summary>
					<div className="tw-bg-[#eceef1] tw-text-black tw-p-0 tw-m-0">
						{display_batting_order(
							liveData?.boxscore?.teams?.away?.battingOrder
								? liveData?.boxscore?.teams?.away?.battingOrder
								: [],
							"away" as keyof team_Type
						)}
					</div>
				</details>
				<details>
					<summary className="tw-box-decoration-slice tw-bg-nav-blue tw-text-white">
						Bench
					</summary>
					<div className="tw-bg-[#eceef1] tw-text-black tw-p-0 tw-m-0">
						{display_bench(
							liveData?.boxscore?.teams?.away?.bench
								? liveData?.boxscore?.teams?.away?.bench
								: [],
							"away" as keyof team_Type
						)}
					</div>
				</details>
				<details>
					<summary className="tw-box-decoration-slice tw-bg-nav-blue tw-text-white">
						Bullpen
					</summary>
					<div className="tw-bg-[#eceef1] tw-text-black tw-p-0 tw-m-0">
						{display_bullpen(
							liveData?.boxscore?.teams?.away?.bullpen
								? liveData?.boxscore?.teams?.away?.bullpen
								: [],
							"away" as keyof team_Type
						)}
					</div>
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
			<div className="tw-flex-1 tw-w-0 tw-max-w-[27%] tw-h-full tw-overflow-y-auto">
				{" "}
				Home Team{" "}
				{
					/* prettier-ignore */
					gameData?.teams.home.id ? display_logo(gameData?.teams.home.id, gameData?.teams.away.name): ""
				}
				<details>
					<summary className="tw-box-decoration-slice tw-bg-nav-blue tw-text-white">
						Lineup
					</summary>
					<div className="tw-bg-[#eceef1] tw-text-black tw-p-0 tw-m-0">
						{display_batting_order(
							liveData?.boxscore?.teams?.home?.battingOrder
								? liveData?.boxscore?.teams?.home?.battingOrder
								: [],
							"home" as keyof team_Type
						)}
					</div>
				</details>
				<details>
					<summary className="tw-box-decoration-slice tw-bg-nav-blue tw-text-white">
						Bench
					</summary>
					<div className="tw-bg-[#eceef1] tw-text-black tw-p-0 tw-m-0">
						{display_bench(
							liveData?.boxscore?.teams?.home?.bench
								? liveData?.boxscore?.teams?.home?.bench
								: [],
							"home" as keyof team_Type
						)}
					</div>
				</details>
				<details>
					<summary className="tw-box-decoration-slice tw-bg-nav-blue tw-text-white">
						Bullpen
					</summary>
					<div className="tw-bg-[#eceef1] tw-text-black tw-p-0 tw-m-0">
						{display_bullpen(
							liveData?.boxscore?.teams?.home?.bullpen
								? liveData?.boxscore?.teams?.home?.bullpen
								: [],
							"home" as keyof team_Type
						)}
					</div>
				</details>
			</div>
		</div>
	);
}

export default Live;

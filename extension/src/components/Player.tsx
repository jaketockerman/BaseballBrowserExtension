import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ServersType } from "../types/App_Types";
import PropTypes, { InferProps } from "prop-types";
import { player_Type } from "../types/Live_Types";
import { useLocation } from "react-router-dom";
import { Table } from "react-bootstrap";

Player.propTypes = {
	servers: PropTypes.object.isRequired as never as ServersType,
};

interface stateType {
	mlbamID: number;
	playerInfo: player_Type;
}

interface FGBattingStatsType {
	Season: number;
	AVG: number;
}

interface FGPitchingStatsType {
	Season: number;
	ERA: number;
}

interface PlayerStatsType {
	batting: Array<FGBattingStatsType>;
	pitching: Array<FGPitchingStatsType>;
}

interface FGResultType {
	batting?: string;
	pitching?: string;
}

interface FGResponseType {
	result: FGResultType;
}

function Player(props: InferProps<typeof Player.propTypes>) {
	const location = useLocation();
	const { mlbamID, playerInfo } = location.state as stateType;
	const [fgStats, setFGStats] = useState<PlayerStatsType>();
	const [active, setActive] = useState<"batting" | "pitching">();
	//test player 460075: Braun
	//test player 592885: Yelich
	//test player 660271: Ohtani (has both pitching and batting)
	//test player 669203: Burnes (has both pitching and batting)
	//test player 541650: Hernan Perez (has both pitching and batting)

	useEffect(() => {
		axios
			.get<FGResponseType>(props.servers.pybaseball + "player/" + mlbamID)
			.then((response) => {
				const batting = response.data.result.batting
					? JSON.parse(response.data.result.batting)
					: [];
				const pitching = response.data.result.pitching
					? JSON.parse(response.data.result.pitching)
					: [];
				setFGStats({ batting: batting, pitching: pitching });
				if (playerInfo.primaryPosition?.abbreviation === "P") {
					setActive("pitching");
				} else {
					setActive("batting");
				}
			})
			.catch((error: AxiosError<{ additionalInfo: string }>) => {
				if (error.response?.status != 200) {
					console.log(error.message);
				}
			});
	}, [mlbamID]);

	function display_headshot(playerIDNum: number) {
		const link = `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${playerIDNum}/headshot/67/current`;
		return <img src={link} className="tw-max-w-full" />;
	}

	function player_info() {
		const dividerStyle = {
			borderBottom: "1px solid",
			borderColor: "#FFFFFF",
		};

		return (
			<div
				className="tw-max-h-3/6 tw-flex tw-w-full"
				style={dividerStyle}
			>
				<div className="tw-flex tw-flex-col tw-text-left tw-w-2/12 tw-min-h-0 tw-min-w-0">
					{mlbamID ? display_headshot(mlbamID) : ""}
				</div>
				<div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-center">
					<div className="tw-w-full">
						{playerInfo.fullName} #{playerInfo.primaryNumber}
					</div>
					<div className="tw-w-full">
						{playerInfo.primaryPosition?.abbreviation} | B/T:{" "}
						{playerInfo.batSide?.code}/{playerInfo.pitchHand?.code}{" "}
						| {playerInfo.height}/{playerInfo.weight} | Age:{" "}
						{playerInfo.currentAge}
					</div>
					<div className="tw-w-full">
						{playerInfo.mlbDebutDate
							? `MLB Debut: ${playerInfo.mlbDebutDate}`
							: ""}
					</div>
					<div className="tw-w-full">
						{playerInfo.nickName
							? `Nickname: ${playerInfo.nickName}`
							: ""}
					</div>
				</div>
			</div>
		);
	}

	function player_options() {
		const dividerStyle = {
			borderLeft: "1px solid",
			borderRight: "1px solid",
			borderBottom: "1px solid",
			borderColor: "#FFFFFF",
		};

		const battingStyle = {
			borderRight: "0px",
			borderColor: "#FFFFFF",
		};

		if (fgStats?.batting.length && fgStats.pitching.length) {
			battingStyle["borderRight"] = "1px solid";
			if (active === "batting") {
				//Both batting and pitching with batting active
				return (
					<div className="tw-h-full tw-flex" style={dividerStyle}>
						<div
							style={battingStyle}
							className="tw-h-full tw-w-full tw-bg-nav-blue-extra-light"
						>
							{"Batting"}
						</div>
						<div
							onClick={() => {
								setActive("pitching");
							}}
							className="tw-h-full tw-w-full tw-bg-nav-blue"
						>
							{"Pitching"}
						</div>
					</div>
				);
			}
			//Both batting and pitching with pitching active
			else {
				return (
					<div className="tw-h-full tw-flex" style={dividerStyle}>
						<div
							onClick={() => {
								setActive("batting");
							}}
							style={battingStyle}
							className="tw-h-full tw-w-full tw-bg-nav-blue"
						>
							{"Batting"}
						</div>
						<div className="tw-h-full tw-w-full tw-bg-nav-blue-extra-light">
							{"Pitching"}
						</div>
					</div>
				);
			}
		}

		//Only batting or pitching
		return (
			<div
				className="tw-h-full tw-flex tw-bg-nav-blue"
				style={dividerStyle}
			>
				{fgStats?.batting.length ? (
					<div style={battingStyle} className="tw-h-full tw-w-full">
						{"Batting"}
					</div>
				) : (
					""
				)}
				{fgStats?.pitching.length ? (
					<div className="tw-h-full tw-w-full">{"Pitching"}</div>
				) : (
					""
				)}
			</div>
		);
	}

	function batting_table() {
		return (
			<Table bordered size="sm" style={{ margin: "0px" }}>
				<thead>
					<tr className="tw-text-white tw-bg-nav-blue tw-border-[#041e42] tw-text-stats-table-text">
						<th>Season</th>
						<th>AVG</th>
						{/* <th>W</th>
							<th>L</th>
							<th>PCT</th>
							<th>GB</th> */}
					</tr>
				</thead>
				<tbody>
					{fgStats?.batting.map((season: FGBattingStatsType) => {
						return (
							<tr
								className="tw-bg-[#eceef1] tw-border-[#e4e4e4] tw-text-stats-table-text"
								key={season.Season}
							>
								<td>{season.Season}</td>
								<td>{season.AVG.toFixed(3)}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		);
	}

	function pitching_table() {
		return (
			<Table bordered size="sm" style={{ margin: "0px" }}>
				<thead>
					<tr className="tw-text-white tw-bg-nav-blue tw-border-[#041e42] tw-text-stats-table-text">
						<th>Season</th>
						<th>ERA</th>
						{/* <th>W</th>
							<th>L</th>
							<th>PCT</th>
							<th>GB</th> */}
					</tr>
				</thead>
				<tbody>
					{fgStats?.pitching.map((season: FGPitchingStatsType) => {
						return (
							<tr
								className="tw-bg-[#eceef1] tw-border-[#e4e4e4] tw-text-stats-table-text"
								key={season.Season}
							>
								<td>{season.Season}</td>
								<td>{season.ERA.toFixed(2)}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		);
	}

	function player_stats() {
		if (active === "batting") {
			return batting_table();
		} else {
			// Pitching
			return pitching_table();
		}
	}

	function player_data() {
		return (
			//TODO: Deal with overflow
			<div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-overflow-auto">
				<div className="tw-h-1/12">{player_options()}</div>
				<div className="tw-h-full">{player_stats()}</div>
			</div>
		);
	}

	function display_player() {
		console.log("batting");
		console.log(fgStats?.batting ? fgStats?.batting : "no batting data");
		console.log("pitching");
		console.log(fgStats?.pitching ? fgStats?.pitching : "no pitching data");
		return (
			<React.Fragment>
				<React.Fragment>{player_info()}</React.Fragment>
				<React.Fragment>{player_data()}</React.Fragment>
			</React.Fragment>
		);
	}

	return (
		<div className="tw-flex tw-flex-col tw-h-full tw-items-center">
			{fgStats != undefined ? (
				display_player()
			) : (
				<React.Fragment> Loading... </React.Fragment>
			)}
		</div>
	);
}

export default Player;

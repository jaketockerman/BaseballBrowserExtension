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

// {
// 	"IDfg": 2233,
// 	"Season": 2021,
// 	"Name": "Adam Wainwright",
// 	"Team": "STL",
// 	"Age": 39,
// 	"W": 17,
// 	"L": 7,
// 	"WAR": 3.8,
// 	"ERA": 3.05,
// 	"G": 32,
// 	"GS": 32,
// 	"CG": 3,
// 	"ShO": 1,
// 	"SV": 0,
// 	"BS": 0,
// 	"IP": 206.1,
// 	"TBF": 828,
// 	"H": 168,
// 	"R": 72,
// 	"ER": 70,
// 	"HR": 21,
// 	"BB": 50,
// 	"IBB": 3,
// 	"HBP": 9,
// 	"WP": 4,
// 	"BK": 1,
// 	"SO": 174,
// 	"GB": 280,
// 	"FB": 179,
// 	"LD": 131,
// 	"IFFB": 14,
//STOPPED HERE
// 	"Balls": 1059,
// 	"Strikes": 2009,
// 	"Pitches": 3068,
// 	"RS": 109,
// 	"IFH": 8,
// 	"BU": 5,
// 	"BUH": 1,
// 	"K/9": 7.59,
// 	"BB/9": 2.18,
// 	"K/BB": 3.48,
// 	"H/9": 7.33,
// 	"HR/9": 0.92,
// 	"AVG": 0.218,
// 	"WHIP": 1.06,
// 	"BABIP": 0.256,
// 	"LOB%": 0.784,
// 	"FIP": 3.66,
// 	"GB/FB": 1.56,
// 	"LD%": 0.222,
// 	"GB%": 0.475,
// 	"FB%": 0.303,
// 	"IFFB%": 0.078,
// 	"HR/FB": 0.117,
// 	"IFH%": 0.029,
// 	"BUH%": 0.2,
// 	"Starting": 36.8,
// 	"Start-IP": 206.1,
// 	"Relieving": null,
// 	"Relief-IP": null,
// 	"RAR": 36.8,
// 	"Dollars": "$30.2",
// 	"tERA": 4.02,
// 	"xFIP": 3.87,
// 	"WPA": 3.03,
// 	"-WPA": -12.07,
// 	"+WPA": 15.1,
// 	"RE24": 27.65,
// 	"REW": 2.9,
// 	"pLI": 0.98,
// 	"inLI": 0.93,
// 	"gmLI": 0.88,
// 	"exLI": 1.32,
// 	"Pulls": 29,
// 	"WPA/LI": 3.56,
// 	"Clutch": -0.48,
// 	"FB% 2": 0.379,
// 	"FBv": 89.1,
// 	"SL%": null,
// 	"SLv": null,
// 	"CT%": 0.217,
// 	"CTv": 85,
// 	"CB%": 0.341,
// 	"CBv": 73.4,
// 	"CH%": 0.063,
// 	"CHv": 82.7,
// 	"SF%": null,
// 	"SFv": null,
// 	"KN%": null,
// 	"KNv": null,
// 	"XX%": 0.004,
// 	"PO%": null,
// 	"wFB": 13.4,
// 	"wSL": null,
// 	"wCT": 2.3,
// 	"wCB": 13.3,
// 	"wCH": 0.2,
// 	"wSF": null,
// 	"wKN": null,
// 	"wFB/C": 1.16,
// 	"wSL/C": null,
// 	"wCT/C": 0.35,
// 	"wCB/C": 1.27,
// 	"wCH/C": 0.11,
// 	"wSF/C": null,
// 	"wKN/C": null,
// 	"O-Swing%": 0.303,
// 	"Z-Swing%": 0.605,
// 	"Swing%": 0.434,
// 	"O-Contact%": 0.675,
// 	"Z-Contact%": 0.904,
// 	"Contact%": 0.813,
// 	"Zone%": 0.432,
// 	"F-Strike%": 0.643,
// 	"SwStr%": 0.081,
// 	"HLD": 0,
// 	"SD": 0,
// 	"MD": 0,
// 	"ERA-": 76,
// 	"FIP-": 89,
// 	"xFIP-": 91,
// 	"K%": 0.21,
// 	"BB%": 0.06,
// 	"SIERA": 4.13,
// 	"RS/9": 4.75,
// 	"E-F": -0.61,
// 	"FA% (sc)": 0.095,
// 	"FT% (sc)": null,
// 	"FC% (sc)": 0.22,
// 	"FS% (sc)": null,
// 	"FO% (sc)": null,
// 	"SI% (sc)": 0.281,
// 	"SL% (sc)": null,
// 	"CU% (sc)": 0.337,
// 	"KC% (sc)": null,
// 	"EP% (sc)": null,
// 	"CH% (sc)": 0.064,
// 	"SC% (sc)": null,
// 	"KN% (sc)": null,
// 	"UN% (sc)": null,
// 	"vFA (sc)": 89,
// 	"vFT (sc)": null,
// 	"vFC (sc)": 84.9,
// 	"vFS (sc)": null,
// 	"vFO (sc)": null,
// 	"vSI (sc)": 89.1,
// 	"vSL (sc)": null,
// 	"vCU (sc)": 73.5,
// 	"vKC (sc)": null,
// 	"vEP (sc)": null,
// 	"vCH (sc)": 82.7,
// 	"vSC (sc)": null,
// 	"vKN (sc)": null,
// 	"FA-X (sc)": -1.4,
// 	"FT-X (sc)": null,
// 	"FC-X (sc)": 3.1,
// 	"FS-X (sc)": null,
// 	"FO-X (sc)": null,
// 	"SI-X (sc)": -7.7,
// 	"SL-X (sc)": null,
// 	"CU-X (sc)": 9.2,
// 	"KC-X (sc)": null,
// 	"EP-X (sc)": null,
// 	"CH-X (sc)": -8.2,
// 	"SC-X (sc)": null,
// 	"KN-X (sc)": null,
// 	"FA-Z (sc)": 8.6,
// 	"FT-Z (sc)": null,
// 	"FC-Z (sc)": 3.9,
// 	"FS-Z (sc)": null,
// 	"FO-Z (sc)": null,
// 	"SI-Z (sc)": 7.3,
// 	"SL-Z (sc)": null,
// 	"CU-Z (sc)": -8.5,
// 	"KC-Z (sc)": null,
// 	"EP-Z (sc)": null,
// 	"CH-Z (sc)": 4.7,
// 	"SC-Z (sc)": null,
// 	"KN-Z (sc)": null,
// 	"wFA (sc)": -4.6,
// 	"wFT (sc)": null,
// 	"wFC (sc)": 2.8,
// 	"wFS (sc)": null,
// 	"wFO (sc)": null,
// 	"wSI (sc)": 17.5,
// 	"wSL (sc)": null,
// 	"wCU (sc)": 14.6,
// 	"wKC (sc)": null,
// 	"wEP (sc)": null,
// 	"wCH (sc)": 1,
// 	"wSC (sc)": null,
// 	"wKN (sc)": null,
// 	"wFA/C (sc)": -1.57,
// 	"wFT/C (sc)": null,
// 	"wFC/C (sc)": 0.41,
// 	"wFS/C (sc)": null,
// 	"wFO/C (sc)": null,
// 	"wSI/C (sc)": 2.03,
// 	"wSL/C (sc)": null,
// 	"wCU/C (sc)": 1.41,
// 	"wKC/C (sc)": null,
// 	"wEP/C (sc)": null,
// 	"wCH/C (sc)": 0.51,
// 	"wSC/C (sc)": null,
// 	"wKN/C (sc)": null,
// 	"O-Swing% (sc)": 0.255,
// 	"Z-Swing% (sc)": 0.593,
// 	"Swing% (sc)": 0.434,
// 	"O-Contact% (sc)": 0.595,
// 	"Z-Contact% (sc)": 0.896,
// 	"Contact% (sc)": 0.813,
// 	"Zone% (sc)": 0.53,
// 	"Pace": null,
// 	"RA9-WAR": 6,
// 	"BIP-Wins": 1.6,
// 	"LOB-Wins": 0.5,
// 	"FDP-Wins": 2.2,
// 	"Age Rng": "39 - 39",
// 	"K-BB%": 0.15,
// 	"Pull%": 0.432,
// 	"Cent%": 0.341,
// 	"Oppo%": 0.227,
// 	"Soft%": 0.139,
// 	"Med%": 0.563,
// 	"Hard%": 0.297,
// 	"kwERA": 4.36,
// 	"TTO%": 0.296,
// 	"CH% (pi)": 0.063,
// 	"CS% (pi)": null,
// 	"CU% (pi)": 0.341,
// 	"FA% (pi)": 0.098,
// 	"FC% (pi)": 0.217,
// 	"FS% (pi)": null,
// 	"KN% (pi)": null,
// 	"SB% (pi)": null,
// 	"SI% (pi)": 0.281,
// 	"SL% (pi)": null,
// 	"XX% (pi)": null,
// 	"vCH (pi)": 83,
// 	"vCS (pi)": null,
// 	"vCU (pi)": 73.7,
// 	"vFA (pi)": 89.3,
// 	"vFC (pi)": 85.2,
// 	"vFS (pi)": null,
// 	"vKN (pi)": null,
// 	"vSB (pi)": null,
// 	"vSI (pi)": 89.4,
// 	"vSL (pi)": null,
// 	"vXX (pi)": null,
// 	"CH-X (pi)": -8.1,
// 	"CS-X (pi)": null,
// 	"CU-X (pi)": 9.5,
// 	"FA-X (pi)": -1.2,
// 	"FC-X (pi)": 3.5,
// 	"FS-X (pi)": null,
// 	"KN-X (pi)": null,
// 	"SB-X (pi)": null,
// 	"SI-X (pi)": -7.5,
// 	"SL-X (pi)": null,
// 	"XX-X (pi)": null,
// 	"CH-Z (pi)": 3.2,
// 	"CS-Z (pi)": null,
// 	"CU-Z (pi)": -10.4,
// 	"FA-Z (pi)": 7.3,
// 	"FC-Z (pi)": 2.6,
// 	"FS-Z (pi)": null,
// 	"KN-Z (pi)": null,
// 	"SB-Z (pi)": null,
// 	"SI-Z (pi)": 6,
// 	"SL-Z (pi)": null,
// 	"XX-Z (pi)": null,
// 	"wCH (pi)": 0.4,
// 	"wCS (pi)": null,
// 	"wCU (pi)": 14.1,
// 	"wFA (pi)": -4.2,
// 	"wFC (pi)": 2.1,
// 	"wFS (pi)": null,
// 	"wKN (pi)": null,
// 	"wSB (pi)": null,
// 	"wSI (pi)": 18.1,
// 	"wSL (pi)": null,
// 	"wXX (pi)": null,
// 	"wCH/C (pi)": 0.19,
// 	"wCS/C (pi)": null,
// 	"wCU/C (pi)": 1.35,
// 	"wFA/C (pi)": -1.4,
// 	"wFC/C (pi)": 0.31,
// 	"wFS/C (pi)": null,
// 	"wKN/C (pi)": null,
// 	"wSB/C (pi)": null,
// 	"wSI/C (pi)": 2.1,
// 	"wSL/C (pi)": null,
// 	"wXX/C (pi)": null,
// 	"O-Swing% (pi)": 0.249,
// 	"Z-Swing% (pi)": 0.588,
// 	"Swing% (pi)": 0.434,
// 	"O-Contact% (pi)": 0.595,
// 	"Z-Contact% (pi)": 0.89,
// 	"Contact% (pi)": 0.813,
// 	"Zone% (pi)": 0.545,
// 	"Pace (pi)": null,
// 	"FRM": -0.6,
// 	"K/9+": 85,
// 	"BB/9+": 64,
// 	"K/BB+": 132,
// 	"H/9+": 89,
// 	"HR/9+": 75,
// 	"AVG+": 92,
// 	"WHIP+": 82,
// 	"BABIP+": 89,
// 	"LOB%+": 109,
// 	"K%+": 90,
// 	"BB%+": 68,
// 	"LD%+": 107,
// 	"GB%+": 109,
// 	"FB%+": 85,
// 	"HR/FB%+": 86,
// 	"Pull%+": 109,
// 	"Cent%+": 97,
// 	"Oppo%+": 91,
// 	"Soft%+": 84,
// 	"Med%+": 110,
// 	"Hard%+": 93,
// 	"EV": 88.2,
// 	"LA": 10,
// 	"Barrels": 37,
// 	"Barrel%": 0.062,
// 	"maxEV": 112.2,
// 	"HardHit": 209,
// 	"HardHit%": 0.351,
// 	"Events": 595,
// 	"CStr%": 0.216,
// 	"CSW%": 0.298,
// 	"xERA": null
//   }

interface FGPitchingStatsType {
	//REGULAR
	Season: number;
	Age: number;
	Team: string;
	W: number;
	L: number;
	ERA: number;
	G: number;
	GS: number;
	GF: number;
	CG: number;
	ShO: number;
	SV: number;
	IP: number;
	H: number;
	R: number;
	ER: number;
	HR: number;
	BB: number;
	IBB: number;
	HBP: number;
	WP: number;
	BK: number;
	SO: number;
	//ADVANCED
	GB: number;
	FB: number;
	LD: number;
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

	// function player_info() {
	// 	const dividerStyle = {
	// 		borderBottom: "1px solid",
	// 		borderColor: "#FFFFFF",
	// 	};

	// 	return (
	// 		<div
	// 			className="tw-h-1/2 tw-flex tw-w-full"
	// 			style={dividerStyle}
	// 		>
	// 			<div className="tw-flex tw-flex-col tw-text-left tw-w-[13%] tw-min-h-0 tw-min-w-0">
	// 				{mlbamID ? display_headshot(mlbamID) : ""}
	// 			</div>
	// 			<div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-center">
	// 				<div className="tw-w-full">
	// 					{playerInfo.fullName} #{playerInfo.primaryNumber}
	// 				</div>
	// 				<div className="tw-w-full">
	// 					{playerInfo.primaryPosition?.abbreviation} | B/T:{" "}
	// 					{playerInfo.batSide?.code}/{playerInfo.pitchHand?.code}{" "}
	// 					| {playerInfo.height}/{playerInfo.weight} | Age:{" "}
	// 					{playerInfo.currentAge}
	// 				</div>
	// 				<div className="tw-w-full">
	// 					{playerInfo.mlbDebutDate
	// 						? `MLB Debut: ${playerInfo.mlbDebutDate}`
	// 						: ""}
	// 				</div>
	// 				<div className="tw-w-full">
	// 					{playerInfo.nickName
	// 						? `Nickname: ${playerInfo.nickName}`
	// 						: ""}
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// }

	function player_info() {
		const dividerStyle = {
			borderBottom: "1px solid",
			borderColor: "#FFFFFF",
		};

		return (
			<div className="tw-h-1/2 tw-flex tw-w-full" style={dividerStyle}>
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
					<div className="tw-flex tw-ustify-center">
						<div className="tw-form-check tw-form-switch">
							<input
								className="tw-form-check-input tw-appearance-none tw-w-9 tw--ml-10 tw-rounded-full tw-float-left tw-h-5 tw-align-top tw-bg-white tw-bg-no-repeat tw-bg-contain tw-bg-gray-300 tw-focus:outline-none tw-cursor-pointer tw-shadow-sm"
								type="checkbox"
								role="switch"
								id="flexSwitchCheckDefault"
							/>
							{/* <label className="form-check-label inline-block text-gray-800" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label> */}
						</div>
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

	// Stats Tables:
	const tableHeadTailwind =
		"tw-sticky tw-top-0 tw-text-white tw-bg-nav-blue tw-text-stats-table-text";

	function batting_table() {
		return (
			<Table size="sm" style={{ margin: "0px" }}>
				<thead className={tableHeadTailwind}>
					<tr>
						<th className="tw-px-2">Season</th>
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
			// <Table size="sm" style={{ margin: "0px" }}>
			<table className="tw-w-full tw-table-auto">
				<thead className={tableHeadTailwind}>
					<tr>
						<th className="tw-px-1">Season</th>
						<th className="tw-px-1">Age</th>
						<th className="tw-px-1">Tm</th>
						<th className="tw-px-1">W</th>
						<th className="tw-px-1">L</th>
						<th className="tw-px-1">W-L%</th>
						<th className="tw-px-1">ERA</th>
						<th className="tw-px-1">G</th>
						<th className="tw-px-1">GS</th>
						<th className="tw-px-1">CG</th>
						<th className="tw-px-1">SHO</th>
						<th className="tw-px-1">SV</th>
						<th className="tw-px-1">IP</th>
						<th className="tw-px-1">H</th>
						<th className="tw-px-1">R</th>
						<th className="tw-px-1">ER</th>
						<th className="tw-px-1">HR</th>
						<th className="tw-px-1">BB</th>
						<th className="tw-px-1">IBB</th>
						<th className="tw-px-1">SO</th>
						<th className="tw-px-1">H</th>
						<th className="tw-px-1">R</th>
						<th className="tw-px-1">ER</th>
						<th className="tw-px-1">HR</th>
						<th className="tw-px-1">BB</th>
						<th className="tw-px-1">IBB</th>
						<th className="tw-px-1">SO</th>
						{/* <th>W</th>
							<th>L</th>
							<th>PCT</th>
							<th>GB</th> */}
					</tr>
				</thead>
				<tbody>
					{fgStats?.pitching.map(
						(season: FGPitchingStatsType, index) => {
							const tailwindRow =
								index % 2
									? "tw-bg-[#eceef1] tw-text-stats-table-text tw-text-black tw-bg-gray-200 tw-py-10"
									: "tw-bg-[#eceef1] tw-text-stats-table-text tw-text-black";
							return (
								<tr className={tailwindRow} key={season.Season}>
									<td className="tw-px-1">{season.Season}</td>
									<td className="tw-px-1">{season.Age}</td>
									<td className="tw-px-1">{season.Team}</td>
									<td className="tw-px-1">{season.W}</td>
									<td className="tw-px-1">{season.L}</td>
									<td className="tw-px-1">
										{season.W + season.L
											? (
													season.W /
													(season.W + season.L)
											  ).toFixed(3)
											: ""}
									</td>
									<td className="tw-px-1">
										{season.ERA.toFixed(2)}
									</td>
									<td className="tw-px-1">{season.G}</td>
									<td className="tw-px-1">{season.GS}</td>
									<td className="tw-px-1">{season.CG}</td>
									<td className="tw-px-1">{season.ShO}</td>
									<td className="tw-px-1">{season.SV}</td>
									<td className="tw-px-1">
										{season.IP.toFixed(1)}
									</td>
									<td className="tw-px-1">{season.H}</td>
									<td className="tw-px-1">{season.R}</td>
									<td className="tw-px-1">{season.ER}</td>
									<td className="tw-px-1">{season.HR}</td>
									<td className="tw-px-1">{season.BB}</td>
									<td className="tw-px-1">{season.IBB}</td>
									<td className="tw-px-1">{season.SO}</td>
									<td className="tw-px-1">{season.H}</td>
									<td className="tw-px-1">{season.R}</td>
									<td className="tw-px-1">{season.ER}</td>
									<td className="tw-px-1">{season.HR}</td>
									<td className="tw-px-1">{season.BB}</td>
									<td className="tw-px-1">{season.IBB}</td>
									<td className="tw-px-1">{season.SO}</td>
									{/* <td>{season.HBP}</td> */}
								</tr>
							);
						}
					)}
				</tbody>
				{/* </Table> */}
			</table>
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
			<div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-overflow-hidden">
				<div className="tw-text-[16px]">{player_options()}</div>
				<div className="tw-h-full tw-w-full tw-overflow-auto">
					{player_stats()}
				</div>
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
		<div className="tw-flex tw-flex-col tw-h-full tw-items-center tw-justify-center">
			{fgStats != undefined ? (
				display_player()
			) : (
				<React.Fragment> Loading... </React.Fragment>
			)}
		</div>
	);
}

export default Player;

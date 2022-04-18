import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ServersType } from "../types/App_Types";
import PropTypes, { InferProps } from "prop-types";
import { player_Type } from "../types/Live_Types";
import { useLocation } from "react-router-dom";
import { Spinner, Table } from "react-bootstrap";

Player.propTypes = {
	servers: PropTypes.object.isRequired as never as ServersType,
};

interface stateType {
	mlbamID: number;
	playerInfo: player_Type;
}
// {
// 	"IDfg": 2233,
// 	"Season": 2006,
// 	"Name": "Adam Wainwright",
// 	"Team": "STL",
// 	"Age": 24,
// 	"G": 61,
// 	"AB": 6,
// 	"PA": 6,
// 	"H": 3,
// 	"1B": 1,
// 	"2B": 1,
// 	"3B": 0,
// 	"HR": 1,
// 	"R": 2,
// 	"RBI": 1,
// 	"BB": 0,
// 	"IBB": 0,
// 	"SO": 0,
// 	"HBP": 0,
// 	"SF": 0,
// 	"SH": 0,
// 	"GDP": 0,
// 	"SB": 0,
// 	"CS": 0,
// 	"AVG": 0.5,
// 	"GB": 4,
// 	"FB": 2,
// 	"LD": 0,
// 	"IFFB": 0,
// 	"Pitches": 15,
// 	"Balls": 2,
// 	"Strikes": 13,
// 	"IFH": 0,
// 	"BU": 0,
// 	"BUH": 0,
//Stopped here
// 	"BB%": 0,
// 	"K%": 0,
// 	"BB/K": 0,
// 	"OBP": 0.5,
// 	"SLG": 1.167,
// 	"OPS": 1.667,
// 	"ISO": 0.667,
// 	"BABIP": 0.4,
// 	"GB/FB": 0.02,
// 	"LD%": 0,
// 	"GB%": 0.667,
// 	"FB%": 0.333,
// 	"IFFB%": 0,
// 	"HR/FB": 0.5,
// 	"IFH%": 0,
// 	"BUH%": 0,
// 	"wOBA": 0.683,
// 	"wRAA": 1.8,
// 	"wRC": 3,
// 	"Bat": 1.8,
// 	"Fld": null,
// 	"Rep": 0.2,
// 	"Pos": 0.7,
// 	"RAR": 2.7,
// 	"WAR": 0.3,
// 	"Dol": "$1.3",
// 	"Spd": 2.6,
// 	"wRC+": 328,
// 	"WPA": 0.03,
// 	"-WPA": -0.09,
// 	"+WPA": 0.12,
// 	"RE24": 0.42,
// 	"REW": 0.04,
// 	"pLI": 0.76,
// 	"phLI": null,
// 	"PH": 0,
// 	"WPA/LI": 0.09,
// 	"Clutch": -0.05,
// 	"FB% (Pitch)": 0.667,
// 	"FBv": 90.7,
// 	"SL%": 0.067,
// 	"SLv": 83,
// 	"CT%": null,
// 	"CTv": null,
// 	"CB%": 0.067,
// 	"CBv": 78,
// 	"CH%": 0.2,
// 	"CHv": 73.7,
// 	"SF%": null,
// 	"SFv": null,
// 	"KN%": null,
// 	"KNv": null,
// 	"XX%": null,
// 	"PO%": null,
// 	"wFB": 1.5,
// 	"wSL": -0.2,
// 	"wCT": null,
// 	"wCB": 0.9,
// 	"wCH": -0.2,
// 	"wSF": null,
// 	"wKN": null,
// 	"wFB/C": 15.08,
// 	"wSL/C": -19.83,
// 	"wCT/C": null,
// 	"wCB/C": 85.24,
// 	"wCH/C": -7.92,
// 	"wSF/C": null,
// 	"wKN/C": null,
// 	"O-Swing%": 0.333,
// 	"Z-Swing%": 0.583,
// 	"Swing%": 0.533,
// 	"O-Contact%": 0,
// 	"Z-Contact%": 0.857,
// 	"Contact%": 0.75,
// 	"Zone%": 0.8,
// 	"F-Strike%": 0.667,
// 	"SwStr%": 0.133,
// 	"BsR": 0,
// 	"FA% (sc)": null,
// 	"FT% (sc)": null,
// 	"FC% (sc)": null,
// 	"FS% (sc)": null,
// 	"FO% (sc)": null,
// 	"SI% (sc)": null,
// 	"SL% (sc)": null,
// 	"CU% (sc)": null,
// 	"KC% (sc)": null,
// 	"EP% (sc)": null,
// 	"CH% (sc)": null,
// 	"SC% (sc)": null,
// 	"KN% (sc)": null,
// 	"UN% (sc)": null,
// 	"vFA (sc)": null,
// 	"vFT (sc)": null,
// 	"vFC (sc)": null,
// 	"vFS (sc)": null,
// 	"vFO (sc)": null,
// 	"vSI (sc)": null,
// 	"vSL (sc)": null,
// 	"vCU (sc)": null,
// 	"vKC (sc)": null,
// 	"vEP (sc)": null,
// 	"vCH (sc)": null,
// 	"vSC (sc)": null,
// 	"vKN (sc)": null,
// 	"FA-X (sc)": null,
// 	"FT-X (sc)": null,
// 	"FC-X (sc)": null,
// 	"FS-X (sc)": null,
// 	"FO-X (sc)": null,
// 	"SI-X (sc)": null,
// 	"SL-X (sc)": null,
// 	"CU-X (sc)": null,
// 	"KC-X (sc)": null,
// 	"EP-X (sc)": null,
// 	"CH-X (sc)": null,
// 	"SC-X (sc)": null,
// 	"KN-X (sc)": null,
// 	"FA-Z (sc)": null,
// 	"FT-Z (sc)": null,
// 	"FC-Z (sc)": null,
// 	"FS-Z (sc)": null,
// 	"FO-Z (sc)": null,
// 	"SI-Z (sc)": null,
// 	"SL-Z (sc)": null,
// 	"CU-Z (sc)": null,
// 	"KC-Z (sc)": null,
// 	"EP-Z (sc)": null,
// 	"CH-Z (sc)": null,
// 	"SC-Z (sc)": null,
// 	"KN-Z (sc)": null,
// 	"wFA (sc)": null,
// 	"wFT (sc)": null,
// 	"wFC (sc)": null,
// 	"wFS (sc)": null,
// 	"wFO (sc)": null,
// 	"wSI (sc)": null,
// 	"wSL (sc)": null,
// 	"wCU (sc)": null,
// 	"wKC (sc)": null,
// 	"wEP (sc)": null,
// 	"wCH (sc)": null,
// 	"wSC (sc)": null,
// 	"wKN (sc)": null,
// 	"wFA/C (sc)": null,
// 	"wFT/C (sc)": null,
// 	"wFC/C (sc)": null,
// 	"wFS/C (sc)": null,
// 	"wFO/C (sc)": null,
// 	"wSI/C (sc)": null,
// 	"wSL/C (sc)": null,
// 	"wCU/C (sc)": null,
// 	"wKC/C (sc)": null,
// 	"wEP/C (sc)": null,
// 	"wCH/C (sc)": null,
// 	"wSC/C (sc)": null,
// 	"wKN/C (sc)": null,
// 	"O-Swing% (sc)": null,
// 	"Z-Swing% (sc)": null,
// 	"Swing% (sc)": null,
// 	"O-Contact% (sc)": null,
// 	"Z-Contact% (sc)": null,
// 	"Contact% (sc)": null,
// 	"Zone% (sc)": null,
// 	"Pace": null,
// 	"Def": 0.7,
// 	"wSB": 0,
// 	"UBR": null,
// 	"Age Rng": "24 - 24",
// 	"Off": 1.8,
// 	"Lg": 0,
// 	"wGDP": null,
// 	"Pull%": 0.5,
// 	"Cent%": 0.333,
// 	"Oppo%": 0.167,
// 	"Soft%": 0.167,
// 	"Med%": 0.333,
// 	"Hard%": 0.5,
// 	"TTO%": 0.167,
// 	"CH% (pi)": null,
// 	"CS% (pi)": null,
// 	"CU% (pi)": null,
// 	"FA% (pi)": null,
// 	"FC% (pi)": null,
// 	"FS% (pi)": null,
// 	"KN% (pi)": null,
// 	"SB% (pi)": null,
// 	"SI% (pi)": null,
// 	"SL% (pi)": null,
// 	"XX% (pi)": null,
// 	"vCH (pi)": null,
// 	"vCS (pi)": null,
// 	"vCU (pi)": null,
// 	"vFA (pi)": null,
// 	"vFC (pi)": null,
// 	"vFS (pi)": null,
// 	"vKN (pi)": null,
// 	"vSB (pi)": null,
// 	"vSI (pi)": null,
// 	"vSL (pi)": null,
// 	"vXX (pi)": null,
// 	"CH-X (pi)": null,
// 	"CS-X (pi)": null,
// 	"CU-X (pi)": null,
// 	"FA-X (pi)": null,
// 	"FC-X (pi)": null,
// 	"FS-X (pi)": null,
// 	"KN-X (pi)": null,
// 	"SB-X (pi)": null,
// 	"SI-X (pi)": null,
// 	"SL-X (pi)": null,
// 	"XX-X (pi)": null,
// 	"CH-Z (pi)": null,
// 	"CS-Z (pi)": null,
// 	"CU-Z (pi)": null,
// 	"FA-Z (pi)": null,
// 	"FC-Z (pi)": null,
// 	"FS-Z (pi)": null,
// 	"KN-Z (pi)": null,
// 	"SB-Z (pi)": null,
// 	"SI-Z (pi)": null,
// 	"SL-Z (pi)": null,
// 	"XX-Z (pi)": null,
// 	"wCH (pi)": null,
// 	"wCS (pi)": null,
// 	"wCU (pi)": null,
// 	"wFA (pi)": null,
// 	"wFC (pi)": null,
// 	"wFS (pi)": null,
// 	"wKN (pi)": null,
// 	"wSB (pi)": null,
// 	"wSI (pi)": null,
// 	"wSL (pi)": null,
// 	"wXX (pi)": null,
// 	"wCH/C (pi)": null,
// 	"wCS/C (pi)": null,
// 	"wCU/C (pi)": null,
// 	"wFA/C (pi)": null,
// 	"wFC/C (pi)": null,
// 	"wFS/C (pi)": null,
// 	"wKN/C (pi)": null,
// 	"wSB/C (pi)": null,
// 	"wSI/C (pi)": null,
// 	"wSL/C (pi)": null,
// 	"wXX/C (pi)": null,
// 	"O-Swing% (pi)": null,
// 	"Z-Swing% (pi)": null,
// 	"Swing% (pi)": null,
// 	"O-Contact% (pi)": null,
// 	"Z-Contact% (pi)": null,
// 	"Contact% (pi)": null,
// 	"Zone% (pi)": null,
// 	"Pace (pi)": null,
// 	"FRM": null,
// 	"AVG+": 184,
// 	"BB%+": 0,
// 	"K%+": 0,
// 	"OBP+": 146,
// 	"SLG+": 264,
// 	"ISO+": 392,
// 	"BABIP+": 132,
// 	"LD+%": 0,
// 	"GB%+": 155,
// 	"FB%+": 90,
// 	"HR/FB%+": 453,
// 	"Pull%+": 123,
// 	"Cent%+": 98,
// 	"Oppo%+": 66,
// 	"Soft%+": 150,
// 	"Med%+": 54,
// 	"Hard%+": 182,
// 	"EV": null,
// 	"LA": null,
// 	"Barrels": null,
// 	"Barrel%": null,
// 	"maxEV": null,
// 	"HardHit": null,
// 	"HardHit%": null,
// 	"Events": 0,
// 	"CStr%": 0.267,
// 	"CSW%": 0.4,
// 	"xBA": null,
// 	"xSLG": null,
// 	"xwOBA": null
//   }
interface FGBattingStatsType {
	//REGULAR
	Season: number;
	Age: number;
	Team: string;
	G: number;
	AB: number;
	PA: number;
	H: number;
	"1B": number;
	"2B": number;
	"3B": number;
	HR: number;
	R: number;
	RBI: number;
	BB: number;
	SO: number;
	HBP: number;
	SF: number;
	GDP: number;
	SB: number;
	CS: number;
	AVG: number;
	OBP: number;
	OPS: number;
	SLG: number;
	WAR: number;
}

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
	WAR: number;
	//ADVANCED
	GB: number;
	FB: number;
	LD: number;
	IFFB: number;
	Balls: number;
	Strikes: number;
	Pitches: number;
	"K/9": number;
	"BB/9": number;
	"K/BB": number;
	"H/9": number;
	"HR/9": number;
	WHIP: number;
	BABIP: number;
	FIP: number;
	"GB/FB": number;
	xFIP: number;
	WPA: number;
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

	// Advanced Toggle
	const [advancedToggle, setAdvancedToggle] = useState(false);

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
		const toggleClass =
			" tw-transform tw-translate-x-6 tw-bg-player-advanced-green";

		return (
			<div className="tw-h-1/2 tw-flex tw-w-full tw-border-b tw-border-white tw-text-player-info">
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
					<div className="tw-flex tw-justify-center tw-items-center tw-py-1">
						<div className="tw-px-2">Advanced:</div>
						<div
							className="tw-w-12 tw-h-6 tw-flex tw-items-center tw-bg-gray-400 tw-rounded-full tw-p-1 tw-cursor-pointer"
							onClick={() => {
								setAdvancedToggle(!advancedToggle);
							}}
						>
							{/* Circle*/}
							<div
								className={
									"tw-w-4 tw-h-4 tw-rounded-full tw-shadow-md tw-transform tw-duration-300 tw-ease-in-out" +
									(advancedToggle
										? toggleClass
										: " tw-bg-black")
								}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}

	function player_options() {
		if (fgStats?.batting.length && fgStats.pitching.length) {
			if (active === "batting") {
				//Both batting and pitching with batting active
				return (
					<div className="tw-h-full tw-flex tw-border-white tw-border-x tw-border-b">
						<div className="tw-h-full tw-w-full tw-bg-nav-blue-extra-light tw-border-r">
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
					<div className="tw-h-full tw-flex tw-border-white tw-border-x tw-border-b">
						<div
							onClick={() => {
								setActive("batting");
							}}
							className="tw-h-full tw-w-full tw-bg-nav-blue tw-border-r"
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
			<div className="tw-h-full tw-flex tw-bg-nav-blue tw-border-white tw-border-x tw-border-b">
				{fgStats?.batting.length ? (
					<div className="tw-h-full tw-w-full tw-border-r">
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
	const tableRowTailwind = "tw-bg-[#eceef1] tw-text-stats-table-text";
	function batting_table() {
		const standardHead = (
			<thead className={tableHeadTailwind}>
				<tr>
					<th>Season</th>
					<th>Age</th>
					<th>Tm</th>
					<th>G</th>
					<th>PA</th>
					<th>AB</th>
					<th>R</th>
					<th>H</th>
					<th>2B</th>
					<th>3B</th>
					<th>HR</th>
					<th>RBI</th>
					<th>SB</th>
					<th>CS</th>
					<th>BB</th>
					<th>SO</th>
					<th>AVG</th>
					<th>OBP</th>
					<th>OPS</th>
					<th>GDP</th>
					<th>HBP</th>
					<th>WAR</th>
				</tr>
			</thead>
		);

		const advancedHead = (
			<thead className={tableHeadTailwind}>
				<tr>
					<th>Season</th>
					<th>Age</th>
					<th>Tm</th>
					<th>GB</th>
					<th>FB</th>
					<th>LD</th>
					<th>IFFB</th>
					<th>GB/FB</th>
					<th>B</th>
					<th>S</th>
					<th>P</th>
					<th>K/9</th>
					<th>BB/9</th>
					<th>K/BB</th>
					<th>H/9</th>
					<th>HR/9</th>
					<th>WHIP</th>
					<th>BABIP</th>
					<th>FIP</th>
					<th>xFIP</th>
					<th>WPA</th>
				</tr>
			</thead>
		);

		return (
			<Table striped size="sm" style={{ margin: "0px" }}>
				{advancedToggle ? advancedHead : standardHead}
				<tbody>
					{fgStats?.batting.map((season: FGBattingStatsType) => {
						const standardRow = (
							<tr
								className={tableRowTailwind}
								key={season.Season}
							>
								<td>{season.Season}</td>
								<td>{season.Age}</td>
								<td>{season.Team}</td>
								<td>{season.G}</td>
								<td>{season.PA}</td>
								<td>{season.AB}</td>
								<td>{season.R}</td>
								<td>{season.H}</td>
								<td>{season["2B"]}</td>
								<td>{season["3B"]}</td>
								<td>{season.HR}</td>
								<td>{season.RBI}</td>
								<td>{season.SB}</td>
								<td>{season.CS}</td>
								<td>{season.BB}</td>
								<td>{season.SO}</td>
								<td>{season.AVG.toFixed(3)}</td>
								<td>{season.OBP.toFixed(3)}</td>
								<td>{season.OPS.toFixed(3)}</td>
								<td>{season.GDP}</td>
								<td>{season.HBP}</td>
								<td>{season.WAR.toFixed(1)}</td>
							</tr>
						);

						const advancedRow = (
							<tr
								className={tableRowTailwind}
								key={season.Season}
							>
								{/* <td>{season.Season}</td>
								<td>{season.Age}</td>
								<td>{season.Team}</td>
								<td>{season.GB}</td>
								<td>{season.FB}</td>
								<td>{season.LD}</td>
								<td>{season.IFFB}</td>
								<td>{season["GB/FB"].toFixed(2)}</td>
								<td>{season.Balls}</td>
								<td>{season.Strikes}</td>
								<td>{season.Pitches}</td>
								<td>{season["K/9"].toFixed(2)}</td>
								<td>{season["BB/9"].toFixed(2)}</td>
								<td>{season["K/BB"].toFixed(2)}</td>
								<td>{season["H/9"].toFixed(2)}</td>
								<td>{season["HR/9"].toFixed(2)}</td>
								<td>{season.WHIP.toFixed(2)}</td>
								<td>{season.BABIP.toFixed(3)}</td>
								<td>{season.FIP.toFixed(2)}</td>
								<td>{season.xFIP.toFixed(2)}</td>
								<td>{season.WPA.toFixed(2)}</td> */}
							</tr>
						);
						return advancedToggle ? advancedRow : standardRow;
					})}
				</tbody>
			</Table>
		);
	}

	function pitching_table() {
		const standardHead = (
			<thead className={tableHeadTailwind}>
				<tr>
					<th>Season</th>
					<th>Age</th>
					<th>Tm</th>
					<th>W</th>
					<th>L</th>
					<th>W%</th>
					<th>ERA</th>
					<th>G</th>
					<th>GS</th>
					<th>CG</th>
					<th>SHO</th>
					<th>SV</th>
					<th>IP</th>
					<th>H</th>
					<th>R</th>
					<th>ER</th>
					<th>HR</th>
					<th>BB</th>
					<th>HBP</th>
					<th>SO</th>
					<th>WAR</th>
				</tr>
			</thead>
		);

		const advancedHead = (
			<thead className={tableHeadTailwind}>
				<tr>
					<th>Season</th>
					<th>Age</th>
					<th>Tm</th>
					<th>GB</th>
					<th>FB</th>
					<th>LD</th>
					<th>IFFB</th>
					<th>GB/FB</th>
					<th>B</th>
					<th>S</th>
					<th>P</th>
					<th>K/9</th>
					<th>BB/9</th>
					<th>K/BB</th>
					<th>H/9</th>
					<th>HR/9</th>
					<th>WHIP</th>
					<th>BABIP</th>
					<th>FIP</th>
					<th>xFIP</th>
					<th>WPA</th>
				</tr>
			</thead>
		);

		return (
			<Table striped size="sm" style={{ margin: "0px" }}>
				{advancedToggle ? advancedHead : standardHead}
				<tbody>
					{fgStats?.pitching.map((season: FGPitchingStatsType) => {
						const standardRow = (
							<tr
								className={tableRowTailwind}
								key={season.Season}
							>
								<td>{season.Season}</td>
								<td>{season.Age}</td>
								<td>{season.Team}</td>
								<td>{season.W}</td>
								<td>{season.L}</td>
								<td>
									{season.W + season.L
										? (
												season.W /
												(season.W + season.L)
										  ).toFixed(3)
										: ""}
								</td>
								<td>{season.ERA.toFixed(2)}</td>
								<td>{season.G}</td>
								<td>{season.GS}</td>
								<td>{season.CG}</td>
								<td>{season.ShO}</td>
								<td>{season.SV}</td>
								<td>{season.IP.toFixed(1)}</td>
								<td>{season.H}</td>
								<td>{season.R}</td>
								<td>{season.ER}</td>
								<td>{season.HR}</td>
								<td>{season.BB}</td>
								<td>{season.HBP}</td>
								<td>{season.SO}</td>
								<td>{season.WAR.toFixed(1)}</td>
							</tr>
						);

						const advancedRow = (
							<tr
								className={tableRowTailwind}
								key={season.Season}
							>
								<td>{season.Season}</td>
								<td>{season.Age}</td>
								<td>{season.Team}</td>
								<td>{season.GB}</td>
								<td>{season.FB}</td>
								<td>{season.LD}</td>
								<td>{season.IFFB}</td>
								<td>{season["GB/FB"].toFixed(2)}</td>
								<td>{season.Balls}</td>
								<td>{season.Strikes}</td>
								<td>{season.Pitches}</td>
								<td>{season["K/9"].toFixed(2)}</td>
								<td>{season["BB/9"].toFixed(2)}</td>
								<td>{season["K/BB"].toFixed(2)}</td>
								<td>{season["H/9"].toFixed(2)}</td>
								<td>{season["HR/9"].toFixed(2)}</td>
								<td>{season.WHIP.toFixed(2)}</td>
								<td>{season.BABIP.toFixed(3)}</td>
								<td>{season.FIP.toFixed(2)}</td>
								<td>{season.xFIP.toFixed(2)}</td>
								<td>{season.WPA.toFixed(2)}</td>
							</tr>
						);
						return advancedToggle ? advancedRow : standardRow;
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
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)}
		</div>
	);
}

export default Player;

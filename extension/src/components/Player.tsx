import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ServersType } from "../types/App_Types";
import PropTypes, { InferProps } from "prop-types";
import {
	stateType,
	PlayerStatsType,
	FGResponseType,
	FGBattingStatsType,
	FGPitchingStatsType,
	FGFieldingStatsType,
} from "../types/Player_Types";
import { useLocation } from "react-router-dom";
import { Spinner, Table } from "react-bootstrap";

Player.propTypes = {
	servers: PropTypes.object.isRequired as never as ServersType,
};

function Player(props: InferProps<typeof Player.propTypes>) {
	const location = useLocation();
	const { mlbamID, playerInfo } = location.state as stateType;
	const [fgStats, setFGStats] = useState<PlayerStatsType>();
	const [active, setActive] = useState<"batting" | "pitching" | "fielding">();
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
				const fielding = response.data.result.fielding
					? JSON.parse(response.data.result.fielding)
					: [];
				setFGStats({
					batting: batting,
					pitching: pitching,
					fielding: fielding,
				});
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
		const batting = fgStats?.batting.length ? (
			active === "batting" ? (
				<div className="tw-h-full tw-w-full tw-bg-nav-blue-extra-light tw-border-r">
					{"Batting"}
				</div>
			) : (
				<div
					onClick={() => {
						setActive("batting");
					}}
					className="tw-h-full tw-w-full tw-bg-nav-blue tw-border-r"
				>
					{"Batting"}
				</div>
			)
		) : (
			""
		);
		const pitching = fgStats?.pitching.length ? (
			active === "pitching" ? (
				<div className="tw-h-full tw-w-full tw-bg-nav-blue-extra-light tw-border-r">
					{"Pitching"}
				</div>
			) : (
				<div
					onClick={() => {
						setActive("pitching");
					}}
					className="tw-h-full tw-w-full tw-bg-nav-blue tw-border-r"
				>
					{"Pitching"}
				</div>
			)
		) : (
			""
		);
		const fielding = fgStats?.fielding.length ? (
			active === "fielding" ? (
				<div className="tw-h-full tw-w-full tw-bg-nav-blue-extra-light tw-border-r">
					{"Fielding"}
				</div>
			) : (
				<div
					onClick={() => {
						setActive("fielding");
					}}
					className="tw-h-full tw-w-full tw-bg-nav-blue tw-border-r"
				>
					{"Fielding"}
				</div>
			)
		) : (
			""
		);
		return (
			<div className="tw-h-full tw-flex tw-border-white tw-border-x tw-border-b">
				{batting}
				{pitching}
				{fielding}
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
					<th>BB%</th>
					<th>K%</th>
					<th>GB%</th>
					<th>FB%</th>
					<th>ISO</th>
					<th>BABIP</th>
					<th>wOBA</th>
					<th>wRAA</th>
					<th>wRC</th>
					<th>wRC+</th>
					<th>WPA</th>
					<th>UBR</th>
					<th>BsR</th>
					<th>Pull%</th>
					<th>Cent%</th>
					<th>Opp%</th>
					<th>Soft%</th>
					<th>Med%</th>
					<th>Hard%</th>
					<th>TTO%</th>
				</tr>
			</thead>
		);

		return (
			<Table
				striped
				size="sm"
				style={{ margin: "0px" }}
				className="tw-whitespace-nowrap"
			>
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
								<td>{season.AVG?.toFixed(3)}</td>
								<td>{season.OBP?.toFixed(3)}</td>
								<td>{season.OPS?.toFixed(3)}</td>
								<td>{season.GDP}</td>
								<td>{season.HBP}</td>
								<td>{season.WAR?.toFixed(1)}</td>
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
								<td>
									{(
										season["BB%"] && season["BB%"] * 100
									)?.toFixed(1)}
									%
								</td>
								<td>
									{(
										season["K%"] && season["K%"] * 100
									)?.toFixed(1)}
									%
								</td>
								<td>
									{(
										season["GB%"] && season["GB%"] * 100
									)?.toFixed(1)}
									%
								</td>
								<td>
									{(
										season["FB%"] && season["FB%"] * 100
									)?.toFixed(1)}
									%
								</td>
								<td>{season.ISO?.toFixed(3)}</td>
								<td>{season.BABIP?.toFixed(3)}</td>
								<td>{season.wOBA?.toFixed(3)}</td>
								<td>{season.wRAA?.toFixed(1)}</td>
								<td>{season.wRC}</td>
								<td>{season["wRC+"]}</td>
								<td>{season.WPA?.toFixed(2)}</td>
								<td>{season.UBR?.toFixed(1)}</td>
								<td>{season.BsR?.toFixed(1)}</td>
								<td>
									{(
										season["Pull%"] && season["Pull%"] * 100
									)?.toFixed(1)}
									%
								</td>
								<td>
									{(
										season["Cent%"] && season["Cent%"] * 100
									)?.toFixed(1)}
									%
								</td>
								<td>
									{(
										season["Oppo%"] && season["Oppo%"] * 100
									)?.toFixed(1)}
									%
								</td>
								<td>
									{(
										season["Soft%"] && season["Soft%"] * 100
									)?.toFixed(1)}
									%
								</td>
								<td>
									{(
										season["Med%"] && season["Med%"] * 100
									)?.toFixed(1)}
									%
								</td>
								<td>
									{(
										season["Hard%"] && season["Hard%"] * 100
									)?.toFixed(1)}
									%
								</td>
								<td>
									{(
										season["TTO%"] && season["TTO%"] * 100
									)?.toFixed(1)}
									%
								</td>
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
			<Table
				striped
				size="sm"
				style={{ margin: "0px" }}
				className="tw-whitespace-nowrap"
			>
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
										  )?.toFixed(3)
										: ""}
								</td>
								<td>{season.ERA?.toFixed(2)}</td>
								<td>{season.G}</td>
								<td>{season.GS}</td>
								<td>{season.CG}</td>
								<td>{season.ShO}</td>
								<td>{season.SV}</td>
								<td>{season.IP?.toFixed(1)}</td>
								<td>{season.H}</td>
								<td>{season.R}</td>
								<td>{season.ER}</td>
								<td>{season.HR}</td>
								<td>{season.BB}</td>
								<td>{season.HBP}</td>
								<td>{season.SO}</td>
								<td>{season.WAR?.toFixed(1)}</td>
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
								<td>{season["GB/FB"]?.toFixed(2)}</td>
								<td>{season.Balls}</td>
								<td>{season.Strikes}</td>
								<td>{season.Pitches}</td>
								<td>{season["K/9"]?.toFixed(2)}</td>
								<td>{season["BB/9"]?.toFixed(2)}</td>
								<td>{season["K/BB"]?.toFixed(2)}</td>
								<td>{season["H/9"]?.toFixed(2)}</td>
								<td>{season["HR/9"]?.toFixed(2)}</td>
								<td>{season.WHIP?.toFixed(2)}</td>
								<td>{season.BABIP?.toFixed(3)}</td>
								<td>{season.FIP?.toFixed(2)}</td>
								<td>{season.xFIP?.toFixed(2)}</td>
								<td>{season.WPA?.toFixed(2)}</td>
							</tr>
						);
						return advancedToggle ? advancedRow : standardRow;
					})}
				</tbody>
			</Table>
		);
	}

	function fielding_table() {
		const standardHead = (
			<thead className={tableHeadTailwind}>
				<tr>
					<th>Season</th>
					<th>Tm</th>
					<th>Pos</th>
					<th>G</th>
					<th>GS</th>
					<th>Inn</th>
					<th>PO</th>
					<th>A</th>
					<th>E</th>
					<th>FE</th>
					<th>TE</th>
					<th>DP</th>
					<th>DPS</th>
					<th>DPT</th>
					<th>DPF</th>
					<th>SCP</th>
					<th>SB</th>
					<th>CS</th>
					<th>PB</th>
					<th>WP</th>
					<th>FP</th>
					<th>TZ</th>
				</tr>
			</thead>
		);

		const advancedHead = (
			<thead className={tableHeadTailwind}>
				<tr>
					<th>Season</th>
					<th>Tm</th>
					<th>Pos</th>
					<th>Inn</th>
					<th>rSZ</th>
					<th>rCERA</th>
					<th>rSB</th>
					<th>rGDP</th>
					<th>rARM</th>
					<th>rGFP</th>
					<th>rPM</th>
					<th>DRS</th>
					<th>ARM</th>
					<th>DPR</th>
					<th>RngR</th>
					<th>ErrR</th>
					<th>UZR</th>
					<th>UZR/150</th>
					<th>FRM</th>
				</tr>
			</thead>
		);

		return (
			<Table
				striped
				size="sm"
				style={{ margin: "0px" }}
				className="tw-whitespace-nowrap"
			>
				{advancedToggle ? advancedHead : standardHead}
				<tbody>
					{fgStats?.fielding.map((season: FGFieldingStatsType) => {
						const standardRow = (
							<tr
								className={tableRowTailwind}
								key={season.Season + season.Pos}
							>
								<td>{season.Season}</td>
								<td>{season.Team}</td>
								<td>{season.Pos}</td>
								<td>{season.G}</td>
								<td>{season.GS}</td>
								<td>{season.Inn?.toFixed(1)}</td>
								<td>{season.PO}</td>
								<td>{season.A}</td>
								<td>{season.E}</td>
								<td>{season.FE}</td>
								<td>{season.TE}</td>
								<td>{season.DP}</td>
								<td>{season.DPS}</td>
								<td>{season.DPT}</td>
								<td>{season.DPF}</td>
								<td>{season.Scp}</td>
								<td>{season.SB}</td>
								<td>{season.CS}</td>
								<td>{season.PB}</td>
								<td>{season.WP}</td>
								<td>{season.FP?.toFixed(3)}</td>
								<td>{season.TZ}</td>
							</tr>
						);

						const advancedRow = (
							<tr
								className={tableRowTailwind}
								key={season.Season + season.Pos}
							>
								<td>{season.Season}</td>
								<td>{season.Team}</td>
								<td>{season.Pos}</td>
								<td>{season.Inn?.toFixed(1)}</td>
								<td>{season.rSZ}</td>
								<td>{season.rCERA}</td>
								<td>{season.rSB}</td>
								<td>{season.rGDP}</td>
								<td>{season.rARM}</td>
								<td>{season.rGFP}</td>
								<td>{season.rPM}</td>
								<td>{season.DRS}</td>
								<td>{season.ARM?.toFixed(1)}</td>
								<td>{season.DPR?.toFixed(1)}</td>
								<td>{season.RngR?.toFixed(1)}</td>
								<td>{season.ErrR?.toFixed(1)}</td>
								<td>{season.UZR?.toFixed(1)}</td>
								<td>{season["UZR/150"]?.toFixed(1)}</td>
								<td>{season.FRM?.toFixed(1)}</td>
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
		} else if (active === "pitching") {
			return pitching_table();
		} else if (active === "fielding") {
			return fielding_table();
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

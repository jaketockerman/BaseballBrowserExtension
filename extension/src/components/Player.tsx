import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { ServersType } from "../types/App_Types";
import PropTypes, { InferProps } from "prop-types";
import { useInterval } from "usehooks-ts";
import { player_Type } from "../types/Live_Types";
import { useLocation } from "react-router-dom";

Player.propTypes = {
	servers: PropTypes.object.isRequired as never as ServersType,
};

interface stateType {
	mlbamID: number;
	playerInfo: player_Type;
}

interface FGBattingStatsType {
	AVG: number;
}

interface FGPitchingStatsType {
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
	const [playerDelay, setPlayerDelay] = useState<number | null>(500);
	const [fgStats, setFGStats] = useState<PlayerStatsType>();
	//test player 460075: Braun
	//test player 592885: Yelich
	//test player 660271: Ohtani (has both pitching and batting)
	//test player 669203: Burnes (has both pitching and batting)
	//test player 541650: Hernan Perez (has both pitching and batting)

	useInterval(() => {
		axios
			.get<FGResponseType>(props.servers.pybaseball + "player/" + mlbamID)
			.then((response) => {
				// setPlayerData(response.data.result);
				setPlayerDelay(null);
				const batting = response.data.result.batting
					? JSON.parse(response.data.result.batting)
					: [];
				const pitching = response.data.result.pitching
					? JSON.parse(response.data.result.pitching)
					: [];
				setFGStats({ batting: batting, pitching: pitching });
			})
			.catch((error: AxiosError<{ additionalInfo: string }>) => {
				if (error.response?.status != 200) {
					console.log(error.message);
				}
			});
	}, playerDelay);

	function display_headshot(playerIDNum: number) {
		const link = `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${playerIDNum}/headshot/67/current`;
		return <img src={link} className="tw-max-w-full" />;
	}

	function player_info() {
		const dividerStyle = {
			borderBottom: "1px solid",
			borderColor: "#FFFFFF",
		};
		// const backStyle = {
		// 	border: "1px solid",
		// 	borderColor: "#FFFFFF",
		// };

		return (
			<div
				className="tw-max-h-3/6 tw-flex tw-w-full"
				style={dividerStyle}
			>
				<div className="tw-flex tw-flex-col tw-text-left tw-w-2/12">
					{/* <div className="tw-w-full tw-h-1/12 tw-text-center" style={backStyle} onClick={()=>{navigate(-1);}}> 
						<img src={arrowLeft} alt="back" />
					</div> */}
					<div className="tw-min-h-0 tw-min-w-0">
						{mlbamID ? display_headshot(mlbamID) : ""}
					</div>
				</div>
				<div className="tw-w-full tw-h-full tw-flex tw-flex-col">
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

	function display_player() {
		console.log("batting");
		console.log(fgStats?.batting ? fgStats?.batting : "no batting data");
		console.log("pitching");
		console.log(fgStats?.pitching ? fgStats?.pitching : "no pitching data");
		return (
			<React.Fragment>
				<React.Fragment>{player_info()}</React.Fragment>
				<div className="tw-h-full tw-w-full"></div>
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

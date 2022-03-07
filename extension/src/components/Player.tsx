import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { ServersType } from "../types/App_Types";
import PropTypes, { InferProps, number } from "prop-types";
import { useInterval } from "usehooks-ts";

Player.propTypes = {
	mlbamID: number,
	servers: PropTypes.object.isRequired as never as ServersType,
};

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
	const [playerDelay, setPlayerDelay] = useState<number | null>(500);
	const [fgStats, setFGStats] = useState<PlayerStatsType>();
	//test player 460075: Braun
	//test player 592885: Yelich
	//test player 660271: Ohtani (has both pitching and batting)
	//test player 669203: Burnes (has both pitching and batting)
	//test player 541650: Hernan Perez (has both pitching and batting)

	useInterval(() => {
		axios
			.get<FGResponseType>(
				props.servers.pybaseball + "player/" + props.mlbamID
			)
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

	function player_info() {
		const style = {
			borderBottom: "1px solid",
			borderColor: "#FFFFFF",
		};

		return (
			<div className="tw-h-3/6 tw-w-full" style={style}>
				{props.mlbamID}
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
				<div className="tw-h-full tw-w-full">test_under</div>
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

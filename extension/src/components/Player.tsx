import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { ServersType } from "../types/App_Types";
import PropTypes, { InferProps, number } from "prop-types";
import { useInterval } from "usehooks-ts";

Player.propTypes = {
	mlbamID: number,
	servers: PropTypes.object.isRequired as never as ServersType,
};

function Player(props: InferProps<typeof Player.propTypes>) {
	const [playerDelay, setPlayerDelay] = useState<number | null>(1000);
	//test player 460075: Braun
	//test player 592885: Yelich
	//test player 660271: Ohtani (has both pitching and batting)
	//test player 669203: Burnes (has both pitching and batting)
	//test player 541650: Hernan Perez (has both pitching and batting)

	useInterval(() => {
		axios
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.get<any>(props.servers.pybaseball + "player/" + props.mlbamID)
			.then((response) => {
				// setPlayerData(response.data.result);
				setPlayerDelay(null);
				console.log("batting");
				console.log(
					response.data.result.batting
						? JSON.parse(response.data.result.batting)
						: "no batting data"
				);
				console.log("pitching");
				console.log(
					response.data.result.pitching
						? JSON.parse(response.data.result.pitching)
						: "no pitching data"
				);
			})
			.catch((error: AxiosError<{ additionalInfo: string }>) => {
				if (error.response?.status != 200) {
					console.log(error.message);
				}
			});
	}, playerDelay);

	return (
		<div className="tw-flex tw-flex-col tw-h-full tw-items-center tw-justify-center">
			<div>This is the Player page {props.mlbamID} </div>
			<div></div>
		</div>
	);
}

export default Player;

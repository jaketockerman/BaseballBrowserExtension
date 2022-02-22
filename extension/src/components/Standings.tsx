import React, { useState, useEffect } from "react";
import PropTypes, { InferProps } from "prop-types";
import "./Standings.css";
import axios, { AxiosError } from "axios";
import { ServersType } from "../Types";

Standings.propTypes = {
	servers: PropTypes.object.isRequired as never as ServersType,
};

interface Standings_Response {
	result: Array<Division>;
}

interface Standings_Type {
	divisions: Array<Division>;
	valid: boolean;
	error?: string;
}

interface Division {
	div_name: string;
	teams: Array<Team>;
}

interface Team {
	div_rank: string;
	elim_num: string;
	gb: string;
	l: number;
	league_rank: string;
	name: string;
	sport_rank: string;
	team_id: number;
	w: number;
	wc_elim_num: string;
	wc_gb: string;
	wc_rank: string;
}

function Standings(props: InferProps<typeof Standings.propTypes>) {
	const [standings, setStandings] = useState<Standings_Type>();
	const [year] = useState(2021);

	useEffect(() => {
		axios
			.get<Standings_Response>(props.servers.mlbstats + "standings/")
			.then((response) => {
				setStandings({
					divisions: Object.values(response.data.result),
					valid: true,
				});
			})
			.catch((error: AxiosError<{ additionalInfo: string }>) => {
				if (error.response?.status != 200) {
					setStandings({
						divisions: [],
						valid: false,
						error: error.message,
					});
				}
				console.log(error.message);
			});
	}, [year]);

	function display_division(division: Division) {
		return (
			<table key={division.div_name}>
				<thead>
					<tr>
						<td>Team</td>
						<td>W</td>
						<td>L</td>
						{/* <td>PCT</td> */}
						<td>GB</td>
					</tr>
				</thead>
				<tbody>
					{division.teams.map((team: Team) => {
						return (
							<tr key={team.team_id}>
								<td>{team.name}</td>
								<td>{team.w}</td>
								<td>{team.l}</td>
								{/* <td>{team["W-L%"]}</td> */}
								<td>{team.gb}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}

	function display_standings(standings: Standings_Type) {
		if (standings.valid) {
			return standings.divisions.map((division: Division) => {
				return display_division(division);
			});
		} else {
			return "unable to connect to mlbstats server: " + standings.error;
		}
	}

	return (
		<div className="Standings">
			{standings != undefined ? (
				display_standings(standings)
			) : (
				<React.Fragment> Loading... </React.Fragment>
			)}
		</div>
	);
}

export default Standings;

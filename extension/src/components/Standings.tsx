import React, { useState, useEffect } from "react";
import PropTypes, { InferProps } from "prop-types";
import "./Standings.css";
import axios from "axios";
import { ServersType } from "../Types";

Standings.propTypes = {
	servers: PropTypes.object.isRequired as never as ServersType,
};

interface Standings_Response {
	result: Array<Divison>;
}

interface Divison {
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
	const [standings, setStandings] = useState<Standings_Response["result"]>();
	const [year] = useState(2021);

	useEffect(() => {
		axios
			.get<Standings_Response>(
				props.servers.mlbstats + "standings/" + year.toString()
			)
			.then((response) => {
				setStandings(Object.values(response.data.result));
				console.log(standings);
			});
	}, [year]);

	function display_division(division: Divison) {
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

	function display_standings(divisions: Array<Divison>) {
		return divisions.map((division: Divison) => {
			return display_division(division);
		});
	}

	return (
		<div className="Standings">
			{standings != undefined ? (
				display_standings(standings)
			) : (
				<React.Fragment />
			)}
		</div>
	);
}

export default Standings;

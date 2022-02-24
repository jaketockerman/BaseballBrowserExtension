import React, { useState, useEffect } from "react";
import PropTypes, { InferProps } from "prop-types";
import "./Standings.css";
import axios, { AxiosError } from "axios";
import { ServersType } from "../Types";
import { Table } from "react-bootstrap";

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
		const header_style = {
			color: "#eceef1",
			backgroundColor: "#041e42",
			borderColor: "#041e42",
		};
		const row_style = {
			backgroundColor: "#eceef1",
			borderColor: "#e4e4e4",
		};
		return (
			<Table bordered size="sm" key={division.div_name}>
				<thead>
					<tr style={header_style}>
						<th>{division.div_name}</th>
						<th>W</th>
						<th>L</th>
						<th>PCT</th>
						<th>GB</th>
					</tr>
				</thead>
				<tbody>
					{division.teams.map((team: Team) => {
						return (
							<tr style={row_style} key={team.team_id}>
								<td>{team.name}</td>
								<td>{team.w}</td>
								<td>{team.l}</td>
								<td>
									{(team.w / (team.w + team.l)).toFixed(3)}
								</td>
								<td>{team.gb}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
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

import React, { useState } from "react";
import PropTypes, { InferProps } from "prop-types";
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
	if (standings === undefined) {
		axios
			.get<Standings_Response>(props.servers.mlbstats + "standings/")
			.then((response) => {
				setStandings({
					divisions: [
						response.data.result["201"],
						response.data.result["202"],
						response.data.result["200"],
						response.data.result["204"],
						response.data.result["205"],
						response.data.result["203"],
					],
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
			});
	}

	function display_division(division: Division) {
		return (
			<div className="tw-px-5 tw-pt-3 tw-w-full">
				<Table bordered size="sm" key={division.div_name}>
					<thead>
						<tr className="tw-text-white tw-bg-nav-blue tw-border-[#041e42]">
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
								<tr
									className="tw-bg-[#eceef1] tw-border-[#e4e4e4]"
									key={team.team_id}
								>
									<td>{team.name}</td>
									<td>{team.w}</td>
									<td>{team.l}</td>
									<td>
										{(team.w / (team.w + team.l)).toFixed(
											3
										)}
									</td>
									<td>{team.gb}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
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
		<div className="tw-bg-app-dark tw-min-h-full tw-flex tw-flex-col tw-items-center tw-justify-center">
			{standings != undefined ? (
				display_standings(standings)
			) : (
				<React.Fragment> Loading... </React.Fragment>
			)}
		</div>
	);
}

export default Standings;

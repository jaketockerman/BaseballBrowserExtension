import React, { useState, useEffect } from "react";
import PropTypes, { InferProps } from "prop-types";
import "./Standings.css";
import axios from "axios";

Standings.propTypes = {
	servers: PropTypes.shape({
		pybaseball: PropTypes.string.isRequired,
	}).isRequired,
};

interface Standings_Response {
	result: Array<Array<Team>>;
}

interface Team {
	GB: string;
	L: string;
	Tm: string;
	W: string;
	"W-L%": string;
}

function Standings(props: InferProps<typeof Standings.propTypes>) {
	const [standings, setStandings] = useState<Array<Array<Team>>>();
	const [year] = useState(2021);

	useEffect(() => {
		axios
			.get<Standings_Response>(
				props.servers.pybaseball + "standings/" + year.toString()
			)
			.then((response) => {
				setStandings(response.data.result);
				// console.log(standings);
			});
	}, [year]);

	function display_division(division: Array<Team>) {
		return (
			<table>
				<tr>
					<td>Team</td>
					<td>W</td>
					<td>L</td>
					<td>PCT</td>
					<td>GB</td>
				</tr>
				{division.map((team: Team) => {
					return (
						<tr key={team.Tm}>
							<td>{team.Tm}</td>
							<td>{team.W}</td>
							<td>{team.L}</td>
							<td>{team["W-L%"]}</td>
							<td>{team.GB}</td>
						</tr>
					);
				})}
			</table>
		);
	}

	function display_standings(divisions: Array<Array<Team>>) {
		return divisions.map((division: Array<Team>) => {
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

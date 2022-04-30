import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Spinner, Table } from "react-bootstrap";
import {
	Division,
	mlbDivisionType,
	mlbTeamType,
	Standings_Response,
	Standings_Type,
	Team,
} from "../types/Standings_Types";

function convertStandings(r: Array<mlbDivisionType>): Array<Division> {
	return r.map((mlbDivision: mlbDivisionType) => {
		const divTeams: Array<Team> = mlbDivision.teamRecords.map(
			(mlbTeam: mlbTeamType) => {
				const team: Team = {
					name: mlbTeam.team.name,
					div_rank: mlbTeam.divisionRank,
					elim_num: mlbTeam.eliminationNumber,
					gb: mlbTeam.gamesBack,
					l: mlbTeam.losses,
					league_rank: mlbTeam.leagueRank,
					sport_rank: mlbTeam.sportRank,
					team_id: mlbTeam.team.id,
					w: mlbTeam.wins,
					wc_elim_num: mlbTeam.wildCardEliminationNumber
						? mlbTeam.wildCardEliminationNumber
						: "-",
					wc_gb: mlbTeam.wildCardGamesBack
						? mlbTeam.wildCardGamesBack
						: "-",
					wc_rank: mlbTeam.wildCardRank ? mlbTeam.wildCardRank : "-",
				};
				return team;
			}
		);
		return {
			teams: divTeams,
			id: mlbDivision.division.id,
			div_name: mlbDivision.teamRecords[0].team.division.name,
		};
	});
}

function Standings() {
	const [standings, setStandings] = useState<Standings_Type>();
	const [season, setSeason] = useState<number>(new Date().getFullYear());
	useEffect(() => {
		const standings_params = {
			leagueId: "103,104",
			season: season,
			standingsTypes: "regularSeason",
			hydrate: "team(division)",
			fields: "records,standingsType,teamRecords,team,name,division,id,nameShort,abbreviation,divisionRank,gamesBack,wildCardRank,wildCardGamesBack,wildCardEliminationNumber,divisionGamesBack,clinched,eliminationNumber,winningPercentage,type,wins,losses,leagueRank,sportRank",
		};
		axios
			.get<Standings_Response>(
				"https://statsapi.mlb.com/api/v1/standings",
				{ params: standings_params }
			)
			.then((response) => {
				if (response.data.records.length) {
					setStandings({
						divisions: convertStandings(response.data.records),
						valid: true,
						error: "",
					});
				} else {
					console.log(season);
					setSeason(season - 1);
				}
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
	}, [season]);

	function display_division(division: Division) {
		return (
			<div className="tw-px-5 tw-pt-3 tw-w-full" key={division.div_name}>
				<Table bordered size="sm" key={division.div_name + "table"}>
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
										{team.w + team.l
											? (
													team.w /
													(team.w + team.l)
											  ).toFixed(3)
											: ""}
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
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)}
		</div>
	);
}

export default Standings;

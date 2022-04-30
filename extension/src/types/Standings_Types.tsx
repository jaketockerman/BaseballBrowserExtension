interface Standings_Response {
	records: Array<mlbDivisionType>;
}

interface Standings_Type {
	divisions: Array<Division>;
	valid: boolean;
	error?: string;
}

interface mlbTeamDivisionInfoType {
	abbreviation: string;
	id: number;
	name: string;
	nameShort: string;
}

interface mlbTeamType {
	clinched: boolean;
	divisionGamesBack: string;
	divisionRank: string;
	eliminationNumber: string;
	gamesBack: string;
	leagueRank: string;
	losses: number;
	sportRank: string;
	team: mlbTeamInfoType;
	wildCardEliminationNumber: string;
	wildCardGamesBack: string;
	wildCardRank: string;
	winningPercentage: string;
	wins: number;
}

interface mlbTeamInfoType {
	id: number;
	name: string;
	abbreviation: string;
	division: mlbTeamDivisionInfoType;
}

interface mlbDivisionInfoType {
	id: number;
}

interface mlbDivisionType {
	division: mlbDivisionInfoType;
	teamRecords: Array<mlbTeamType>;
}

interface Division {
	div_name: string;
	id: number;
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

export type {
	Standings_Response,
	Standings_Type,
	mlbTeamType,
	mlbDivisionType,
	Division,
	Team,
};

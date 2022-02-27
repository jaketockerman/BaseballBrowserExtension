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

export type { Standings_Response, Standings_Type, Division, Team };

//ALL GAME DATA FROM HERE UNTIL LINE 155
interface gameData_Response {
	result: gameData_Type;
}

interface gameData_Type {
	alert: Array<unknown>;
	flags: flags_Type;
	gameInfo: gameInfo_Type;
	players: object;
	review: review_Type;
	teams: teams_Type;
	venue: activeVenue_Type;
	weather: weather_Type;
}

interface weather_Type {
	condition: string;
	temp: string;
	wind: string;
}

interface activeVenue_Type {
	fieldInfo: fieldInfo_Type;
}

interface fieldInfo_Type {
	capacity: number;
	center: number;
	leftCenter: number;
	leftLine: number;
	rightCenter: number;
	rightLine: number;
	roofType: string;
	turfType: string;
	id: number;
	name: string;
}

interface teams_Type {
	away: teamsInfo_Type;
	home: teamsInfo_Type;
}

interface teamsInfo_Type {
	abbeviation: string;
	clubName: string;
	division: division_Type;
	firstYearOfPlay: string;
	franchiseName: string;
	id: number;
	league: league_Type;
	locationName: string;
	name: string;
	record: record_Type;
	springLeague: springLeague_Type;
	teamCode: string;
	teamName: string;
	venue: venue_Type;
}

interface division_Type {
	id: number;
	name: string;
}

interface league_Type {
	id: number;
	name: string;
}

interface record_Type {
	conferenceGamesBack: string;
	divisionGamesBack: string;
	divisionLeader: boolean;
	gamesPlayed: number;
	leagueGamesBack: string;
	losses: number;
	wildCardGamesBack: string;
	winningPercentage: string;
	wins: number;
}

interface springLeague_Type {
	abbreviation: string;
	id: number;
	name: string;
}

interface venue_Type {
	id: number;
	name: string;
}

interface review_Type {
	away: reviewLeft_Type;
	home: reviewLeft_Type;
	hasChallenges: boolean;
}

interface reviewLeft_Type {
	remaining: number;
	used: number;
}

interface gameInfo_Type {
	attendance: number;
	gameDurationMinutes: number;
}

interface flags_Type {
	awayTeamNoHitter: boolean;
	awayTeamPerfectGame: boolean;
	homeTeamNoHitter: boolean;
	homeTeamPerfectGame: boolean;
	noHitter: boolean;
	perfectGame: boolean;
}

interface player_Type {
	active?: boolean;
	batSide?: batSide_Type;
	birthCity?: string;
	birthCountry?: string;
	birthDate?: string;
	birthStateProvince?: string;
	currentAge?: number;
	draftYear?: number;
	fullName?: string;
	height?: string;
	id: number;
	mlbDebutDate?: string;
	nickName?: string;
	pitchHand?: pitchHand_Type;
	primaryNumber?: string;
	primaryPosition?: primaryPosition_Type;
	pronunciation?: string;
	strikeZoneBottom: number;
	strikeZoneTop: number;
	weight: number;
}

interface primaryPosition_Type {
	abbreviation: string;
	code: string;
	name: string;
	type: string;
}

interface pitchHand_Type {
	code: string;
	description: string;
}
interface batSide_Type {
	code: string;
	description: string;
}

//ALL LIVE DATA FROM HERE ON
//-----------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------//

interface liveData_Response {
	result: liveData_Type;
}

interface liveData_Type{
	boxscore: boxscore_Type;
	plays: plays_Type;
}

interface plays_Type {
	currentPlay: currentPlay_Type;
}

interface currentPlay_Type {
	count: count_Type;
	matchup: matchup_Type;
	pitchIndex: Array<number>;
	playEvents: Array<playEvents_Type>;
	result: result_Type;
}

interface result_Type {
	awayScore: number;
	description: string;
	event: string;
	eventType: string;
	homeScore: number;
	rbi: number;
	type: string;
}

interface playEvents_Type {
	count: count_Type;
	details: details_Type;
	index: number;
	isPitch: boolean;
	pitchData: pitchData_Type;
	pitchNumber: number;
	type: string;
}

interface pitchData_Type {
	breaks: breaks_Type;
	coordinates: coordinates_Type;
	endSpeed: number;
	extension: number;
	plateTime: number;
	startSpeed: number;
	strikeZoneBottom: number;
	strikeZoneTop: number;
	typeConfidence: number;
	zone: number;
}

interface coordinates_Type {
	aX: number;
	aY: number;
	aZ: number;
	pX: number;
	pZ: number;
	pfxX: number;
	pfxZ: number;
	vX0: number;
	vY0: number;
	vZ0: number;
	x: number;
	x0: number;
	y: number;
	y0: number;
	z0: number;
}

interface breaks_Type {
	breakAngle: number;
	breakLength: number;
	breakY: number;
	spinDirection: number;
	spinRate: number;
}

interface details_Type {
	call: call_Type;
	code: string;
	description: string;
	hasReview: boolean;
	isBall: boolean;
	isInPlay: boolean;
	isStrike: boolean;
	type: type_Type;
}

interface type_Type {
	code: string;
	description: string; //Type Of Pitch ?
}

interface call_Type {
	code: string;
	description: string;
}

interface matchup_Type {
	batSide: batSide_Type;
	batter: batter_Type;
	pitchHand: pitchHand_Type;
	pitcher: pitcher_Type;
}

interface pitcher_Type {
	fullName: string;
	id: number;
}

interface batter_Type {
	fullName: string;
	id: number;
}

interface count_Type {
	balls: number;
	outs: number;
	strikes: number;
}

interface boxscore_Type {
	teams: team_Type;
}

interface team_Type {
	away: teamInfo_Type;
	home: teamInfo_Type;
}

interface teamInfo_Type {
	batters: Array<number>;
	battingOrder: Array<number>;
	bench: Array<number>;
	bullpen: Array<number>;
	teamStats: teamStats_Type;
}

interface teamStats_Type {
	batting: batting_Type;
	fielding: fielding_Type;
	pitching: pitching_Type;
}

interface pitching_Type {
	airOuts: number;
	atBats: number;
	balks: number;
	baseOnBalls: number;
	battersFaced: number;
	catchersInterference: number;
	caughtStealing: number;
	completeGames: number;
	doubles: number;
	earnedRuns: number;
	era: string;
	groundOuts: number;
	hitBatsmen: number;
	hitByPitch: number;
	hits: number;
	homeRuns: number;
	homeRunsPer9: string;
	inheritedRunners: number;
	inheritedRunnersScored: number;
	inningsPitched: string;
	intentionalWalks: number;
	numberOfPitches: number;
	obp: string;
	outs: number;
	pickoffs: number;
	pitchesPerInning: string;
	pitchesThrown: number;
	rbi: number;
	runs: number;
	runsScoredPer9: string;
	sacBunts: number;
	sacFlies: number;
	saveOpportunities: number;
	shutouts: number;
	stolenBasePercentage: string;
	stolenBases: number;
	strikeOuts: number;
	strikePercentage: string;
	strikes: number;
	triples: number;
	whip: string;
	wildPitches: number;
}

interface fielding_Type {
	assists: number;
	caughtStealing: number;
	chances: number;
	errors: number;
	passedBall: number;
	pickoffs: number;
	putOuts: number;
	stolenBasePercentage: string;
	stolenBases: number;
}

interface batting_Type {
	atBats: number;
	atBatsPerHomeRun: string;
	avg: string;
	baseOnBalls: number;
	catchersInterference: number;
	caughtStealing: number;
	doubles: number;
	flyOuts: number;
	groundIntoDoublePlay: number;
	groundIntoTriplePlay: number;
	groundOuts: number;
	hitByPitch: number;
	hits: number;
	homeRuns: number;
	leftOnBase: number;
	obp: string;
	ops: string;
	pickoffs: number;
	plateAppearances: number;
	rbi: number;
	runs: number;
	sacBunts: number;
	sacFlies: number;
	slg: string;
	stolenBasePercentage: string;
	stolenBases: number;
	strikeOuts: number;
	totalBases: number;
	triples: number;
}

export type {
	gameData_Response,
	gameData_Type,
	weather_Type,
	activeVenue_Type,
	fieldInfo_Type,
	teams_Type,
	teamsInfo_Type,
	division_Type,
	league_Type,
	record_Type,
	gameInfo_Type,
	flags_Type,
	player_Type,
	primaryPosition_Type,
	pitchHand_Type,
	batSide_Type,
	review_Type,
	reviewLeft_Type,
	springLeague_Type,
	venue_Type,
	liveData_Response,
	plays_Type,
	currentPlay_Type,
	result_Type,
	playEvents_Type,
	pitchData_Type,
	coordinates_Type,
	breaks_Type,
	details_Type,
	type_Type,
	call_Type,
	matchup_Type,
	pitcher_Type,
	batter_Type,
	count_Type,
	boxscore_Type,
	team_Type,
	teamInfo_Type,
	teamStats_Type,
	pitching_Type,
	fielding_Type,
	batting_Type,
	liveData_Type,
};

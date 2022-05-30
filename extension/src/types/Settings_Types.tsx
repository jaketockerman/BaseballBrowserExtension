import { ServersType } from "./App_Types";

interface SettingsType {
	servers: ServersType;
	detect: string;
}

interface ScheduleType {
	totalGamesInProgress: number;
	dates: Array<DayScheduleType>;
}

interface DayScheduleType {
	games: Array<GameType>;
}

interface GameType {
	resumeDate: string;
	gamePk: number;
	status: GameStatusType;
	teams: GameTeamsType;
}

interface GameTeamsType {
	away: TeamType;
	home: TeamType;
}

interface TeamType {
	team: TeamInfoType;
}

interface TeamInfoType {
	id: number;
	name: string;
}

interface GameStatusType {
	abstractGameState: string;
	detailedState: string;
}

export type { GameType, ScheduleType, DayScheduleType, SettingsType };

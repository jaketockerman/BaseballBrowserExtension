import { player_Type } from "../types/Live_Types";

interface playerIDs {
	result: string;
}

interface stateType {
	mlbamID: number;
	playerInfo: player_Type;
}

interface FGBattingStatsType {
	//REGULAR
	Season: number;
	Age?: number;
	Team?: string;
	G?: number;
	AB?: number;
	PA?: number;
	H?: number;
	"1B"?: number;
	"2B"?: number;
	"3B"?: number;
	HR?: number;
	R?: number;
	RBI?: number;
	BB?: number;
	SO?: number;
	HBP?: number;
	SF?: number;
	GDP?: number;
	SB?: number;
	CS?: number;
	AVG?: number;
	OBP?: number;
	OPS?: number;
	SLG?: number;
	WAR?: number;
	//ADVANCED
	"BB%"?: number;
	"K%"?: number;
	ISO?: number;
	BABIP?: number;
	"GB%"?: number;
	"FB%"?: number;
	wOBA?: number;
	wRAA?: number;
	wRC?: number;
	"wRC+"?: number;
	WPA?: number;
	UBR?: number;
	BsR?: number;
	"Pull%"?: number;
	"Cent%"?: number;
	"Oppo%"?: number;
	"Soft%"?: number;
	"Med%"?: number;
	"Hard%"?: number;
	"TTO%"?: number;
}

interface FGPitchingStatsType {
	//REGULAR
	Season: number;
	Age: number;
	Team: string;
	W: number;
	L: number;
	ERA: number;
	G: number;
	GS: number;
	GF: number;
	CG: number;
	ShO: number;
	SV: number;
	IP: number;
	H: number;
	R: number;
	ER: number;
	HR: number;
	BB: number;
	IBB: number;
	HBP: number;
	WP: number;
	BK: number;
	SO: number;
	WAR: number;
	//ADVANCED
	GB: number;
	FB: number;
	LD: number;
	IFFB: number;
	Balls: number;
	Strikes: number;
	Pitches: number;
	"K/9": number;
	"BB/9": number;
	"K/BB": number;
	"H/9": number;
	"HR/9": number;
	WHIP: number;
	BABIP: number;
	FIP: number;
	"GB/FB": number;
	xFIP: number;
	WPA: number;
}

interface FGFieldingStatsType {
	//REGULAR
	Season: number;
	Age: number;
	Team: string;
	Pos: string;
	G: number;
	GS: number;
	Inn: number;
	PO: number;
	A: number;
	E: number;
	FE: number;
	TE: number;
	DP: number;
	DPS: number;
	DPT: number;
	DPF: number;
	Scp: number;
	SB: number;
	CS: number;
	PB: number;
	WP: number;
	FP: number;
	TZ: number;
	//ADVANCED
	rSZ: number;
	rCERA: number;
	rSB: number;
	rGDP: number;
	rARM: number;
	rGFP: number;
	rPM: number;
	DRS: number;
	ARM: number;
	DPR: number;
	RngR: number;
	ErrR: number;
	UZR: number;
	"UZR/150": number;
	FRM: number;
}

interface PlayerStatsType {
	batting: Array<FGBattingStatsType>;
	pitching: Array<FGPitchingStatsType>;
	fielding: Array<FGFieldingStatsType>;
}

interface FGResultType {
	batting?: string;
	pitching?: string;
	fielding?: string;
}

interface FGResponseType {
	result: FGResultType;
}

export type {
	playerIDs,
	stateType,
	PlayerStatsType,
	FGResponseType,
	FGBattingStatsType,
	FGPitchingStatsType,
	FGFieldingStatsType,
};

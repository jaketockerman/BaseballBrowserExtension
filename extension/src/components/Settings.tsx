import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import PropTypes, { InferProps } from "prop-types";
import { DetectType, ServersType } from "../types/App_Types";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";

Settings.propTypes = {
	servers: PropTypes.object.isRequired as never as ServersType,
	setServers: PropTypes.func.isRequired,
	detect: PropTypes.object.isRequired as never as DetectType,
	setDetect: PropTypes.func.isRequired,
};

interface SettingsType {
	servers: ServersType;
	detect: string;
}

interface Schedule {
	totalGamesInProgress: number;
	dates: Array<daySchedule>;
}

interface daySchedule {
	games: Array<Game>;
}

interface Game {
	resumeDate: string;
	gamePk: number;
	status: GameStatus;
	teams: GameTeams;
}

interface GameTeams {
	away: Team;
	home: Team;
}

interface Team {
	team: TeamInfo;
}

interface TeamInfo {
	id: number;
	name: string;
}

interface GameStatus {
	abstractGameState: string;
	detailedState: string;
}

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

function Settings(props: InferProps<typeof Settings.propTypes>) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<SettingsType>({
		mode: "all",
		defaultValues: {
			servers: { pybaseball: props.servers.pybaseball },
			detect: JSON.stringify(props.detect),
		},
	});

	const [games, setGames] = useState<Array<Game>>([]);

	useEffect(() => {
		axios
			.get<Schedule>("https://statsapi.mlb.com/api/v1/schedule", {
				params: {
					sportId: "1",
					startDate: dateFormat(yesterday),
					endDate: dateFormat(today),
				},
			})
			.then((response) => {
				setGames(
					response.data.dates.flatMap((daySchedule: daySchedule) => {
						return daySchedule.games.filter(
							(game) =>
								game.status.abstractGameState === "Live" &&
								!game.resumeDate
						);
					})
				);
			})
			.catch((error: AxiosError<{ additionalInfo: string }>) => {
				if (error.response?.status != 200) {
					console.log(error.message);
				}
			});
	}, []);

	function dateFormat(date: Date) {
		return (
			date.getFullYear() +
			"-" +
			(date.getMonth() + 1) +
			"-" +
			date.getDate()
		);
	}

	function submit(data: SettingsType) {
		props.setServers(data.servers);
		props.setDetect(JSON.parse(data.detect));
	}

	return (
		<div className="tw-flex tw-h-full tw-flex-col">
			<Form className="tw-h-full" onSubmit={handleSubmit(submit)}>
				<Container
					fluid
					className="tw-h-full tw-flex tw-flex-col tw-justify-center"
				>
					<Form.Group as={Row} controlId="pybaseball">
						<div className="tw-grid tw-justify-items-stretch tw-px-0">
							<Form.Label column lg={true}>
								backend server:
							</Form.Label>
						</div>
						<div className="tw-grid tw-justify-items-center">
							<Col lg={true}>
								<Form.Control
									type="text"
									{...register("servers.pybaseball", {
										required: {
											value: true,
											message: "Server is Required",
										},
										pattern: {
											value: /\/$/i,
											/* prettier-ignore */
											message: "URL must end in \"/\"",
										},
									})}
								/>
							</Col>
							<div className="tw-text-[15px] tw-py-0 tw-text-[#bf1650]">
								{errors?.servers?.pybaseball?.message}
							</div>
						</div>
					</Form.Group>
					<Form.Group as={Row} controlId="setGame">
						<div className="tw-grid tw-justify-items-stretch tw-px-0">
							<Form.Label column lg={true}>
								manual game selection:
							</Form.Label>
						</div>
						<div className="tw-grid tw-justify-items-center">
							<Col lg={true}>
								<Form.Select
									{...register("detect", {
										required: true,
									})}
								>
									<option
										key="last_selected"
										value={JSON.stringify(props.detect)}
									>
										{props.detect.gameString}
									</option>
									{props.detect.id !== "auto" && (
										<option
											key="auto"
											value={JSON.stringify({
												id: "auto",
												gameString:
													"Automatically Detect",
											} as DetectType)}
										>
											Automatically Detect
										</option>
									)}
									{games.map((game: Game) => {
										const gameStringTeams = `${game.teams.away.team.name} vs. ${game.teams.home.team.name}`;
										return (
											props.detect.id !==
												game.gamePk.toString() && (
												<option
													value={JSON.stringify({
														id: game.gamePk.toString(),
														gameString:
															gameStringTeams,
													} as DetectType)}
													key={game.gamePk}
												>
													{gameStringTeams}
												</option>
											)
										);
									})}
								</Form.Select>
							</Col>
						</div>
					</Form.Group>
					<div className="tw-flex-none tw-py-2">
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</div>
				</Container>
			</Form>
		</div>
	);
}

export default Settings;

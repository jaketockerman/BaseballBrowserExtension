import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { ServersType } from "../Types";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

Settings.propTypes = {
	servers: PropTypes.object.isRequired as never as ServersType,
	setServers: PropTypes.func.isRequired,
};

interface SettingsType {
	servers: ServersType;
}

function Settings(props: InferProps<typeof Settings.propTypes>) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SettingsType>();

	function submit(data: SettingsType) {
		props.setServers(data.servers);
	}
	console.log(errors);

	return (
		<div className="tw-px-5 py-3 ml-10 mr-5">
			<Form
				className="tw-px-5 py-3 ml-10 mr-5"
				onSubmit={handleSubmit(submit)}
			>
				<Form.Group
					className="tw-px-5 py-3 ml-10 mr-5"
					as={Row}
					controlId="pybaseball"
				>
					<Form.Label column xs="auto" lg={true}>
						pybaseball server:
					</Form.Label>
					<Col xs="auto" lg={true}>
						<Form.Control
							type="text"
							defaultValue={props.servers.pybaseball}
							{...register("servers.pybaseball", {
								required: true,
								pattern: /\/$/i,
							})}
						/>
					</Col>
				</Form.Group>
				<Form.Group
					className="tw-px-5 py-3 ml-10 mr-5"
					as={Row}
					controlId="mlbstats"
				>
					<Form.Label column xs="auto" lg={true}>
						mlbstats server:
					</Form.Label>
					<Col xs="auto" lg={true}>
						<Form.Control
							type="text"
							defaultValue={props.servers.mlbstats}
							{...register("servers.mlbstats", {
								required: true,
								pattern: /\/$/i,
							})}
						/>
					</Col>
				</Form.Group>
			</Form>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</div>
	);
}

export default Settings;

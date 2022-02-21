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
		<div className="Settings">
			<Form onSubmit={handleSubmit(submit)}>
				<Form.Group as={Row} className="mb-3" controlId="pybaseball">
					<Form.Label column xs="auto">
						pybaseball server:
					</Form.Label>
					<Col xs="auto">
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
				<Form.Group as={Row} className="mb-3" controlId="mlbstats">
					<Form.Label column xs="auto">
						mlbstats server:
					</Form.Label>
					<Col xs="auto">
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

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
}

export default Settings;

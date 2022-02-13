import React from "react";
import PropTypes, { InferProps } from "prop-types";
import "./Standings.css";
import { ServersType } from "../Types";
import { Form, Button } from "react-bootstrap";
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
		<Form onSubmit={handleSubmit(submit)}>
			<Form.Group className="mb-3" controlId="pybaseball">
				<Form.Label>pybaseball server:</Form.Label>
				<Form.Control
					type="text"
					defaultValue={props.servers.pybaseball}
					{...register("servers.pybaseball", {
						required: true,
						pattern: /\/$/i,
					})}
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
}

export default Settings;

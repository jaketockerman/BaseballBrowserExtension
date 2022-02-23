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
		<div className="tw-flex tw-flex-col tw-flex tw-flex-wrap tw-py-3">
			<Form className="" onSubmit={handleSubmit(submit)}>
				<div>
					<Form.Group className="" as={Row} controlId="pybaseball">
						<div className="tw-grid tw-justify-items-stretch">
							<Form.Label column xs="auto" lg={true}>
								pybaseball server:
							</Form.Label>
						</div>
						<div className="tw-grid tw-justify-items-center">
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
						</div>
					</Form.Group>
				</div>
				<div>
					<Form.Group className="" as={Row} controlId="mlbstats">
						<div className="tw-grid tw-justify-items-stretch">
							<Form.Label column xs="auto" lg={true}>
								mlbstats server:
							</Form.Label>
						</div>
						<div className="tw-grid tw-justify-items-center">
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
						</div>
					</Form.Group>
				</div>
			</Form>
			<div className="tw-flex-none tw-py-3">
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</div>
		</div>
	);
}

export default Settings;

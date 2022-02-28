import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { ServersType } from "../types/App_Types";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
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
		<div className="tw-flex tw-h-full tw-flex-col tw-py-3">
			<Form className="tw-h-full" onSubmit={handleSubmit(submit)}>
				<Container
					fluid
					className="tw-h-full tw-flex tw-flex-col tw-justify-start"
				>
					<Form.Group as={Row} controlId="pybaseball">
						<div className="tw-grid tw-justify-items-stretch tw-px-0">
							<Form.Label column lg={true}>
								pybaseball server:
							</Form.Label>
						</div>
						<div className="tw-grid tw-justify-items-center">
							<Col lg={true}>
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
					<Form.Group as={Row} controlId="mlbstats">
						<div className="tw-grid tw-justify-items-stretch">
							<Form.Label column lg={true}>
								mlbstats server:
							</Form.Label>
						</div>
						<div className="tw-grid tw-justify-items-center">
							<Col lg={true}>
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
					<div className="tw-flex-none tw-py-3">
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

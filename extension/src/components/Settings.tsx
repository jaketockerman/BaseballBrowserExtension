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
		formState: { errors },
		handleSubmit,
	} = useForm<SettingsType>({ mode: "all" });

	function submit(data: SettingsType) {
		props.setServers(data.servers);
	}

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
								backend server:
							</Form.Label>
						</div>
						<div className="tw-grid tw-justify-items-center">
							<Col lg={true}>
								<Form.Control
									type="text"
									defaultValue={props.servers.pybaseball}
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

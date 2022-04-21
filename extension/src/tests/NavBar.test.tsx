import React from "react";
import { render, screen } from "@testing-library/react";
import Navigation from "../components/NavBar";
import { MemoryRouter as Router } from "react-router-dom";

test("renders navbar", () => {
	render(
		<Router>
			<Navigation />
		</Router>
	);
	const liveElement = screen.getByAltText("live");
	const standingsElement = screen.getByAltText("standings");
	const settingsElement = screen.getByAltText("settings");
	expect(liveElement).toBeInTheDocument();
	expect(standingsElement).toBeInTheDocument();
	expect(settingsElement).toBeInTheDocument();
});

import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import home from "../images/home.svg";
import flag from "../images/flag.svg";
import gear from "../images/gear.svg";

class Navigation extends React.Component {
	render() {
		//Unfortunately tailwind borders are broken without @tailwind base
		const style = {
			borderRight: "1px solid",
			borderTop: "1px solid",
			borderColor: "#525252",
		};

		return (
			<nav className="tw-bg-nav-blue tw-flex tw-flex-row tw-w-full tw-h-1/10">
				<Nav.Link
					as={Link}
					to="/Standings"
					className="tw-flex-1 tw-w-0 tw-border-r tw-border-white"
					style={style}
				>
					<img src={flag} className="flag-logo" alt="standings" />
				</Nav.Link>
				<Nav.Link
					as={Link}
					to="/"
					className="tw-flex-1 tw-w-0 tw-border-r tw-border-white tw-items-center"
					style={style}
				>
					<img src={home} className="home-logo" alt="live" />
				</Nav.Link>
				<Nav.Link
					as={Link}
					to="/settings"
					className="tw-flex-1 tw-w-0"
					style={{ borderTop: "1px solid", borderColor: "#525252" }}
				>
					<img src={gear} className="gear-logo" alt="settings" />
				</Nav.Link>
			</nav>
		);
	}
}

export default Navigation;

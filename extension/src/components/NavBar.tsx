import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import home from "../images/home.svg";
import flag from "../images/flag.svg";
import gear from "../images/gear.svg";

class Navigation extends React.Component {
	render() {
		//Unfortunately tailwind borders are broken without @tailwind base
		return (
			<nav className="tw-bg-nav-blue tw-flex tw-flex-row tw-w-full tw-h-1/10">
				<Nav.Link
					as={Link}
					to="/Standings"
					className="tw-flex-1 tw-w-0 tw-border-t tw-border-border-grey tw-border-r "
				>
					<img src={flag} className="tw-mx-auto" alt="standings" />
				</Nav.Link>
				<Nav.Link
					as={Link}
					to="/"
					className="tw-flex-1 tw-w-0 tw-border-t tw-border-border-grey tw-border-r  tw-items-center"
				>
					<img src={home} className="tw-mx-auto" alt="live" />
				</Nav.Link>
				<Nav.Link
					as={Link}
					to="/settings"
					className="tw-flex-1 tw-w-0 tw-border-t tw-border-border-grey"
				>
					<img src={gear} className="tw-mx-auto" alt="settings" />
				</Nav.Link>
			</nav>
		);
	}
}

export default Navigation;

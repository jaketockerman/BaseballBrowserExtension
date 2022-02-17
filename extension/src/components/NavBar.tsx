import React from "react";
import { /*Container*/ Nav /*Navbar Dropdown*/ } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";
import home from "../images/home.svg";
import flag from "../images/flag.svg";
import gear from "../images/gear.svg";

class Navigation extends React.Component {
	render() {
		const myStyle = {
			backgroundColor: "#002774",
			borderColor: "#FFFFFF",
			color: "#CED9DF",
		};
		return (
			<nav className="navigation">
				{/* <Nav.Link as={Link} to="/Settings" className="tab" style={myStyle}>
					Settings
				</Nav.Link> */}
				<Nav.Link
					as={Link}
					to="/"
					className="tabCenter"
					style={myStyle}
				>
					<img src={home} className="home-logo" alt="live" />
				</Nav.Link>
				<Nav.Link
					as={Link}
					to="/Standings"
					className="tabCenter"
					style={myStyle}
				>
					<img src={flag} className="flag-logo" alt="standings" />
				</Nav.Link>
				<Nav.Link
					as={Link}
					to="/settings"
					className="tab"
					style={myStyle}
				>
					<img src={gear} className="gear-logo" alt="settings" />
				</Nav.Link>
			</nav>
		);
	}
}

export default Navigation;

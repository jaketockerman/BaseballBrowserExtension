import React from "react";
import PropTypes from "prop-types";
import { /*Container*/ Nav /*Navbar Dropdown*/ } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";
import home from "../images/home.svg";
import flag from "../images/flag.svg";

class Navigation extends React.Component {
	static get propTypes() {
		return {
			active_page: PropTypes.string,
		};
	}

	render() {
		const myStyle = {
			backgroundColor: "#002774",
			borderColor: "#FFFFFF",
			color: "#CED9DF",
		};
		return (
			<nav className="navigation">
				{/* <Nav.Link as={Link} to="/" className="tab" style={myStyle}>
					Filler
				</Nav.Link> */}
				<Nav.Link
					as={Link}
					to="/"
					className="tabCenter"
					style={myStyle}
				>
					<img src={home} className="home-logo" alt="logo" />
				</Nav.Link>
				<Nav.Link
					as={Link}
					to="/Standings"
					className="tab"
					style={myStyle}
				>
					<img src={flag} className="flag-logo" alt="logo" />
				</Nav.Link>
			</nav>
		);
	}
}

export default Navigation;

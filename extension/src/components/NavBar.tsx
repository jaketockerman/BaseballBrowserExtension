import React from "react";
import PropTypes from "prop-types";
import { /*Container*/ Nav /* Navbar , Dropdown*/ } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";

class Navigation extends React.Component {
	static get propTypes() {
		return {
			active_page: PropTypes.string,
		};
	}

	render() {
		return (
			<div className="topnav">
				<div className="topnav-centered">
					<Nav.Link as={Link} to="/" className="active">
						Live
					</Nav.Link>
				</div>

				<Nav.Link as={Link} to="/">
					Filler
				</Nav.Link>

				<div className="topnav-right">
					<Nav.Link as={Link} to="/Standings">
						Standings
					</Nav.Link>
				</div>
			</div>
			// <Navbar bg="dark" variant="dark">
			// 	<Container>
			// 		<Nav.Link as={Link} to="/" style={myStyle}>
			//                Filler
			// 		</Nav.Link>
			// 		<Nav.Link as={Link} to="/" style={myStyle}>
			// 				Live
			// 		</Nav.Link>
			// 		<Nav.Link as={Link} to="/Standings" style={myStyle}>
			// 				Standings
			// 		</Nav.Link>
			// 	</Container>
			// </Navbar>
		);
	}
}

export default Navigation;

import React from "react";
import PropTypes from "prop-types";
import { Container, Nav, Navbar /*, Dropdown*/ } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";

class Navigation extends React.Component {
	static get propTypes() {
		return {
			active_page: PropTypes.string,
		};
	}

	render() {
		const myStyle = {
			backgroundColor: "#00BDFF",
			borderColor: "#1B1B1E",
			color: "#000000",
		};
		return (
			<Navbar variant="light">
				<div className="Navigation">
					<Nav>
						<Container>
							<Nav.Link as={Link} to="/" style={myStyle}>
								Live
							</Nav.Link>
							<Nav.Link as={Link} to="/Standings" style={myStyle}>
								Standings
							</Nav.Link>
						</Container>
						{/*<Nav.Link as={Link} to = "/about" style={myStyle}>About</Nav.Link>*/}
						{/* <Dropdown rendermenuonmount="true">
                            <Dropdown.Toggle style={myStyle}
                                    //    onMouseEnter = { this.handleOpen }
                                    //    onMouseLeave = { this.handleClose }
                                    //    open={ this.state.dropdownOpen }      
                            >
                                Projects
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/projects/ece-362-mini-project" >ECE 362 Mini Project</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
					</Nav>
				</div>
			</Navbar>
		);
	}
}

export default Navigation;

import React, { useEffect } from "react";
import PropTypes, { InferProps } from "prop-types";
import logo from "./logo.svg";
import "./Standings.css";
import axios from "axios";

Standings.propTypes = {
	servers: PropTypes.shape({
		pybaseball: PropTypes.string.isRequired,
	}).isRequired,
};

interface Standings_Response {
	result: Array<Division>;
}

interface Division {
	teams: Array<Team>;
}

interface Team {
	GB: string;
	L: string;
	Tm: string;
	W: string;
	"W-L%": string;
}

function Standings(props: InferProps<typeof Standings.propTypes>) {
	// const [standings, setStandings] = useState();

	useEffect(() => {
		axios
			.get<Standings_Response>(props.servers.pybaseball + "standings/")
			.then((response) => {
				console.log(response.data.result);
			});
	});

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					This is the Standings page
				</a>
				{props.servers.pybaseball}
				{/* {standings} */}
			</header>
		</div>
	);
}

export default Standings;

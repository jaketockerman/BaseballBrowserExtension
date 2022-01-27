import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Live from "./components/Live";
import "./App.css";
import Standings from "./components/Standings";

function App() {
	return (
		<div>
			<Link to="/">Live</Link>
			<Link to="/standings">Standings</Link>
			<Routes>
				<Route path="/" element={<Live />} />
				<Route path="/standings" element={<Standings />} />
			</Routes>
		</div>
	);
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Live from "./components/Live";
import "./App.css";
import Standings from "./components/Standings";
import Navigation from "./components/NavBar";

function App() {
	const servers = {
		//THESE MUST END IN /
		pybaseball: "http://127.0.0.1:5000/",
	};
	return (
		<div className="App">
			<div className="Content">
				<Routes>
					<Route path="/" element={<Live />} />
					<Route
						path="/standings"
						element={<Standings servers={servers} />}
					/>
				</Routes>
			</div>
			<Navigation />
	);
}

export default App;

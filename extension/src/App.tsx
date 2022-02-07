import React from "react";
import { Routes, Route } from "react-router-dom";
import Live from "./components/Live";
import "./App.css";
import Standings from "./components/Standings";
import Navigation from "./components/NavBar";

function App() {
	return (
		<div className="App">
			<div className="Content">
				<Routes>
					<Route path="/" element={<Live />} />
					<Route path="/standings" element={<Standings />} />
				</Routes>
			</div>
			<Navigation />
		</div>
	);
}

export default App;

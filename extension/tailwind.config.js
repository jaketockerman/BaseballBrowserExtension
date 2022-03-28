module.exports = {
	prefix: "tw-",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"app-dark": "#282c34",
				"nav-blue": "#002774",
				"nav-blue-light": "#00308F",
				"nav-blue-extra-light": "#0036A3",
			},
			fontSize: {
				"app-text": "18px",
				"stats-table-text": "14px",
			},
		},
	},
	plugins: [],
};

module.exports = {
	prefix: "tw-",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"app-dark": "#282c34",
				"nav-blue": "#002774",
			},
			fontSize: {
				"app-text": "calc(10px + 2vmin)",
			},
		},
	},
	plugins: [],
};

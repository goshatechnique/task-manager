import { createStore } from "vuex";
import tasksModule from "./tasksModule";

export default createStore({
	state: {
		theme: "light",
	},
	getters: {},
	mutations: {
		checkTheme(state) {
			const theme = localStorage.getItem("theme") || "light";
			state.theme = theme;
		},
		setTheme(state, payload) {
			state.theme = payload;
			localStorage.setItem("theme", state.theme);
		},
	},
	actions: {},
	modules: {
		tasksModule,
	},
});

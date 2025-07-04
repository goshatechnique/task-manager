import api from "../api";

export default {
	state: {
		tasks: {},
		filter: null,
		searchString: null,
		isStatisticsVisible: false,
	},
	mutations: {
		fetchTasks(state, payload) {
			if (!payload) return;
			state.tasks = payload;
		},
		createTask(state, payload) {
			const task = Object.values(payload)[0];
			state.tasks[task.id] = task;
		},
		updateTask(state, payload) {
			state.tasks[payload.id] = payload;
		},
		deleteTask(state, payload) {
			delete state.tasks[payload];
		},
		setSearchString(state, payload) {
			state.searchString = payload;
		},
		setFilter(state, payload) {
			if (payload.type === "reset") {
				state.filter = null;
				return;
			}
			state.filter = payload;
		},
		switchIsStatisticsVisible(state) {
			state.isStatisticsVisible = !state.isStatisticsVisible;
		},
	},
	actions: {
		async fetchTasks({ commit }) {
			const tasks = await api.fetchTasks();
			commit("fetchTasks", tasks);
		},
		async createTask({ commit }, taskData) {
			const taskId = await api.createTask(taskData);
			const newTask = {
				[taskId.name]: taskData,
			};
			commit("createTask", newTask);
		},
		async updateTask({ commit }, task) {
			const updatedTask = await api.updateTask(task);
			commit("updateTask", updatedTask);
		},
		async deleteTask({ commit }, task) {
			await api.deleteTask(task);
			commit("deleteTask", task);
		},
	},
	getters: {
		filteredTasks(state) {
			return Object.fromEntries(
				// eslint-disable-next-line no-unused-vars
				Object.entries(state.tasks).filter(([_, task]) => {
					if (state.searchString && !task.title.includes(state.searchString)) {
						return false;
					}

					if (state.filter && task[state.filter.type] !== state.filter.value) {
						return false;
					}
					return true;
				})
			);
		},
		totalCount(state) {
			return Object.keys(state.tasks).length;
		},
		completedCount(state) {
			return Object.values(state.tasks).filter((task) => task.completed).length;
		},
		pendingCount(state) {
			return Object.values(state.tasks).filter((task) => !task.completed).length;
		},
	},
};

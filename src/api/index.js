import axios from "axios";

const url = "https://task-manager-dea7e-default-rtdb.europe-west1.firebasedatabase.app/tasks";

export default {
	fetchTasks: async function () {
		try {
			const response = await axios.get(url + ".json");
			return response.data;
		} catch (error) {
			console.error("### fetchTask() error: ", error);
			throw error;
		}
	},
	createTask: async function (task) {
		try {
			const response = await axios.put(`${url}/${task.id}.json`, task);
			return response.data;
		} catch (error) {
			console.error("### createTask() error: ", error);
			throw error;
		}
	},
	updateTask: async function (task) {
		try {
			const response = await axios.put(`${url}/${task.id}.json`, task);
			return response.data;
		} catch (error) {
			console.error("### updateTask() error: ", error);
			throw error;
		}
	},
	deleteTask: async function (taskId) {
		try {
			const response = await axios.delete(`${url}/${taskId}.json`);
			return response;
		} catch (error) {
			console.error("### deleteTask() error: ", error);
			throw error;
		}
	},
};

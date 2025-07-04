<template>
	<div class="creator">
		<input type="text" class="creator-input" v-model="taskTitle" placeholder="Добавить новую задачу..." />
		<select class="creator-select" name="type" v-model="taskTag">
			<option value="Work">Work</option>
			<option value="Personal">Personal</option>
			<option value="Learning">Learning</option>
			<option value="Health">Health</option>
		</select>
		<select class="creator-select" name="priority" v-model="taskPriority">
			<option value="Low">Low</option>
			<option value="Medium">Medium</option>
			<option value="High">High</option>
		</select>
		<button class="creator-button" @click="createTask">Добавить</button>
	</div>

	<TaskFilter />
</template>

<script>
import { computed, ref } from "vue";
import TaskFilter from "./TaskFilter.vue";
import { useStore } from "vuex";

export default {
	name: "TaskCreator",
	setup() {
		const store = useStore();
		const taskTitle = ref("");
		const taskTag = ref("Work");
		const taskPriority = ref("Medium");

		const task = computed(() => {
			return {
				title: taskTitle.value,
				tag: taskTag.value.toLocaleLowerCase(),
				priority: taskPriority.value.toLocaleLowerCase(),
				completed: false,
			};
		});

		function createTask() {
			if (!taskTitle.value) {
				alert("Нужно заполнить название задачи");
				return;
			}
			const newTask = {
				id: Date.now(),
				...task.value,
			};
			store.dispatch("createTask", newTask);
			taskTitle.value = "";
		}

		return {
			taskTitle,
			taskTag,
			taskPriority,
			createTask,
		};
	},
	components: { TaskFilter },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.creator {
	margin-top: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
	background-color: var(--bg-second-color);
	border-radius: 10px;
	gap: 10px;
	box-shadow: 0 1px 2px 0 rgba($black, 0.05);

	&-input {
		height: 40px;
		background-color: var(--bg-color);
		border: 1px solid var(--bg-third-color);
		color: var(--text-color);
		outline: none;
		border-radius: 10px;
		padding-left: 10px;
		width: 100%;
		box-sizing: border-box;
	}

	&-select {
		height: 40px;
		background-color: var(--bg-color);
		border: 1px solid var(--bg-third-color);
		color: var(--text-color);
		outline: none;
		border-radius: 10px;
		padding-left: 10px;
		min-width: 150px;
		cursor: pointer;
	}

	&-button {
		height: 40px;
		background-color: rgba($blue, 0.9);
		border: 1px solid $blue;
		outline: none;
		border-radius: 10px;
		padding: 0px 10px;
		color: $whiteLight;
		cursor: pointer;
		min-width: 150px;
		&:hover {
			background-color: $blue;
		}
	}
}
</style>

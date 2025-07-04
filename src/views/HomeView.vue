<template>
	<div class="home">
		<div class="manager__container">
			<div class="header">
				<h1 class="header-title">Smart Task Manager</h1>
				<span class="header-text">Work hard, work smart</span>
				<div class="header-options">
					<button class="header-options__button" @click="onSwitchStatistics">S</button>
					<button class="header-options__button" @click="switchTheme">T</button>
				</div>
			</div>
			<TaskStats />
			<TaskCreator />
			<TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" />
		</div>
	</div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import TaskCard from "@/components/TaskCard.vue";
import TaskCreator from "@/components/TaskCreator.vue";
import TaskStats from "@/components/TaskStats.vue";

export default {
	name: "HomeView",
	setup() {
		const store = useStore();

		onMounted(() => store.dispatch("fetchTasks"));

		const onSwitchStatistics = () => store.commit("switchIsStatisticsVisible");

		const filteredTasks = computed(() => store.getters["filteredTasks"]);
		const theme = computed(() => store.state.theme);

		const switchTheme = () => {
			store.commit("setTheme", theme.value === "light" ? "dark" : "light");
			// document.documentElement.setAttribute("data-theme", "dark");
		};

		return {
			filteredTasks,
			onSwitchStatistics,
			switchTheme,
		};
	},
	components: {
		TaskStats,
		TaskCreator,
		TaskCard,
	},
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.home {
	display: flex;
	justify-content: center;
	align-items: center;
	.manager__container {
		min-height: calc(100vh - 100px);
		width: 900px;
		.header {
			display: grid;
			grid-template-columns: 1fr 200px;
			grid-template-rows: 50px 50px;
			grid-template-areas:
				"title options"
				"text options";
			&-title {
				grid-area: title;
				font-size: 3em;
				margin: 0px;
			}
			&-text {
				grid-area: text;
				font-size: 1.6em;
			}
			&-options {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				grid-area: options;
				gap: 5px;
				&__button {
					background-color: var(--bg-second-color);
					width: 36px;
					height: 36px;
					cursor: pointer;
					border: none;
					outline: none;
					line-height: 36px;
					border-radius: 10px;
					box-shadow: 0 1px 2px 0 rgba($black, 0.05);
				}
			}
		}
	}
}
</style>

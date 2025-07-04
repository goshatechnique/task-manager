<template>
	<div class="statistics" v-show="isVisible">
		<div class="dashboard">
			<div class="block">
				<h1 class="block-header blue">{{ totalCount }}</h1>
				<span class="block-text">Всего</span>
			</div>
			<div class="block">
				<h1 class="block-header green">{{ completedCount }}</h1>
				<span class="block-text">Выполнено</span>
			</div>
			<div class="block">
				<h1 class="block-header orange">{{ pendingCount }}</h1>
				<span class="block-text">В работе</span>
			</div>
			<div class="block">
				<h1 class="block-header purple">{{ completedPercentage }}%</h1>
				<span class="block-text">Прогресс</span>
			</div>
		</div>
		<div class="progress">
			<div class="progress-background">
				<div class="value" :style="{ width: `${completedPercentage}%` }" />
			</div>
		</div>
	</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
	name: "TaskStats",
	setup() {
		const store = useStore();
		const isVisible = computed(() => store.state.tasksModule.isStatisticsVisible);
		const totalCount = computed(() => store.getters["totalCount"]);
		const completedCount = computed(() => store.getters["completedCount"]);
		const pendingCount = computed(() => store.getters["pendingCount"]);
		const completedPercentage = computed(() => (100 / totalCount.value) * completedCount.value || 0);
		return {
			totalCount,
			completedCount,
			pendingCount,
			completedPercentage,
			isVisible,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.statistics {
	width: 100%;
	background-color: var(--bg-second-color);
	border-radius: 10px;
	box-shadow: 0 1px 2px 0 rgba($black, 0.05);
	.dashboard {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.block {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		&-header {
			font-size: 3em;
			min-width: 100px;
			text-align: center;
		}
		&-text {
			font-size: 1.5em;
		}
		.blue {
			color: $blue;
		}
		.green {
			color: $green;
		}
		.orange {
			color: $orange;
		}
		.purple {
			color: $purple;
		}
	}

	.progress {
		padding: 20px 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		&-background {
			width: 90%;
			height: 5px;
			background-color: $whiteHard;
			border-radius: 10px;
			overflow: hidden;
			.value {
				height: 100%;
				background: linear-gradient(90deg, $blue 0%, $purple 50%, $aqua 100%);
			}
		}
	}
}
</style>

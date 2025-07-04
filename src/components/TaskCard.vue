<template>
	<div class="task">
		<div :class="`priority ${getPriorityClass(task.priority)}`" />
		<div class="status" @click="updateTaskHandler({ ...task, completed: !task.completed })">
			<div :class="`status-container ${task.completed ? 'status-container-active' : null}`">
				<div v-show="task.completed" class="symbol">&#10004;</div>
			</div>
		</div>
		<div :class="`title ${task.completed ? 'title-finished' : ''}`">{{ task.title }}</div>
		<div class="tag">
			<span :class="`tag__text ${getTagClass(task.tag)}`">{{ task.tag }}</span>
		</div>
		<div class="control">
			<div class="control-btn" @click="deleteTaskHandler(task.id)">&#128465;</div>
		</div>
	</div>
</template>

<script>
import { useStore } from "vuex";

export default {
	name: "TaskCard",
	props: {
		task: Object,
	},
	setup() {
		const store = useStore();
		const getPriorityClass = (priority) => `priority-${priority}`;
		const getTagClass = (tag) => `tag__text-${tag}`;

		const deleteTaskHandler = (task) => store.dispatch("deleteTask", task);
		const updateTaskHandler = (task) => store.dispatch("updateTask", task);

		return {
			getPriorityClass,
			getTagClass,
			deleteTaskHandler,
			updateTaskHandler,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.task {
	// background-color: $white;
	background-color: var(--bg-second-color);
	border-radius: 10px;
	margin-top: 10px;
	min-height: 90px;
	overflow: hidden;
	box-shadow: 0 1px 2px 0 rgba($black, 0.05);
	display: grid;
	grid-template-columns: 5px 50px 1fr 50px;
	grid-template-rows: 1fr 1fr;
	grid-template-areas:
		"priority status title control"
		"priority status tag control";
	transition: 0.3s;
	&:hover {
		box-shadow: 0 2px 4px 0 rgba($black, 0.15);
	}

	.priority {
		grid-area: priority;
		&-low {
			background-color: $low;
		}
		&-medium {
			background-color: $medium;
		}
		&-high {
			background-color: $high;
		}
	}
	.status {
		grid-area: status;
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: none;
		cursor: pointer;
		&-container {
			width: 16px;
			height: 16px;
			border: 2px solid var(--bg-third-color);
			outline: none;
			background-color: var(--bg-second-color);
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: $green;
			position: relative;
			&-active {
				border-color: $green;
			}
			.symbol {
				font-size: 2.5em;
				position: absolute;
				right: -4px;
				top: -15px;
			}
		}
	}
	.title {
		grid-area: title;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 1.6em;
		&-finished {
			text-decoration: line-through;
		}
	}
	.tag {
		grid-area: tag;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 1.4em;
		user-select: none;
		&__text {
			padding: 2px 6px;
			border-radius: 1.4em;
			background-color: $white;
			border: 1px solid $whiteMedium;
			cursor: default;
			&-work {
				background-color: rgba($aqua, 0.25);
				color: rgba($aqua, 1);
				border: 1px solid rgba($aqua, 0.1);
			}

			&-personal {
				background-color: rgba($red, 0.25);
				color: rgba($red, 1);
				border: 1px solid rgba($red, 0.1);
			}

			&-learning {
				background-color: rgba($green, 0.25);
				color: rgba($green, 1);
				border: 1px solid rgba($green, 0.1);
			}

			&-health {
				background-color: rgba($purple, 0.25);
				color: rgba($purple, 1);
				border: 1px solid rgba($purple, 0.1);
			}
		}
	}
	.control {
		grid-area: control;
		display: flex;
		justify-content: center;
		align-items: center;
		&-btn {
			width: 20px;
			height: 20px;
			font-size: 20px;
			line-height: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			transition: 0.3s;
			&:hover {
				color: red;
			}
		}
	}
}
</style>

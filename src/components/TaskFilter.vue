<template>
	<div class="filter">
		<input class="input" type="text" placeholder="Поиск задач..." v-model="seacrhString" />
		<button
			v-for="filter in filters"
			:class="`radiobutton ${currentFilter?.value === filter.value ? 'radiobutton-active' : ''}`"
			:key="filter.value"
			@click="onSelectFilter({ ...filter })"
		>
			{{ filter.title }}
		</button>
	</div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { filters } from "../helpers";

export default {
	name: "TaskFilter",
	setup() {
		const store = useStore();
		const seacrhString = ref("");

		watch([seacrhString], () => store.commit("setSearchString", seacrhString));

		const onSelectFilter = (filter) => store.commit("setFilter", filter);
		const currentFilter = computed(() => store.state.tasksModule.filter);

		return { filters, onSelectFilter, seacrhString, currentFilter };
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.filter {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
	gap: 10px;

	.input {
		height: 40px;
		background-color: var(--bg-second-color);
		color: var(--text-color);
		border: 1px solid var(--bg-third-color);
		outline: none;
		border-radius: 10px;
		padding-left: 10px;
		box-sizing: border-box;
		width: 100%;
	}

	.radiobutton {
		height: 40px;
		background-color: var(--bg-second-color);
		border: 1px solid var(--bg-third-color);
		color: var(--text-color);
		outline: none;
		border-radius: 10px;
		cursor: pointer;
		min-width: 75px;
		transition: 0.3s;
		&:hover {
			opacity: 0.75;
		}
		&-active {
			color: $white;
			background-color: $blue;
			border: 1px solid $blue;
			&:hover {
				background-color: $blue;
			}
		}
	}
}
</style>

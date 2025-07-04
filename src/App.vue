<template>
	<AppHeader />
	<router-view />
	<AppFooter />
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

export default {
	setup() {
		const store = useStore();

		onMounted(() => store.commit("checkTheme"));

		const theme = computed(() => store.state.theme);

		watch([theme], () => {
			document.documentElement.setAttribute("data-theme", theme.value);
		});

		return {
			theme,
		};
	},
	components: {
		AppHeader,
		AppFooter,
	},
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
	width: 100vw;
	height: 100vh;
	font-size: 10px;
	padding: 0px;
	margin: 0px;
	background-color: var(--bg-color);
	color: var(--text-color);
	transition: background 0.3s, color 0.3s;
}
</style>

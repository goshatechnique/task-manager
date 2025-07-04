import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "home",
		component: () => import("../views/HomeView.vue"),
	},
	{
		path: "/about",
		name: "about",
		component: () => import("../views/AboutView.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	linkActiveClass: "active-link",
	linkExactActiveClass: "exact-active-link",
});

export default router;

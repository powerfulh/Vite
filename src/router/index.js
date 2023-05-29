import { createRouter, createWebHistory } from "vue-router";
import drag from "./drag.js";

const r = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: () => import('../views/Index.vue')
		},
		...drag,
		{
			path: '/grid-sort',
			component: () => import('../views/GridSort.vue')
		}
	]
})

export default r
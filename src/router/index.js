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
			path: '/grid',
			component: () => import('../views/Grid.vue')
		},
		{
			path: '/grid-comp',
			component: () => import('../views/GridComp.vue')
		}
	]
})

export default r
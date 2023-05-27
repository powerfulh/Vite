import { createRouter, createWebHistory } from "vue-router";

const r = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: () => import('../views/Index.vue')
		},
		{
			path: '/drag',
			component: () => import('../views/Drag.vue')
		}
	]
})

export default r
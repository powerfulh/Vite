import { createRouter, createWebHistory } from 'vue-router'
import drag from './drag.js'

const r = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: '인덱스',
			component: () => import('../views/Index.vue'),
		},
		{
			path: '/modal',
			component: () => import('../views/UseModal.vue'),
		},
		...drag,
		{
			path: '/grid',
			component: () => import('../views/Grid.vue'),
		},
		{
			path: '/grid-comp',
			component: () => import('../views/GridComp.vue'),
		},
		{
			path: '/api-test',
			component: () => import('../views/ApiTest.vue'),
		},
		{
			path: '/select',
			component: () => import('../views/PowerfulSelect.vue'),
		},
	],
})

export default r

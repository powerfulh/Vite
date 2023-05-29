export default [
	{
		path: '/drag',
		component: () => import('../views/Drag.vue')
	},
	{
		path: '/drag-util',
		component: () => import('../views/DragUtil.vue')
	},
	{
		path: '/drag-npm',
		component: () => import('../views/DragNpm.vue')
	}
]
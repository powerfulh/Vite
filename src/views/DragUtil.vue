<script setup>
import { onMounted, ref } from "vue";
import dragOrder from "../util/DragOrder";

const list = ref([
	{
		name: 'd0',
		val: 10
	},
	{
		name: 'd1',
		val: 100
	},
	{
		name: 'd2',
		val: 1000
	}
])
const dragDrop = ref()
const drag = ref()

onMounted(() => {
	dragOrder.dragToDrop([...dragDrop.value.children], list)
	dragOrder.drag([...drag.value.children], list)
})
</script>

<template>
	<ul ref="dragDrop">
		<li v-for="(item, i) in list" :key="i">{{item.name + ' ' + item.val}}</li>
	</ul>
	<hr>
	<ul ref="drag">
		<li v-for="(item, i) in list" :key="i">{{item.name + ' ' + item.val}}</li>
	</ul>
</template>

<style lang="scss" scoped>
ul {
	background: gray;
	padding: 8px;
	> li {
		border: 1px solid black;
		background: darkblue;
		margin-bottom: 4px;
		height: 40px;
	}
	&:last-child {
		background: darkgoldenrod;
		> li {
			background: darkcyan;
		}
	}
}
</style>
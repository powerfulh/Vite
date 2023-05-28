<script setup>
import { ref } from "vue";

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
let dragging

function ds(e, i) {
	e.dataTransfer.effectAllowed = 'move'
	dragging = i
}
function drop(i) {
	if(dragging == i) return
	[list.value[dragging], list.value[i]] = [list.value[i], list.value[dragging]]
}
function de(e, i) {
	[list.value[dragging], list.value[i]] = [list.value[i], list.value[dragging]]
	dragging = i
}
</script>

<template>
	<ul>
		<li v-for="(item, i) in list" :key="i" draggable="true" @dragstart="ds($event, i)" @drop="drop(i)" @dragover.prevent>{{item.name + ' ' + item.val}}</li>
	</ul>
	<hr>
	<ul>
		<li v-for="(item, i) in list" :key="i" draggable="true" @dragstart="ds($event, i)" @dragenter="de($event, i)" @dragover.prevent>{{item.name + ' ' + item.val}}</li>
	</ul>
	<!--<button @click="console.log(list)">Print list</button>-->
</template>

<style lang="scss" scoped>
ul {
	background: gray;
	padding: 8px;
	> li {
		border: 1px solid black;
		background: darkblue;
		margin-bottom: 4px;
		user-select: none;
		height: 40px;
	}
	&:last-child {
		background: darkgoldenrod;
		> li {
			background: darkcyan;
			cursor: move;
		}
	}
}
</style>
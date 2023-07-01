<script setup>
import { reactive } from "vue";

const list = reactive([])

function add(b) {
	list.unshift({
		t: '',
		c: b || false
	})
}
</script>

<template>
	<button @click="add()">Add</button>
	<button @click="add(true)">Add true</button>
	<ul>
		<li v-for="(item, i) in list" :key="i">
			<input type="text" :value="item.t" @change="({target}) => item.t = target.value">
			<br>
			<input type="checkbox" :checked="item.c" @change="({target}) => item.c = target.checked">
		</li>
	</ul>
</template>
<script setup>
import { ref } from "vue";

const list = ref([])

list.value.push({
	name: 'a',
	bool: false
})
list.value.push({
	name: 'b',
	bool: false
})
</script>

<template>
	<div>
		<span v-for="(item, i) in list" :key="i" :class="item.bool ? 'call' : ''" @click="item.bool = !item.bool">{{item.name}}</span>
		<hr>
		<button @click="list[0].bool = !list[0].bool">Toggle 0</button>
		<button @click="list[1].bool = !list[1].bool">Toggle 1</button>
	</div>
</template>

<style scoped>
span.call {
	font-size: 24px;
}
</style>
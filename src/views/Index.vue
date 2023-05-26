<script setup>
import { onMounted, ref } from "vue";

const list = ref([])
const target = ref()
const optionList = ref([])
const html = ref()
const myInput = ref()

list.value.push({
	name: 'a',
	bool: false,
	child: {
		bool: false
	}
})
list.value.push({
	name: 'b',
	bool: false,
	child: {
		bool: false
	}
})

onMounted(() => {
	for (let i = 0; i < target.value.children.length; i++) {
		const item = target.value.children[i];
		//item.bool = true
		optionList.value.push(item)
	}
	myInput.value.value = '123'
})
</script>

<template>
	<div>
		<span v-for="(item, i) in list" :key="i" :class="item.child.bool ? 'call' : ''" @click="item.child.bool = !item.child.bool">{{item.name}}</span>
		<hr>
		<button @click="list[0].bool = !list[0].bool">Toggle 0</button>
		<button @click="list[1].bool = !list[1].bool">Toggle 1</button>
		<hr>
		<select name="" id="" ref="target">
			<option value="c" ref="html">o0</option>
			<option value="d">o1</option>
		</select>
		<hr>
		<span v-for="(item, i) in optionList" :key="i" :class="item.selected ? 'call' : ''" @click="item.selected = true; $forceUpdate()">{{item.value}}</span>
		<hr>
		<input type="text" name="" id="" ref="myInput" @input="$forceUpdate">
		<span v-if="myInput && myInput.value.length > 2">보일까?</span>
		<hr>
		<button @click="$forceUpdate">Force update</button>
	</div>
</template>

<style scoped>
span.call {
	font-size: 24px;
}
</style>
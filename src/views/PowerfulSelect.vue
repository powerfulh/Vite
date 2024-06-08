<script setup>
import { reactive, ref } from 'vue'
import PS from '@/components/PowerfulSelect.vue'

const testData = reactive([])
const selected = ref('')

setTimeout(() => {
	console.log('set')
	testData.length = 0
	testData.push(
		...[
			{
				code: 1,
				text: 'a',
			},
			{
				code: 2,
				text: 'b',
			},
		],
	)
}, 1500)
</script>

<template>
	<main>
		<h1>Powerful Select</h1>
		<li>
			<div class="label">a</div>
			<input type="text" />
		</li>
		<li>
			<div class="label">b</div>
			<p-s v-model="selected" :list="testData"></p-s>
		</li>
		{{ selected }}
		<button @click="selected = 3">test</button>
	</main>
</template>

<style lang="scss">
div.label {
	display: inline-block;
	width: 20px;
}
div.powerful-select-wrap {
	display: inline-block;
	position: relative;
	> ul {
		background-color: darkblue;
		width: 100%;
		padding-inline-start: 0;
		> li:hover {
			background-color: darkcyan;
		}
	}
}
</style>

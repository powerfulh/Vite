<script setup>
import { reactive, ref } from 'vue'
import { PS } from 'powerful-select'

const testData = reactive([])
const testData1 = reactive([])
const selected = ref('')
const multiVal = ref('')

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
	testData1.push(
		...[
			{
				code: 1,
				text: 'a',
			},
			{
				code: 2,
				text: 'b',
			},
			{
				code: 3,
				text: 'c',
			},
		],
	)
}, 1000)
</script>

<template>
	<main>
		<h1>Powerful Select</h1>
		<li>
			<div class="label">a</div>
			<p-s v-model="selected" :list="testData"></p-s>
		</li>
		{{ selected }}
		<li>
			<div class="label">b</div>
			<p-s v-model="multiVal" :list="testData1" multi></p-s>
		</li>
		{{ multiVal }}
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
		z-index: 1;
		> li.powerful-multi-select {
			background-color: darkgoldenrod;
		}
		> li:hover {
			background-color: darkcyan;
		}
	}
}
</style>

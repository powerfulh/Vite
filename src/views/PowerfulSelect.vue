<script setup>
import { reactive, ref } from 'vue'
import { PS } from 'powerful-select'

const testData = reactive([])
const testData1 = reactive([])
const testData2 = reactive([])
//const testData3 = reactive([])
const selected = ref('')
const multiVal = ref('')
const autoVal = ref('')

setTimeout(() => {
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
	testData2.push(
		...[
			{
				code: 1,
				text: 'aabbcc',
			},
			{
				code: 2,
				text: 'abc',
			},
			{
				code: 3,
				text: 'bbcc',
			},
			{
				code: 4,
				text: 'dcd',
			},
		],
	)
	//testData3.push(
	//	...[
	//		{
	//			code: 1,
	//			text: 'aabbcc',
	//		},
	//		{
	//			code: 2,
	//			text: 'abc',
	//		},
	//		{
	//			code: 3,
	//			text: 'bbcc',
	//		},
	//		{
	//			code: 4,
	//			text: 'dcd',
	//		},
	//	],
	//)
}, 1000)
</script>

<template>
	<main>
		<h1>Powerful Select</h1>
		<div style="height: 300px">Pad</div>
		<li>
			<div class="label">some text</div>
			<input type="text" />
		</li>
		<li>
			<div class="label">some select</div>
			<select>
				<option value="1">abd</option>
				<option value="2">ab2</option>
				<option value="3">a2</option>
			</select>
		</li>
		<li>
			<div class="label">a</div>
			<p-s v-model="selected" :list="testData"></p-s>
		</li>
		{{ selected }}
		<li>
			<div class="label">some text</div>
			<input type="text" />
		</li>
		<li>
			<div class="label">b</div>
			<p-s v-model="multiVal" :list="testData1" multi></p-s>
		</li>
		{{ multiVal }}
		<li>
			<div class="label">some text</div>
			<input type="text" />
		</li>
		<li>
			<div class="label">auto</div>
			<p-s v-model="autoVal" :list="testData2" auto-comp></p-s>
		</li>
		{{ autoVal }}
		<button @click="selected = 3">test</button>
	</main>
</template>

<style lang="scss">
div.label {
	display: inline-block;
	width: 100px;
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
		> li:hover,
		> li:focus {
			background-color: darkcyan;
		}
	}
}
input,
select {
	width: 160px;
}
</style>

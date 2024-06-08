<script setup>
import PS from '@/components/PowerfulSelect.vue'

const testData = [
	{
		code: 1,
		text: 'a',
	},
	{
		code: 2,
		text: 'b',
	},
]
</script>

<template>
	<main>
		<h1>Powerful Select</h1>
		<p-s :list="testData"></p-s>
	</main>
</template>

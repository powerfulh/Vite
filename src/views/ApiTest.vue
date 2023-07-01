<script setup>
import { ref } from "vue";

const id = ref('')
const pw = ref('')

function c() {
	console.log(api)
}
</script>

<template>
	<div>
		<input v-model="id" type="text">
		<input v-model="pw" type="text" @keyup.enter="c">
	</div>
</template>
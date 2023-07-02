<script setup>
import { ref } from "vue";
import api from "../util/axioswagger2";

const id = ref('')
const pw = ref('')
const catchMe = ''
let abc

function c() {
	api.load('loginUsingPOST').setParameter({
		id,
		pw
	}).setWhenSuccess(res => {
		console.log(res)
	}).setWhenError(err => {
		console.warn(err)
	}).fire()
}
function getOI() {
	console.log(api.getApiFromSwag)
}
</script>

<template>
	<div>
		<input v-model="id" type="text">
		<input v-model="pw" type="text" @keyup.enter="c">
		<br>
		<button @click="getOI">Operation ID</button>
	</div>
</template>
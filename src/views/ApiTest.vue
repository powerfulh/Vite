<script setup>
import { ref } from "vue";
import api from "../util/axioswagger2";
import api2 from "../util/spring-foxios";

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
function get2() {
	api2.get()
}
function Fire2() {
	api2.get('memberUsingGET').setParameter({
		id
	}).setWhenSuccess(res => {
		console.log(res)
	}).setWhenError(err => {
		console.log(err)
	}).fire()
}
</script>

<template>
	<div>
		<input v-model="id" type="text">
		<input v-model="pw" type="text" @keyup.enter="c">
		<br>
		<button @click="getOI">Operation ID</button>
		<br>
		<button @click="get2">Test</button>
		<br>
		<input v-model="id" type="text" @keyup.enter="Fire2">
	</div>
</template>
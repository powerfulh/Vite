<script setup>
import { onMounted } from 'vue'

onMounted(() => {})
</script>

<template>
	<div>
		<p>Long sentence~~</p>
		<main></main>
		<main class="png"></main>
	</div>
</template>

<style scoped lang="scss">
main {
	height: 200px;
	background-image: url(@/assets/vue.svg);
	background-size: 100% 50%;
	//background-repeat: no-repeat;
	&.png {
		background-image: url(@/assets/a.png);
	}
}
</style>

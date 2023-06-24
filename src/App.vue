<script setup>

</script>

<template>
  <div>
	<router-view />
  </div>
  <br>
  <div v-for="(item, i) in $router.getRoutes()" :key="i">
	<router-link :to="item.path">{{item.name || item.path}}</router-link>
	<br>
  </div>
  <hr>
  <img src="/src/assets/vue.svg" alt="Vue 로고">
</template>

<style scoped>

</style>

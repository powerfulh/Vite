<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <router-view />
  </div>
  <router-link to="drag">드래그</router-link>
  <br>
  <router-link to="drag-util">드래그 모듈</router-link>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>

</style>

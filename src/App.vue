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
  <br>
  <router-link to="drag-npm">드래그 NPM</router-link>
  <br>
  <router-link to="grid-sort">그리드 열 정렬</router-link>
  <HelloWorld msg="Vite + Vue" />
  <img src="/src/assets/vue.svg" alt="Vue 로고">
</template>

<style scoped>

</style>

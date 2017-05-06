<template>
  <div class="hello">
    <p>Hello, {{ name || 'World' }}!</p>
    <input v-model="name">
  </div>
</template>

<style scoped>
  .hello {
    font-size: 20px;
    font-family: sans-serif;
  }
</style>

<script lang="ts" src="./Hello.ts"></script>

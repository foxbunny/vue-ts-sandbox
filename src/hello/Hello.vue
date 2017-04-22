<template>
  <div class="hello">
    <p>Hello, {{ name || 'World' }}!</p>
    <input v-model="name">
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import {Component} from "vue-property-decorator"

@Component
export default class Hello extends Vue {
  data() {
    return {name: "World"}
  }
}
</script>

<style scoped>
  .hello {
    font-size: 20px;
    font-family: sans-serif;
  }
</style>

<template>
  <div class="hello">
    <line-chart :series="data"></line-chart>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import LineChart, { ChartData } from '../charts/LineChart.vue'

@Component({
  components: {
    lineChart: LineChart
  }
})
export default class Hello extends Vue {
  data() {
    return {
      name: 'World',
      data: [
        { color: 'green', vals: [12, 44, 32, 30, 10, 1] },
        { color: 'red', vals: [6, 22, 24, 16, 12, 10] }
      ] as Array<ChartData>
    }
  }
}
</script>

<style scoped>
.hello {
  font-size: 20px;
  font-family: sans-serif;
}
</style>

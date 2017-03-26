<template>
<svg class="line-chart" ref="root"></svg>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import * as d3 from 'd3'

import prop from '../util/prop'
import path from '../util/path'

@Component
export default class LineChart extends Vue {

  // Props

  // Width of the view box
  @Prop({ default: 400 })
  width: number

  // Height of the view box
  @Prop({ default: 200 })
  height: number

  // Data series
  @Prop({ required: true })
  series: Array<ChartData>

  // Watchers

  @Watch('series')
  seriesUpdated(): void {
    this.renderChart()
  }

  // Lifecycle hooks

  mounted(): void {
    this.renderChart()
  }

  // Methods

  renderChart() {
    const y = d3.scaleLinear()
      .domain([0, d3.max(flatten(prop('vals'), this.series))])
      .range([this.height, 0])

    const x = d3.scaleLinear()
      .domain([0, d3.max(flatten(path(['vals', 'length']), this.series)) - 1])
      .range([0, this.width])

    const lineOf = d3.line<number>()
      .x((d: number, i: number) => x(i))
      .y((d: number) => y(d))

    d3.select(this.$refs.root as Element)
        .attr('viewBox', `0,0,${this.width},${this.height}`)
        .attr('preserveAspectRatio', 'none')
        .selectAll('path')
        .data(this.series)
      .enter().append('path')
        .attr('d', (d: ChartData) => lineOf(d.vals))
        .attr('stroke-width', 2)
        .attr('stroke', (d: ChartData) => d.color)
        .attr('fill', 'none')
      .exit().remove()
  }
}

// Utility functions

function flatten(pred: Function, series: Array<ChartData>): Array<any> {
  return series.reduce((acc: Array<number>, s: ChartData) => acc.concat(pred(s)), [])
}

// Type declarations

export interface ChartData {
  color: string
  vals: Array<number>
}
</script>

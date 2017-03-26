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

  // Width of the entire chart
  @Prop({ default: 420 })
  width: number

  // Height of the entire chart
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
      .range([100, 0])

    const x = d3.scaleLinear()
      .domain([0, d3.max(flatten(path(['vals', 'length']), this.series))])
      .range([0, 100])

    d3.select(this.$refs.root as Element)
        .attr('width', this.width)
        .attr('height', this.height)
        // Create a group for the entire series
        .selectAll('g')
        .data(this.series)
      .enter().append('g')
        // Create a subgroup for each array in the series
        .selectAll('line')
        .data((d: ChartData): Array<LineData> => d3.pairs(d.vals).map(pairToCoord(d.color)))
      .enter().append('line')
        .attr('x1', (d: LineData) => `${x(d.xL)}%`)
        .attr('x2', (d: LineData) => `${x(d.xR)}%`)
        .attr('y1', (d: LineData) => `${y(d.yL)}%`)
        .attr('y2', (d: LineData) => `${y(d.yR)}%`)
        .attr('stroke', (d: LineData) => d.color)
        .style('stroke-width', 2)
      .exit().remove()
  }
}

// Utility functions

function flatten(pred: Function, series: Array<ChartData>): Array<any> {
  return series.reduce((acc: Array<number>, s: ChartData) => acc.concat(pred(s)), [])
}

function pairToCoord(color: string) {
  return function(pair: Array<number>, i: number): LineData {
    return {
      xL: i,
      xR: i + 1,
      yL: pair[0],
      yR: pair[1],
      color
    }
  }
}

// Type declarations

interface LineData {
  xL: number
  xR: number
  yL: number
  yR: number
  color: string
}

export interface ChartData {
  color: string
  vals: Array<number>
}
</script>

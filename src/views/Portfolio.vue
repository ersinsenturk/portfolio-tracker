<template>
  <card>
    <template #title> Holdings </template>
  </card>
  <div>
    Portfolio
    <div>
      <Doughnut :data="data" :options="options" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)

const data = reactive({
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10]
    }
  ]
})
const options = reactive({
  responsive: true,
  maintainAspectRatio: false
})
</script>

<style lang="scss" scoped></style>

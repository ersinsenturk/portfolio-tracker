<template>
  <card class="text-center">
    <template #title>{{ assetName }}</template>

    <div class="w-full max-h-[500px] flex justify-center">
      <Line :data="data" :options="options" class="w-full" />
    </div>
  </card>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAssetStore } from '@/stores/asset'
import { ref, onBeforeMount } from 'vue'
import dateFormat from 'dateformat'
const route = useRoute()
const assetStore = useAssetStore()

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const labels = ref()
const priceData = ref()
const data = ref({ labels: [], datasets: [] })
const options = ref()
const minY = ref()
const maxY = ref()

const assetName = ref()
onBeforeMount(async () => {
  assetName.value = route.params.id.toUpperCase()
  try {
    await assetStore.getAssetData(route.params.id)
  } catch (error) {
    console.error()
  } finally {
    createChart()
  }
})

const createChart = () => {
  const labelDates = assetStore.getAssetPrices.map((item) =>
    dateFormat(new Date(item[0]), 'dd/mm/yy')
  )
  labels.value = labelDates
  priceData.value = assetStore.getAssetPrices.map((item) => item[1])
  minY.value = Math.min(...priceData.value)
  maxY.value = Math.max(...priceData.value)

  data.value = {
    labels: labels.value,
    datasets: [
      {
        label: '',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 2,
        pointStyle: false,
        point: 'none',
        data: priceData.value
      }
    ]
  }
  options.value = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: { color: 'rgb(0, 0, 0, 0.3)' },
        grid: { color: 'rgb(0, 0, 0, 0.3)' },
        border: { color: 'rgb(0, 0, 0, 0.3)' }
      },
      y: {
        ticks: { color: 'rgb(0, 0, 0, 0.3)' },
        grid: { color: 'rgb(0, 0, 0, 0.3)' },
        border: { color: 'rgb(0, 0, 0, 0.3)' },
        suggestedMin: minY.value - minY.value * 0.05,
        suggestedMax: maxY.value + maxY.value * 0.05
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

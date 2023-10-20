<template>
  <card>
    <template #title> Holdings </template>
    <div class="grid md:grid-cols-3 gap-4">
      <summary-box class="col-span-1">
        <template #title>Value</template>
        ${{ portfolioValue }}
      </summary-box>
      <summary-box class="col-span-1">
        <template #title>Invested</template>
        ${{ portfolioInvested }}
      </summary-box>
      <summary-box class="col-span-1">
        <template #title>Profit</template>
        ${{ portfolioProfit }}
        <span
          class="text-xs ml-2"
          :class="portfolioProfitPer > 0 ? 'text-green-600' : 'text-red-600'"
          >{{ portfolioProfitPer }}%</span
        >
      </summary-box>

      <div class="col-span-1 dark:bg-gray-800 rounded-md p-2">
        <Doughnut :data="data" :options="options" v-if="data.datasets[0].data.length > 0" />
      </div>
      <div class="md:col-span-2 relative overflow-x-auto">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md sm:rounded-lg"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">
                <div class="group flex items-center">Symbol</div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="group flex items-center">Shares</div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="group flex items-center">Cost Per Share</div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="group flex items-center">Value</div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="group flex items-center">Current Value</div>
              </th>
              <!-- <th scope="col" class="px-6 py-3">
                <div class="group flex items-center">Share in Portfolio</div>
              </th> -->
            </tr>
          </thead>
          <tbody>
            <holding v-for="holding in holdings" :key="holding" :holding="holding"></holding>
          </tbody>
        </table>
      </div>
    </div>
  </card>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import SummaryBox from '@/components/portfolio/SummaryBox.vue'
import Holding from '@/components/portfolio/Holding.vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)

import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
import { useAssetStore } from '@/stores/asset'
const assetStore = useAssetStore()

const data = reactive({
  labels: [],
  datasets: [
    {
      backgroundColor: [],
      data: []
    }
  ]
})

let options = reactive({
  responsive: true,
  maintainAspectRatio: false
})

const transactions = ref()
const portfolioValue = ref()
const portfolioInvested = ref()
const portfolioProfit = ref()
const portfolioProfitPer = ref()
const currentPrices = []

const holdings = reactive([])

const getCurrentPrices = async () => {
  const coins = new Set(transactions.value.map((item) => item.asset.id))
  const coinsStr = [...coins].join(',')
  await assetStore.getPortfolioAssetsPrice(coinsStr)
  const entries = Object.entries(assetStore.portfolioAssetsPrice)
  entries.forEach((item) => {
    const priceObj = {
      [item[0]]: item[1].usd
    }
    currentPrices.push(priceObj)
  })
}

const createHoldingsArray = async () => {
  await getCurrentPrices()
  const coins = [...new Set(transactions.value.map((item) => item.asset.symbol))]

  coins.forEach((item) => {
    const filteredTransaction = transactions.value.filter((t) => t.asset.symbol === item)
    const shares = filteredTransaction
      .map((m) => (m.type === 'sell' ? Number(m.shares) * -1 : Number(m.shares)))
      .reduce((r, total) => {
        return total + r
      }, 0)
    const value = filteredTransaction
      .map((m) => (m.type === 'sell' ? m.sum * -1 : m.sum))
      .reduce((r, total) => {
        return total + r
      }, 0)
    const costPerShare = value / shares

    const [curPrice] = currentPrices.filter((item) => {
      const [objKey] = Object.keys(item)
      return filteredTransaction[0].asset.id === objKey
    })

    const currentValue = shares * Number(...Object.values(curPrice))

    const holdingObj = {
      symbol: item,
      shares: shares,
      value: value,
      costPerShare: costPerShare,
      currentValue: currentValue
      // shareInPortfolio: portfolioTotal.value / currentValue.value
    }

    holdings.push(holdingObj)
  })

  createGraph()
}

const createGraph = () => {
  const portTotal = holdings.map((item) => item.currentValue).reduce((r, total) => total + r)

  holdings.forEach((item) => {
    data.labels.push(item.symbol.toUpperCase())
    data.datasets[0].data.push(((item.currentValue / portTotal) * 100).toFixed(1))
    data.datasets[0].backgroundColor.push(randomBgColor())
  })
}

const randomBgColor = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r},${g},${b})`
}

watch(holdings, (val) => {
  portfolioInvested.value = val
    .map((item) => item.value)
    .reduce((r, total) => total + r)
    .toFixed(2)
  portfolioValue.value = val
    .map((item) => item.currentValue)
    .reduce((r, total) => total + r)
    .toFixed(2)
  portfolioProfit.value = (portfolioValue.value - portfolioInvested.value).toFixed(2)
  portfolioProfitPer.value = ((portfolioProfit.value / portfolioInvested.value) * 100).toFixed(1)
})

onMounted(async () => {
  transactions.value = authStore.getTransactions
  createHoldingsArray()
})
</script>

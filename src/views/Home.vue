<template>
  <div class="text-center mb-8">
    <h1 class="text-lg md:text-3xl font-bold mb-4 text-primary">Search for a cryptocurrency</h1>
    <search></search>
  </div>

  <div class="grid md:grid-cols-2 gap-4">
    <card>
      <template #title>Trendings</template>
      <template #default>
        <trends :trendsList="trendsList"></trends>
      </template>
    </card>
    <card>
      <template #title>Market News</template>
      <template #default>
        <news :newsList="newsList"></news>
      </template>
    </card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { CG_API_URL, AV_API_URL } from '@/includes/config'
import { AJAX, getLocalStorage, setLocalStorage } from '@/includes/helpers'
import Search from '@/components/home/Search.vue'
import Trends from '@/components/home/Trends.vue'
import News from '@/components/home/News.vue'

onMounted(() => {
  getTrends()
  getNews()
})

const trendsList = ref()
const getTrends = async () => {
  const localData = getLocalStorage('trendsListLocal')
  let data
  if (localData) {
    data = localData
  } else {
    try {
      data = await AJAX(`${CG_API_URL}/search/trending`)
      setLocalStorage('trendsListLocal', data)
    } catch (error) {
      console.error(error)
    }
  }
  trendsList.value = data.coins.map((item) => {
    return {
      id: item.item.id,
      name: item.item.name,
      symbol: item.item.symbol,
      thumb: item.item.thumb,
      price_btc: item.item.price_btc
    }
  })
}

const newsList = ref()

const getNews = async () => {
  const localData = getLocalStorage('newsListLocal')
  let data
  if (localData) {
    data = localData
  } else {
    try {
      data = await AJAX(
        `${AV_API_URL}/query?function=NEWS_SENTIMENT&topics=blockchain&apikey=${
          import.meta.env.VITE_AV_API_KEY
        }`
      )
      setLocalStorage('newsListLocal', data)
    } catch (error) {
      console.error(error)
    }
  }

  newsList.value = data.feed
}
</script>

<style lang="scss" scoped></style>

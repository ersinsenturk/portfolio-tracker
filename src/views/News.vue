<template>
  <card v-for="news in newsList" :key="news" class="mb-4">
    <a :href="news.url" target="_blank" class="flex">
      <figure class="basis-1/6 mr-4">
        <img :src="news.banner_image" :alt="news.title" />
      </figure>
      <div class="basis-full flex flex-col justify-between text-primary">
        <div class="mb-4">
          <div class="font-bold text-xl">{{ news.title }}</div>
          <div>{{ news.summary }}</div>
        </div>
        <div>{{ formatDate(news.time_published) }} - {{ news.source }}</div>
      </div>
    </a>
  </card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { AV_API_URL } from '@/includes/config'
import { AJAX, getLocalStorage, setLocalStorage } from '@/includes/helpers'
onMounted(() => {
  getNews()
})

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

import dateFormat from 'dateformat'

const formatDate = (date) => {
  const formatDateStr = `${date.substr(0, 4)}-${date.substr(4, 2)}-${date.substr(
    6,
    3
  )}${date.substr(9, 2)}:${date.substr(11, 2)}:${date.substr(13, 2)}`

  return dateFormat(formatDateStr, 'dd/mm/yy hh:MM')
}
</script>

<style lang="scss" scoped></style>

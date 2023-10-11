<template>
  <ul class="text-primary">
    <li v-for="news in newsListFiltered" :key="news" class="leading-6 mb-2">
      <a :href="news.url" target="_blank">
        <span class="font-bold">{{ formatDate(news.time_published) }}</span> -
        <span class="link-text-primary">{{ news.title }}</span> -
        {{ news.source }}
      </a>
    </li>
  </ul>
</template>

<script setup>
import dateFormat from 'dateformat'
import { computed } from 'vue'
const props = defineProps(['newsList'])

const newsListFiltered = computed(() => props.newsList?.slice(0, 10))

const formatDate = (date) => {
  const formatDateStr = `${date.substr(0, 4)}-${date.substr(4, 2)}-${date.substr(
    6,
    3
  )}${date.substr(9, 2)}:${date.substr(11, 2)}:${date.substr(13, 2)}`

  return dateFormat(formatDateStr, 'dd/mm/yy hh:MM')
}
</script>

<style lang="scss" scoped></style>

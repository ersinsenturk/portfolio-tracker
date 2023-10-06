<template>
  <div class="flex flex-col justify-between bg-white dark:bg-gray-800 py-4">
    <div class="flex flex-col">
      <router-link
        v-for="item in sidebarItems"
        :key="item"
        :to="{ name: `${item.path}` }"
        class="flex items-center py-2 px-4 mb-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700 dark:text-gray-200 font-bold"
      >
        <fa-icon :icon="['fas', item.icon]" class="w-5 h-5 mr-2" />

        <div>
          {{ item.name }}
        </div>
      </router-link>
    </div>
    <a
      href=""
      class="flex items-center py-2 px-4 text-gray-600 hover:text-gray-900 dark:hover:bg-gray-600 dark:text-gray-200 font-bold"
      ><fa-icon :icon="['fas', 'circle-left']" class="w-5 h-5 mr-2" />Collapse</a
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'
const sidebarItems = ref([
  { icon: 'house', name: 'Home', path: 'Home' },
  { icon: 'chart-pie', name: 'Portfolio', path: 'Portfolio' },
  { icon: 'newspaper', name: 'News', path: 'News' },
  { icon: 'chart-line', name: 'Growth', path: 'Growth' },
  { icon: 'file-lines', name: 'Transactions', path: 'Transactions' }
])
</script>

<style scoped>
.router-link-active {
  @apply bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-gray-300;
}
</style>

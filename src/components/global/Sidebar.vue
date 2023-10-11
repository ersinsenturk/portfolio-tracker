<template>
  <div
    class="flex flex-col justify-between bg-white dark:bg-gray-800 p-4 pt-[88px] -mt-[72px] min-h-[100svh]"
  >
    <div class="flex flex-col">
      <router-link
        v-for="item in sidebarItems"
        :key="item"
        :to="{ name: `${item.path}` }"
        class="flex items-center py-3 px-2 mb-2 rounded-lg text-primary hover:bg-gray-50 hover:text-gray-900 dark:hover:text-gray-300 dark:hover:bg-gray-700 font-bold"
      >
        <fa-icon :icon="['fas', item.icon]" class="w-5 h-5 mr-2" />

        <div>
          {{ item.name }}
        </div>
      </router-link>
    </div>
    <!-- <button
      class="flex items-center py-3 px-2 rounded-lg text-primary hover:bg-gray-50 hover:text-gray-900 dark:hover:text-gray-300 dark:hover:bg-gray-700 font-bold"
      @click.prevent="toggleSidebar"
    >
      <fa-icon v-if="sidebarView === 'open'" :icon="['fas', 'circle-left']" class="w-5 h-5 mr-2" />
      <fa-icon
        v-if="sidebarView === 'close'"
        :icon="['fas', 'circle-right']"
        class="w-5 h-5 mr-2"
      />
      <div class="leading-5" :class="{ hidden: sidebarView === 'close' }">Collapse</div>
    </button> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
// const emits = defineEmits(['sidebarView'])
const sidebarItems = ref([
  { icon: 'house', name: 'Home', path: 'Home' },
  { icon: 'chart-pie', name: 'Portfolio', path: 'Portfolio' },
  { icon: 'newspaper', name: 'News', path: 'News' },
  { icon: 'chart-line', name: 'Growth', path: 'Growth' },
  { icon: 'file-lines', name: 'Transactions', path: 'Transactions' }
])

// const sidebarView = ref('open')
// const toggleSidebar = () => {
//   sidebarView.value = sidebarView.value === 'open' ? 'close' : 'open'
//   emits('sidebarView', sidebarView.value)
// }
</script>

<style scoped>
.router-link-active {
  @apply bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-gray-300;
}
</style>

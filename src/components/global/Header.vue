<template>
  <div
    class="flex justify-between bg-white dark:bg-gray-800 dark:border-b dark:border-gray-700 p-4 shadow-sm relative"
  >
    <div class="logo text-3xl dark:text-gray-200">
      <div
        class="flex lg:hidden items-center justify-center w-12 h-12 border-4 border-black tracking-wide"
      >
        PT
      </div>
      <div class="hidden lg:block">PORTFOLIO TRACKER</div>
    </div>
    <div class="flex items-center">
      <label class="relative inline-flex items-center cursor-pointer mr-4">
        <div class="w-14 h-7 bg-gray-200 rounded-full peer dark:bg-gray-700 dark:border-gray-600">
          <input type="checkbox" value="" @change="toggleTheme" class="sr-only peer" />
          <span
            class="flex justify-center items-center peer peer-checked:translate-x-full peer-checked:border-white absolute top-0.5 left-[4px] bg-white border-gray-300 border rounded-full h-6 w-6 transition-all"
          >
            <fa-icon
              v-if="theme === 'light'"
              :icon="['fas', 'sun']"
              class="text-yellow-500"
              size="sm"
            />
            <fa-icon v-if="theme === 'dark'" :icon="['fas', 'moon']" class="text-black" size="sm" />
          </span>
        </div>
      </label>
      <router-link :to="{ name: 'Auth' }" class="btn btn-primary"> Login </router-link>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<style scoped>
.logo {
  font-family: 'Bebas Neue', sans-serif;
}
</style>

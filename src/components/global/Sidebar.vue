<template>
  <div class="flex flex-col justify-between">
    <div class="flex flex-col">
      <router-link
        v-for="item in sidebarItems"
        :key="item"
        :to="{ name: `${item.path}` }"
        class="py-2 px-4"
      >
        {{ item.name }}
      </router-link>
    </div>
    <a href="">Collapse</a>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const sidebarItems = ref([
  { icon: '', name: 'Home', path: 'Home' },
  { icon: '', name: 'Portfolio', path: 'Portfolio' },
  { icon: '', name: 'News', path: 'News' },
  { icon: '', name: 'Growth', path: 'Growth' },
  { icon: '', name: 'Transactions', path: 'Transactions' }
])
</script>

<style lang="scss" scoped></style>

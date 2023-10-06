<template>
  <div class="grid grid-cols-6 bg-gray-50 dark:bg-gray-700">
    <Header class="col-span-full"></Header>
    <Sidebar class="col-span-1"></Sidebar>
    <div class="col-span-5 px-8 py-6 min-h-[80vh]">
      <router-view></router-view>
    </div>
  </div>
  <div></div>
</template>

<script setup>
import Header from '@/components/global/Header.vue'
import Sidebar from '@/components/global/Sidebar.vue'
</script>

<style lang="scss" scoped></style>

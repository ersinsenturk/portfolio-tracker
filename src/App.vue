<template>
  <div class="grid grid-cols-6">
    <Header class="col-span-full"></Header>
    <Sidebar class="col-span-1"></Sidebar>
    <router-view></router-view>
  </div>
  <div></div>
</template>

<script setup>
import Header from '@/components/global/Header.vue'
import Sidebar from '@/components/global/Sidebar.vue'
</script>

<style lang="scss" scoped></style>

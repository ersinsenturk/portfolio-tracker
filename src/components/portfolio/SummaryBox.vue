<template>
  <div class="bg-gray-100 dark:bg-gray-700 rounded-md p-2">
    <div class="text-sm md:text-base font-bold dark:text-gray-400">
      <slot name="title"></slot>
    </div>
    <div class="text-lg md:text-2xl dark:text-gray-300">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>

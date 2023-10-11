<template>
  <div class="bg-white dark:bg-gray-600 p-4 rounded-lg">
    <div class="text-xl text-primary font-bold mb-2">
      <slot name="title"></slot>
    </div>
    <slot name="default"></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>

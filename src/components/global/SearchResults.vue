<template>
  <div
    class="absolute w-full max-h-64 bg-white top-full left-0 border border-gray-300 overflow-auto"
    v-if="props.searchList.length"
  >
    <ul class="w-full m-0 p-0">
      <li
        v-for="item in props.searchList"
        :key="item"
        class="border-b border-gray-200 bg-gray-100 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-400 text-left cursor-pointer"
      >
        <router-link
          :to="{ name: 'Asset', params: { id: item.id } }"
          class="px-2 py-1 leading-6 block text-primary"
        >
          <span class="font-bold">
            {{ item.symbol.toUpperCase() }}
          </span>
          - {{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps(['searchList'])
</script>

<style lang="scss" scoped></style>

<template>
  <div
    class="flex w-1/3 mx-auto relative items-center bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 py-1 px-2"
  >
    <fa-icon :icon="['fas', 'magnifying-glass']" size="lg" class="dark:text-gray-200" />
    <input
      type="text"
      class="basis-full bg-transparent leading-9 px-2 outline-none placeholder:text-sm dark:text-gray-200"
      placeholder="Enter the symbol or the name of cryptocurrency"
      @input="searchStore.search($event, assetStore.assetsList)"
      id="searchInput"
    />
    <button
      :class="{ hidden: !searchStore.searchList.length }"
      class="absolute right-2 top-0 bottom-0 m-auto text-primary"
      @click="searchStore.resetSearch('#searchInput')"
    >
      <fa-icon :icon="['far', 'circle-xmark']" size="lg" />
    </button>
    <search-results :searchList="searchStore.searchList"></search-results>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import SearchResults from '@/components/global/SearchResults.vue'
import { useAssetStore } from '@/stores/asset'
const assetStore = useAssetStore()
import { useSearchStore } from '@/stores/search'
import { onBeforeUnmount } from 'vue'

const searchStore = useSearchStore()

onBeforeUnmount(() => {
  searchStore.resetSearch('#searchInput')
})
</script>

<style lang="scss" scoped></style>

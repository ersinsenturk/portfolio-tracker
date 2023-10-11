import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const searchList = ref('')
  const search = async ($event, assetList) => {
    const value = $event.target.value
    if (value.length >= 3) {
      searchList.value = assetList.filter(
        (item) =>
          item.symbol.toLowerCase().includes(value.toLowerCase()) ||
          item.name.toLowerCase().includes(value.toLowerCase())
      )
    } else {
      searchList.value = ''
    }
  }

  const resetSearch = (id) => {
    const searchInput = document.querySelector(id)
    searchList.value = ''
    searchInput.value = ''
  }
  return { searchList, search, resetSearch }
})

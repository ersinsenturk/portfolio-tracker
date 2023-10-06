import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAssetStore = defineStore('asset', () => {
  const asset = ref()
  const getAssetData = async () => {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily'
    )
    const data = await response.json()
    asset.value = data
  }
  const getAssetPrices = computed(() => {
    return asset.value.prices
  })

  return { asset, getAssetData, getAssetPrices }
})

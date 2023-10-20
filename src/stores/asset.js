import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { CG_API_URL } from '@/includes/config'
import { AJAX, getLocalStorage, setLocalStorage } from '@/includes/helpers'

export const useAssetStore = defineStore('asset', () => {
  const asset = ref()

  const assetsList = ref()
  const fetchAssetsList = async () => {
    const localData = getLocalStorage('assetsListLocal')?.coins
    if (localData) return (assetsList.value = localData)

    try {
      const data = await AJAX(`${CG_API_URL}/coins/list`)
      assetsList.value = data
      setLocalStorage('assetsListLocal', { coins: data })
    } catch (error) {
      console.error(error)
    }
  }

  const getAssetData = async (id) => {
    const data = await AJAX(
      `${CG_API_URL}/coins/${id}/market_chart?vs_currency=usd&days=180&interval=daily`
    )

    asset.value = data
  }
  const getAssetPrices = computed(() => {
    return asset.value.prices
  })

  const portfolioAssetsPrice = ref()
  const getPortfolioAssetsPrice = async (id) => {
    const data = await AJAX(`${CG_API_URL}/simple/price?ids=${id}&vs_currencies=usd`)
    portfolioAssetsPrice.value = data
  }

  const btcPrice = ref()
  const getBTCPrice = async () => {
    let data
    const localData = getLocalStorage('btcPriceLocal')
    if (localData) {
      data = localData
    } else {
      try {
        data = await AJAX(`${CG_API_URL}/exchange_rates`)
        setLocalStorage('btcPriceLocal', data)
      } catch (error) {
        console.error(error)
      }
    }

    btcPrice.value = data.rates.usd.value
  }

  return {
    asset,
    getAssetData,
    getAssetPrices,
    getBTCPrice,
    btcPrice,
    fetchAssetsList,
    assetsList,
    getPortfolioAssetsPrice,
    portfolioAssetsPrice
  }
})

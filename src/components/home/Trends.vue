<template>
  <div class="flex flex-col text-primary">
    <div class="flex">
      <div class="basis-1/3 font-bold p-2 border">Symbol</div>
      <div class="basis-1/3 font-bold p-2 border">Name</div>
      <div class="basis-1/3 font-bold p-2 border">Price</div>
    </div>
    <div class="flex" v-for="trend in props.trendsList" :key="trend">
      <div class="basis-1/3 p-2 border flex items-center">
        <div class="w-4 md:w-7 mr-2">
          <img :src="trend.thumb" :alt="trend.name" class="block" />
        </div>
        <router-link
          :to="{ name: 'Asset', params: { id: trend.id } }"
          class="font-bold link-text-primary text-sm md:text-base"
        >
          {{ trend.symbol }}
        </router-link>
      </div>
      <div class="basis-1/3 p-2 border text-sm md:text-base text-ellipsis overflow-hidden">
        {{ trend.name }}
      </div>
      <div class="basis-1/3 p-2 border text-sm md:text-base">
        {{ calculateUsdPrice(trend.price_btc).toFixed(6) }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['trendsList'])
import { storeToRefs } from 'pinia'
import { useAssetStore } from '@/stores/asset'
const assetStore = useAssetStore()
const { btcPrice } = storeToRefs(assetStore)

const calculateUsdPrice = (price_btc) => {
  return price_btc * btcPrice.value
}
</script>

<style lang="scss" scoped></style>

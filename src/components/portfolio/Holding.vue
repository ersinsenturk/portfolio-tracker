<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td class="px-6 py-4 font-bold">
      {{ props.holding.symbol.toUpperCase() }}
    </td>

    <td class="px-6 py-4">{{ props.holding.shares.toFixed(2) }}</td>
    <td class="px-6 py-4">${{ props.holding.costPerShare.toFixed(2) }}</td>
    <td class="px-6 py-4">${{ props.holding.value.toFixed(2) }}</td>
    <td class="px-6 py-4">${{ props.holding.currentValue.toFixed(2) }}</td>
    <!-- <td class="px-6 py-4">${{ props.holding.shareInPortfolio }}</td> -->
  </tr>
</template>

<script setup>
const props = defineProps(['holding'])
</script>

<style lang="scss" scoped></style>

<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td
      scope="row"
      class="p-2 md:px-6 md:py-4 whitespace-nowrap font-medium text-gray-900"
      :class="transaction.type === 'buy' ? 'text-green-600' : 'text-red-600'"
    >
      {{ transaction.type.toUpperCase() }}
    </td>
    <td class="p-2 md:px-6 md:py-4 whitespace-nowrap">
      {{ transaction.asset.symbol.toUpperCase() }} <br />
      {{ transaction.asset.name }}
    </td>
    <td class="p-2 md:px-6 md:py-4 whitespace-nowrap">{{ transaction.date }}</td>
    <td class="p-2 md:px-6 md:py-4 whitespace-nowrap">{{ transaction.shares }}</td>
    <td class="p-2 md:px-6 md:py-4 whitespace-nowrap">${{ transaction.price }}</td>
    <td class="p-2 md:px-6 md:py-4 whitespace-nowrap">${{ transaction.sum }}</td>

    <td class="py-4 px-2 md:px-6 md:py-4 whitespace-nowrap flex text-right">
      <button class="mr-3 md:mr-4" @click="emit('editTransaction', transaction)">
        <fa-icon :icon="['fas', 'pen-to-square']" class="md:text-lg" />
      </button>
      <button @click="emit('removeTransaction', transaction)">
        <fa-icon :icon="['fas', 'trash']" class="text-red-400 md:text-lg" />
      </button>
    </td>
  </tr>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['transaction'])
const transaction = ref(props.transaction)

const emit = defineEmits(['editTransaction', 'removeTransaction'])
</script>

<style lang="scss" scoped></style>

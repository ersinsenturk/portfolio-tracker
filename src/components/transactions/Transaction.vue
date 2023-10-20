<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th
      scope="row"
      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      :class="transaction.type === 'buy' ? 'text-green-600' : 'text-red-600'"
    >
      {{ transaction.type.toUpperCase() }}
    </th>
    <td class="px-6 py-4">
      {{ transaction.asset.symbol.toUpperCase() }} <br />
      {{ transaction.asset.name }}
    </td>
    <td class="px-6 py-4">{{ transaction.date }}</td>
    <td class="px-6 py-4">{{ transaction.shares }}</td>
    <td class="px-6 py-4">${{ transaction.price }}</td>
    <td class="px-6 py-4">${{ transaction.sum }}</td>

    <td class="px-6 py-4 text-right">
      <button class="mr-4" @click="emit('editTransaction', transaction)">
        <fa-icon :icon="['fas', 'pen-to-square']" size="lg" />
      </button>
      <button @click="emit('removeTransaction', transaction)">
        <fa-icon :icon="['fas', 'trash']" size="lg" class="text-red-400" />
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

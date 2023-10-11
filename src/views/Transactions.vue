<template>
  <card>
    <template #title>
      <div class="flex justify-between">
        Transactions
        <button class="btn btn-primary text-sm font-normal" @click="toggleTransactionModal">
          Add Transaction
        </button>
      </div>
    </template>
    <div class="relative">
      <select
        v-model="filterOpt"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm mb-4 rounded-lg block px-2 py-2 outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      >
        <option value="all">All</option>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <table
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md sm:rounded-lg"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Operation</th>
            <th scope="col" class="px-6 py-3">
              <div class="group flex items-center">
                Holding
                <button @click="orderTransactions('symbol')" class="invisible group-hover:visible">
                  <fa-icon :icon="['fas', 'arrow-down-short-wide']" class="ml-2" />
                </button>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              <div class="group flex items-center">
                Date
                <button @click="orderTransactions('date')" class="invisible group-hover:visible">
                  <fa-icon :icon="['fas', 'arrow-down-short-wide']" class="ml-2" />
                </button>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              <div class="group flex items-center">
                Shares
                <button @click="orderTransactions('shares')" class="invisible group-hover:visible">
                  <fa-icon :icon="['fas', 'arrow-down-short-wide']" class="ml-2" />
                </button>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              <div class="group flex items-center">
                Price
                <button @click="orderTransactions('price')" class="invisible group-hover:visible">
                  <fa-icon :icon="['fas', 'arrow-down-short-wide']" class="ml-2" />
                </button>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              <div class="group flex items-center">
                Sum
                <button @click="orderTransactions('sum')" class="invisible group-hover:visible">
                  <fa-icon :icon="['fas', 'arrow-down-short-wide']" class="ml-2" />
                </button>
              </div>
            </th>

            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <transaction
            v-for="transaction in filterTransactions"
            :key="transaction"
            :transaction="transaction"
            @editTransaction="editTransaction"
          ></transaction>
        </tbody>
      </table>
    </div>
  </card>
  <teleport to="body">
    <transaction-modal
      v-if="isModalOpen"
      :dataEdit="dataEdit"
      @toggleTransactionModal="toggleTransactionModal"
      @submitFormData="submitFormData"
    ></transaction-modal>
  </teleport>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import Transaction from '@/components/transactions/Transaction.vue'
import TransactionModal from '@/components/transactions/TransactionModal.vue'

const isModalOpen = ref(false)
const toggleTransactionModal = () => {
  isModalOpen.value = !isModalOpen.value
  dataEdit.value = null
}

const dataEdit = ref()
const editTransaction = (tr) => {
  toggleTransactionModal()
  dataEdit.value = tr
}

const transactions = reactive([
  {
    id: 1,
    asset: { id: 'link', name: 'link', symbol: 'link' },
    type: 'buy',
    date: '2222-11-08',
    shares: 100,
    price: 10,
    sum: 101
  },
  {
    id: 2,
    asset: { id: 'xtc', name: 'xtc', symbol: 'xtc' },
    type: 'sell',
    date: '1222-10-10',
    shares: 202,
    price: 20,
    sum: 102
  },
  {
    id: 3,
    asset: { id: 'aaa', name: 'aaa', symbol: 'aaa' },
    type: 'sell',
    date: '1233-10-10',
    shares: 23,
    price: 34,
    sum: 105
  },
  {
    id: 4,
    asset: { id: 'qwe', name: 'qwe', symbol: 'qwe' },
    type: 'buy',
    date: '2022-11-08',
    shares: 66,
    price: 104,
    sum: 10
  }
])

const filterOpt = ref('all')
let orderAsc = true
const orderTransactions = (sortOpt = 'date') => {
  if (orderAsc) {
    transactions.sort((a, b) => b[sortOpt] - a[sortOpt])
  } else {
    transactions.sort((a, b) => a[sortOpt] - b[sortOpt])
  }
  orderAsc = !orderAsc
}
const filterTransactions = computed(() => {
  if (filterOpt.value !== 'all') {
    return transactions.filter((item) => item.type === filterOpt.value)
  }
  return transactions
})

onMounted(() => {
  orderTransactions()
})

const submitFormData = (formData) => {
  console.log(formData)
}
</script>

<style lang="scss" scoped></style>

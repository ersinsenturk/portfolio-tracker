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
    <div v-if="!filtered.length">Add Some Transaction</div>
    <div v-if="filtered.length" class="relative overflow-x-auto">
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
            <th scope="col" class="p-2 md:px-6 md:py-3">Operation</th>
            <th scope="col" class="p-2 md:px-6 md:py-3">
              <div class="group flex items-center">
                Holding
                <button @click="orderTransactions('symbol')" class="invisible group-hover:visible">
                  <fa-icon :icon="['fas', 'arrow-down-short-wide']" class="ml-2" />
                </button>
              </div>
            </th>
            <th scope="col" class="p-2 md:px-6 md:py-3">
              <div class="group flex items-center">
                Date
                <button @click="orderTransactions('date')" class="invisible group-hover:visible">
                  <fa-icon :icon="['fas', 'arrow-down-short-wide']" class="ml-2" />
                </button>
              </div>
            </th>
            <th scope="col" class="p-2 md:px-6 md:py-3">
              <div class="group flex items-center">
                Shares
                <button @click="orderTransactions('shares')" class="invisible group-hover:visible">
                  <fa-icon :icon="['fas', 'arrow-down-short-wide']" class="ml-2" />
                </button>
              </div>
            </th>
            <th scope="col" class="p-2 md:px-6 md:py-3">
              <div class="group flex items-center">
                Price
                <button @click="orderTransactions('price')" class="invisible group-hover:visible">
                  <fa-icon :icon="['fas', 'arrow-down-short-wide']" class="ml-2" />
                </button>
              </div>
            </th>
            <th scope="col" class="p-2 md:px-6 md:py-3">
              <div class="group flex items-center">
                Sum
                <button @click="orderTransactions('sum')" class="invisible group-hover:visible">
                  <fa-icon :icon="['fas', 'arrow-down-short-wide']" class="ml-2" />
                </button>
              </div>
            </th>

            <th scope="col" class="p-2 md:px-6 md:py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <transaction
            v-for="transaction in filtered"
            :key="transaction"
            :transaction="transaction"
            @editTransaction="editTransaction"
            @removeTransaction="removeTransaction"
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
import { onMounted, ref, watch } from 'vue'
import Transaction from '@/components/transactions/Transaction.vue'
import TransactionModal from '@/components/transactions/TransactionModal.vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

const isModalOpen = ref(false)
const toggleTransactionModal = () => {
  isModalOpen.value = !isModalOpen.value
  dataEdit.value = null
}

const dataEdit = ref()
const editTransaction = (transaction) => {
  toggleTransactionModal()
  dataEdit.value = transaction
}
const removeTransaction = async (transaction) => {
  await authStore.deleteTransaction(transaction)
}

const filterOpt = ref('all')
let orderAsc = true
const orderTransactions = (sortOpt = 'date') => {
  if (!filtered.value) return
  if (orderAsc) {
    filtered.value.sort((a, b) => b[sortOpt] - a[sortOpt])
  } else {
    filtered.value.sort((a, b) => a[sortOpt] - b[sortOpt])
  }
  orderAsc = !orderAsc
}
const filtered = ref([])
watch(filterOpt, (val) => {
  if (val !== 'all') {
    filtered.value = transactions.value.filter((item) => item.type === val)
  } else {
    filtered.value = transactions.value
  }
})

let transactions = ref([])
onMounted(() => {
  transactions.value = authStore.getTransactions
  orderTransactions()
  filtered.value = transactions.value
})

const submitFormData = async (formData) => {
  const data = { ...formData, sum: calcSum(formData) }
  await authStore.addTransaction(data)
  transactions.value = authStore.user.transactions
  isModalOpen.value = false
}
const calcSum = (data) => {
  return data.price * data.shares
}
</script>

<style lang="scss" scoped></style>

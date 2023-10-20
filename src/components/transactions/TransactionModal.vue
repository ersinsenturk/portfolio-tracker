<template>
  <div
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full bg-gray-300/50 flex items-center justify-center"
    @click.self="emit('toggleTransactionModal')"
  >
    <div class="relative w-full max-w-2xl max-h-full" @click="clickOutsideElement">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Transaction</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal"
            @click="emit('toggleTransactionModal')"
          >
            <fa-icon :icon="['fas', 'xmark']" size="lg" />
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <Form @submit="submitForm" :validation-schema="schema">
            <div class="grid grid-cols-2 gap-2">
              <div class="mb-6 relative" id="assetContainer">
                <label
                  for="asset"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Asset Name or Symbol</label
                >
                <Field
                  type="text"
                  id="asset"
                  name="asset"
                  class="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  v-model="form.asset"
                />
                <label
                  @click="isDropdownOpen = true"
                  class="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-200 dark:text-white"
                >
                  {{ form.asset?.symbol?.toUpperCase() }}
                </label>
                <ErrorMessage
                  name="asset"
                  class="text-sm text-red-500 font-bold absolute -bottom-5"
                />
                <div
                  id="dropdownSearch"
                  class="absolute left-0 top-full z-10 bg-white rounded-lg shadow w-full dark:bg-gray-700"
                  :class="{ hidden: !isDropdownOpen }"
                >
                  <div class="p-3">
                    <label for="input-group-search" class="sr-only">Search</label>
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                      >
                        <fa-icon
                          :icon="['fas', 'magnifying-glass']"
                          size="sm"
                          class="dark:text-gray-200"
                        />
                      </div>
                      <input
                        type="text"
                        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search asset"
                        @input="searchStore.search($event, assetStore.assetsList)"
                      />
                    </div>
                  </div>
                  <ul
                    class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownSearchButton"
                  >
                    <li
                      v-for="item in searchStore.searchList"
                      :key="item"
                      @click="selectAsset(item)"
                    >
                      <div
                        class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <label
                          for="checkbox-item-11"
                          class="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >{{ item.symbol.toUpperCase() }}</label
                        >
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mb-6 relative">
                <label
                  for="type"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Transaction Type</label
                >
                <Field
                  as="select"
                  name="type"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-200 dark:text-white"
                  v-model="form.type"
                >
                  <option value="buy">BUY</option>
                  <option value="sell">SELL</option>
                </Field>
                <ErrorMessage
                  name="type"
                  class="text-sm text-red-500 font-bold absolute -bottom-5"
                />
              </div>
              <div class="mb-6 relative">
                <label
                  for="date"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Trade Date</label
                >
                <Field
                  type="date"
                  id="date"
                  name="date"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-200 dark:text-white"
                  required
                  v-model="form.date"
                />
                <ErrorMessage
                  name="date"
                  class="text-sm text-red-500 font-bold absolute -bottom-5"
                />
              </div>
              <div class="mb-6 relative">
                <label
                  for="shares"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Shares</label
                >
                <Field
                  type="text"
                  id="shares"
                  name="shares"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-200 dark:text-white"
                  required
                  v-model="form.shares"
                />
                <ErrorMessage
                  name="shares"
                  class="text-sm text-red-500 font-bold absolute -bottom-5"
                />
              </div>
              <div class="mb-6 relative">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Share Price</label
                >
                <Field
                  type="text"
                  id="price"
                  name="price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-200 dark:text-white"
                  required
                  v-model="form.price"
                  placeholder="$"
                />
                <ErrorMessage
                  name="price"
                  class="text-sm text-red-500 font-bold absolute -bottom-5"
                />
              </div>
            </div>
            <div>
              <button class="btn btn-primary" type="submit">
                {{ props.dataEdit ? 'Save' : 'Add' }}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps(['dataEdit'])
const emit = defineEmits(['toggleTransactionModal', 'submitFormData'])

const isDropdownOpen = ref(false)

const clickOutsideElement = (e) => {
  if (!e.target.closest('#assetContainer')) {
    isDropdownOpen.value = false
  }
}

import { useAssetStore } from '@/stores/asset'
const assetStore = useAssetStore()
import { useSearchStore } from '@/stores/search'
const searchStore = useSearchStore()

const selectAsset = (item) => {
  form.asset = item
  isDropdownOpen.value = false
}

const form = reactive({
  asset: '',
  type: '',
  date: '',
  shares: '',
  price: ''
})

const submitForm = (values) => {
  emit('submitFormData', values)
}

const loadEditData = () => {
  form.asset = props.dataEdit.asset
  form.type = props.dataEdit.type
  form.date = props.dataEdit.date
  form.shares = props.dataEdit.shares
  form.price = props.dataEdit.price
}
onMounted(() => {
  if (props.dataEdit) loadEditData()
})

const reqText = 'This field is required'
const numText = 'This field must be a number'
const schema = yup.object({
  asset: yup.object().required().typeError(reqText),
  type: yup.string().required(reqText),
  date: yup.string().required(reqText),
  shares: yup.number().required(reqText).positive().typeError(numText),
  price: yup.number().required(reqText).positive().typeError(numText)
})
</script>

<style scoped>
.dark input::-webkit-calendar-picker-indicator {
  color-scheme: dark;
}
</style>

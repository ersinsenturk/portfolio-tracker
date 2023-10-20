<template>
  <div class="px-6 py-6 lg:px-8">
    <Form @submit="submitForm" :validation-schema="registerSchema">
      <div class="relative z-0 w-full mb-8 group">
        <Field
          type="email"
          name="email"
          id="email"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white focus:border-indigo-500 dark:focus:border-indigo-300 focus:outline-none focus:ring-0 peer"
          placeholder=" "
        />

        <label
          for="email"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-300 dark:border-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-500 dark:peer-focus:text-indigo-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email
        </label>
        <ErrorMessage name="email" class="text-sm text-red-500 font-bold absolute -bottom-5" />
      </div>
      <div class="relative z-0 w-full mb-8 group">
        <Field
          type="password"
          name="password"
          id="password"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white focus:border-indigo-500 dark:focus:border-indigo-300 focus:outline-none focus:ring-0 peer"
          placeholder=" "
        />

        <label
          for="password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-300 dark:border-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-500 dark:peer-focus:text-indigo-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
        <ErrorMessage name="password" class="text-sm text-red-500 font-bold absolute -bottom-5" />
      </div>
      <div class="relative z-0 w-full mb-8 group">
        <Field
          type="password"
          name="confirm_password"
          id="confirm_password"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white focus:border-indigo-500 dark:focus:border-indigo-300 focus:outline-none focus:ring-0 peer"
          placeholder=" "
        />

        <label
          for="confirm_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-300 dark:border-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-500 dark:peer-focus:text-indigo-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Confirm password
        </label>
        <ErrorMessage
          name="confirm_password"
          class="text-sm text-red-500 font-bold absolute -bottom-5"
        />
      </div>

      <button
        type="submit"
        class="btn-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </Form>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'yup'

const registerSchema = yup.object({
  email: yup.string().email('Email must be a valid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum of 6 characters').required('Password is required'),
  confirm_password: yup
    .string()
    .required('Confirm password is required')
    .oneOf([ref('password')], 'Passwords are not match')
})

import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
import { useRouter } from 'vue-router'
const router = useRouter()
const submitForm = async (values) => {
  try {
    await authStore.register(values)
    router.push({ name: 'Home' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped></style>

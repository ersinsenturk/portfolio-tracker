<template>
  <card class="md:w-1/2 m-auto">
    <div class="md:pb-0 md:p-8">
      <ul class="flex flex-wrap mb-2 md:mb-4">
        <li class="flex-auto text-center">
          <a
            class="block rounded py-3 px-4 transition dark:text-white"
            href="#"
            @click.prevent="tab = 'login'"
            :class="{
              'hover:text-white text-white bg-indigo-500': tab === 'login',
              'hover:text-indigo-800': tab === 'register'
            }"
            >Login</a
          >
        </li>
        <li class="flex-auto text-center">
          <a
            class="block rounded py-3 px-4 transition hover:text-indigo-800 dark:text-white"
            href="#"
            @click.prevent="tab = 'register'"
            :class="{
              'hover:text-white text-white bg-indigo-500': tab === 'register',
              'hover:text-indigo-800': tab === 'login'
            }"
            >Register</a
          >
        </li>
      </ul>
    </div>
    <login-form v-if="tab === 'login'"></login-form>
    <register-form v-if="tab === 'register'"></register-form>
  </card>
</template>

<script setup>
import LoginForm from '@/components/auth/Login.vue'
import RegisterForm from '@/components/auth/Register.vue'

import { ref } from 'vue'
const tab = ref('login')
</script>

<style lang="scss" scoped></style>

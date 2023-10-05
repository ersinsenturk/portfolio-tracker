<template>
  <div class="flex justify-between p-4">
    <div class="basis-[60px]">
      <img src="@/assets/logo.svg" alt="Logo" />
    </div>
    <div>
      <input type="checkbox" name="" id="" />
      <router-link :to="{ name: 'Auth' }"> Login </router-link>
    </div>
  </div>
</template>

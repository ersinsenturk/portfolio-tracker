<template>
  <div class="grid grid-cols-6">
    <Header class="col-span-full"></Header>
    <Sidebar class="col-span-1"></Sidebar>
    <div class="col-span-5 p-2 md:px-8 md:py-6">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <div :key="route.name">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/global/Header.vue'
import Sidebar from '@/components/global/Sidebar.vue'
import { onMounted } from 'vue'
import { auth, onAuthStateChanged } from '@/includes/firebase'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
import { useAssetStore } from '@/stores/asset'
const route = useRoute()
const assetStore = useAssetStore()
const authStore = useAuthStore()

onMounted(() => {
  assetStore.getBTCPrice()
  assetStore.fetchAssetsList()
  onAuthStateChanged(
    auth,
    (loggedUser) => {
      if (loggedUser) authStore.getUser(loggedUser.uid)
    },
    (error) => {
      console.error(error)
    }
  )
})
// const sidebarGridClass = ref('grid-cols-6')
// const sidebarView = (val) => {
//   sidebarGridClass.value = val === 'close' ? 'grid-cols-12' : 'grid-cols-6'
// }
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

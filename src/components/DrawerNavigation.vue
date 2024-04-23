<template>
  <div
    v-if="route.fullPath !== '/login'"
    @click="handleOpen()"
    class="absolute xl:!hidden z-10 h-14 w-14 rounded-lg top-1 left-2 border-2 border-white border-solid flex justify-center items-center cursor-pointer select-none active:opacity-50"
  >
    <v-icon icon="fa-bars" class="!text-[2em] text-primary"></v-icon>
  </div>
  <v-app
    v-if="route.fullPath !== '/login'"
    class="w-0 absolute z-1 xl:!relative !flex-1 !flex !bg-secondary !max-w-[290px] xl:!w-[290px]"
  >
    <v-navigation-drawer :width="300" :mini-variant="true" v-model="open" @click="handleOpen()">
      <div class="flex flex-1 flex-col w-full min-h-full !bg-secondary">
        <HeaderDrawer :name="name" />

        <ButtonNavigationDrawer
          v-for="navigation in drawerNavigationList"
          :key="navigation.name"
          :name="navigation.name"
          :icon="navigation.icon"
          :path="navigation.path"
        />
      </div>
    </v-navigation-drawer>
  </v-app>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import ButtonNavigationDrawer from './ButtonNavigation.drawer.vue'
import HeaderDrawer from './Header.drawer.vue'
import { ListNavigation } from '@/helpers/navigation.helper'
import { useRoute } from 'vue-router'

const route = useRoute()

const name = ref(localStorage.getItem('name') || '')

const open = ref(window.innerWidth >= 1280 ? true : false)

const handleOpen = () => {
  if (window.innerWidth >= 1280) {
    open.value = true
    return
  }
  open.value = !open.value
}

const drawerNavigationList = ListNavigation()

watchEffect(() => {
  console.log('new route', route)
  name.value = localStorage.getItem('name') || ''
})
</script>
<script>
export default {
  name: 'DrawerVue',
  components: {
    HeaderDrawer,
    ButtonNavigationDrawer
  }
}
</script>

<style scoped>
.animation-hover:hover > :last-child {
  width: 100% !important;
}

.v-navigation-drawer {
  background-color: #000f01;
}
</style>

<template>
  <div :key="name" :class="ClassButton(path).container" @click="handleRoute(path)">
    <div class="flex flex-row pl-4 items-center content-center">
      <v-icon v-bind="props" :icon="icon" class="!text-[25px] 2xl:!text-[30px]" />
      <span class="text-sm ml-5">{{ name }}</span>
    </div>
    <div :class="ClassButton(path).loaded"></div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

defineProps(['name', 'icon', 'path'])

const ClassButton = (path) => {
  return {
    container: `h-16 active:opacity-80 w-full hover:!text-primary ${path === route.fullPath ? 'text-primary' : 'text-white'} items-center content-center relative animation-hover cursor-pointer overflow-hidden select-none`,
    loaded: `${path === route.fullPath ? 'w-full' : 'w-0'} h-1 bg-primary absolute bottom-0 transition-width duration-1000`
  }
}

const handleRoute = (path) => {
  router.replace(path)
}
</script>

<script>
export default {
  name: 'ButtonNavigation'
}
</script>

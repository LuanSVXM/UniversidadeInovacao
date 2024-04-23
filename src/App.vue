<template>
  <div class="flex flex-1 min-h-[100dvh] w-full">
    <Drawer />
    <router-view />
  </div>
</template>

<script setup>
import Drawer from '@/components/DrawerNavigation.vue'
</script>

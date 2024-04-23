<template>
  <div class="w-full h-16 bg-black justify-center items-center flex">
    <span> {{ title }}</span>
  </div>
</template>

<script setup>
defineProps(['title'])
</script>

<script>
export default {
  name: 'MenuTitle'
}
</script>

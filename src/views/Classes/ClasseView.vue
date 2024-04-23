<template>
  <div class="flex flex-[3.5] h-full min-h-[100dvh] bg-white w-full justify-center items-center">
    <img :src="maintenance" class="w-4/6 lg:w-2/6 object-contain" />
  </div>
</template>

<script setup>
import maintenance from '../../assets/404.png'
</script>

<script>
export default {
  name: 'ClassView'
}
</script>

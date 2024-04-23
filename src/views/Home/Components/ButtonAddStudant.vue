<template>
  <div
    v-on:click="handleOpen"
    class="hidden h-[50px] pl-4 pr-5 md:pr-0 md:pl-0 md:w-60 bg-primary rounded-md overflow-hidden md:flex justify-center items-center active:opacity-50 select-none cursor-pointer"
  >
    <span class="text-md text-secondary pt-1"> Adicionar Estudante</span>
    <v-icon icon="fa-plus" class="text-secondary pt-1 ml-1 !text-[15px] 2xl:!text-[18px]" />
  </div>

  <div
    v-on:click="handleOpen"
    class="md:hidden h-16 w-16 rounded-full z-[1] flex justify-center items-center bg-primary fixed bottom-4 right-4 cursor-pointer active:opacity-50 select-none"
  >
    <v-icon icon="fa-plus" class="text-secondary pt-1 !text-[30px]" />
  </div>
</template>

<script setup>
const emit = defineEmits(['open-click'])

const handleOpen = () => {
  console.log('chamo esse?')
  emit('open-click')
}
</script>

<template>
  <div
    class="absolute w-full min-h-16 left-0 z-40 flex justify-center items-center animation-slide-in"
  >
    <div class="w-full md:w-3/4 min-h-16 lg:w-2/4 2xl:1/4 h-full">
      <v-alert
        :icon="type === 'error' ? 'fa-exclamation' : type === 'sucess' ? 'fa-check' : 'fa-warning'"
        :text="message"
        :type="type"
      ></v-alert>
    </div>
  </div>
</template>

<script setup>
defineProps(['message', 'type'])

const emit = defineEmits(['onEnd'])

setTimeout(() => emit('onEnd', { message: '', type: '', show: false }), 4800)
</script>
<script>
export default {
  name: 'ShowMessage'
}
</script>

<style scoped>
@keyframes slideIn {
  0% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.animation-slide-in {
  opacity: 0;
  animation: 5s linear slideIn;
}
</style>

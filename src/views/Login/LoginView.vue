<template>
  <div class="bg-black flex-1 flex w-svw min-h-svh">
    <LeftSide />
    <RightSide />
  </div>
</template>

<script>
import LeftSide from './Components/LeftSide.vue'
import RightSide from './Components/RightSide.vue'

export default {
  name: 'login-view',
  components: {
    LeftSide,
    RightSide
  }
}
</script>

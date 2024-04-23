<template>
  <div class="lg:flex flex-[3] h-svh bg-bgLeftColor justify-center items-center hidden select-none">
    <img :src="logo" class="w-4/6 object-contain animate-pulse" />
  </div>
</template>

<script>
import logo from '../../../assets/logo_widescreen.png'

export default {
  name: 'LeftSide',
  data: () => {
    return {
      logo: logo
    }
  }
}
</script>

<template>
  <div class="flex flex-1 h-svh bg-bgRightColor items-center flex-col">
    <img
      :src="logo"
      class="object-contain h-[100px] 2xl:h-[200px] w-full mt-5 2xl:mt-0 logo flex fill-primary text-primary pr-4"
    />
    <span class="text-primary text-xl 2xl:text-3xl font-semibold pl-2">{{ title }}</span>
    <FormAuth />
  </div>
</template>

<script>
import logo from '../../../assets/logo.png'
import FormAuth from './FormAuth.vue'
const title = 'Área de acesso'

export default {
  name: 'RightSide',
  data: () => {
    return {
      logo: logo,
      title: title
    }
  },
  components: {
    FormAuth
  }
}
</script>

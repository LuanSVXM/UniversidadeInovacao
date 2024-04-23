<template>
  <div
    class="w-full h-18 bg-black border-b-2 border-solid border-b-white p-2 flex flex-row items-center justify-between"
  >
    <div class="h-full w-2/12 flex items-center justify-center">
      <div
        class="h-12 w-12 rounded-full border-solid border-2 border-white flex justify-center items-center"
      >
        <v-icon icon="fa-user" class="text-primary !text-[25px] 2xl:!text-[30px]" />
      </div>
    </div>
    <div class="w-9/12 h-full flex items-center">
      <p class="w-full pl-2">{{ name }}</p>
    </div>
    <div
      class="w-1/12 h-full flex justify-center items-center cursor-pointer active:opacity-50 select-none"
    >
      <v-menu v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-icon
            v-bind="props"
            icon="fa-ellipsis-v"
            class="text-primary !text-[25px] 2xl:!text-[30px]"
          />
        </template>

        <v-card min-width="150">
          <v-list class="!bg-secondary !p-0 !border-white !border-2 !border-solid">
            <div
              @click="Logout"
              class="w-full h-8 p-1 flex flex-row justify-between items-center select-none cursor-pointer active:opacity-50"
            >
              <v-icon icon="fa-sign-out" class="text-primary !text-[20px] 2xl:!text-[20px]" />
              <span class="text-primary text-md mr-3">Sair</span>
            </div>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { clearToken } from '@/helpers/authetication.helper'

const router = useRouter()

const Logout = () => {
  menu.value = false
  clearToken()
  router.replace('/login')
}

defineProps(['name'])

const menu = ref(false)
</script>
<script>
export default {
  name: 'HeaderDrawer'
}
</script>

<template>
  <div class="h-full min-w-3/12 flex items-center">
    <v-pagination
      :active-color="Colors.terciary"
      :color="Colors.secondary"
      v-model="page"
      :length="pages.total_pages"
      :total-visible="4"
      rounded="circle"
      next-icon="fa-angle-right"
      prev-icon="fa-angle-left"
    ></v-pagination>
  </div>
</template>

<script setup>
import Colors from '../../../../Colors'
import { ref, watch } from 'vue'

const page = ref(1)
const props = defineProps(['pages'])
const emit = defineEmits(['change-page'])

watch(
  () => props?.pages,
  (newValue) => {
    page.value = Number(newValue?.page || 1)
  }
)

watch(
  () => page.value,
  (newValue, oldValue) => {
    console.log({ newValue, oldValue })
    if (newValue !== oldValue && newValue > 0) {
      emit('change-page', { page: newValue })
    }
  }
)
</script>

<script>
export default {
  name: 'StudentsPagination'
}
</script>

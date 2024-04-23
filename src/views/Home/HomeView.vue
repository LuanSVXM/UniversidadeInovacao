<template>
  <div class="flex flex-[3.5] h-full min-h-[100dvh] flex-col bg-white w-full items-center">
    <MenuTitle
      :title="
        !open ? 'Consultar alunos' : open && studentMockup.id ? 'Ajustar aluno' : 'Cadastrar Aluno'
      "
    />
    <div class="flex flex-col flex-1 min-h-full w-full md:pl-2 md:pr-0 relative items-center">
      <ShowMessage
        v-if="messageProps.show"
        :message="messageProps.message"
        :type="messageProps.type"
        :show="messageProps.show"
        @on-end="EndMessage"
      />
      <ModalStudant
        :open="open"
        @on-closeModal="handleOpen(true), handleCount()"
        :values="studentMockup"
      />
      <SearchBar @on-delete="handeDeleteStudent" @on-edit="handeEditStudent" />
      <div
        class="min-h-16 flex-col md:w-4/5 mt-5 flex md:flex-row pl-4 pr-4 items-center justify-between"
      >
        <ButtonAddStudant @open-click="handleOpen(true)" />
        <StudentsPagination :pages="count" @change-page="handleChangePage" />
      </div>
      <ListStudant
        :loading="loading"
        :students="students"
        @on-edit="handeEditStudent"
        @on-delete="handeDeleteStudent"
      />
    </div>
  </div>
</template>

<script setup>
import { GetStudents, GetStudentsPages } from '@/requests/students.request'
import { onMounted, ref, watch } from 'vue'

const loading = ref(false)
const LIMIT_PER_PAGE = 5
const open = ref(false)
const count = ref({ page: 1, total_pages: 1 })
const students = ref([])
const resetValues = { id: '', name: '', registration_number: '', cpf: '', email: '' }
const studentMockup = ref(resetValues)
const messageProps = ref({
  message: '',
  type: 'error',
  show: false
})

const EndMessage = (props) => {
  messageProps.value = props
}

const handeEditStudent = (student) => {
  console.log('chamo edit')
  console.log(student)
  studentMockup.value = { ...student }
  open.value = true
}

const handeDeleteStudent = (student) => {
  console.log('chamo delete')
  console.log(student)
  handleCount()
}

const handleOpen = (reset) => {
  if (reset) {
    console.log(resetValues, 'reset')
    studentMockup.value = { ...resetValues }
  }
  open.value = !open.value
}

const handleChangePage = async (data) => {
  if (data?.page && data?.page > 0) {
    count.value = { ...count.value, page: data?.page }
  }
}

const handleCount = async () => {
  loading.value = true

  let total_pages = await GetStudentsPages({ per_page: LIMIT_PER_PAGE })

  if (total_pages?.message) {
    console.log(total_pages?.message)
    messageProps.value = { message: String(total_pages?.message), type: 'error', show: true }
  }

  if (typeof total_pages !== 'number') {
    total_pages = 1
  }

  count.value = { page: 1, total_pages: total_pages }
}

onMounted(async () => handleCount())

const getStudents = async (newValue) => {
  try {
    console.log(newValue, 'log')
    let page = newValue
    students.value = []
    loading.value = true
    console.log(page)
    const resultStudantes = await GetStudents({ page: page, per_page: LIMIT_PER_PAGE })
    if (resultStudantes?.message) {
      console.log(resultStudantes?.message)
      messageProps.value = { message: String(resultStudantes?.message), type: 'error', show: true }
    } else {
      students.value = [...resultStudantes].map((e) => ({ ...e, show: false })) || []
    }
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}

watch(
  () => count.value,
  async (newValue) => getStudents(newValue.page)
)
</script>

<script>
import MenuTitle from '@/components/MenuTitle.vue'
import SearchBar from './Components/SearchBar.vue'
import ButtonAddStudant from './Components/ButtonAddStudant.vue'
import StudentsPagination from './Components/StudentsPagination.vue'
import ListStudant from './Components/ListStudant.vue'
import ModalStudant from './Components/ModalStudant.vue'
import ShowMessage from '@/components/ShowMessage.vue'

export default {
  name: 'HomeView',
  components: {
    MenuTitle,
    SearchBar,
    ButtonAddStudant,
    StudentsPagination,
    ListStudant,
    ModalStudant,
    ShowMessage
  }
}
</script>

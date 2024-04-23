<template>
  <ShowMessage
    v-if="messageProps.show"
    :message="messageProps.message"
    :type="messageProps.type"
    :show="messageProps.show"
    @on-end="EndMessage"
  />
  <v-dialog v-model="modal" width="auto" :persistent="loadingDialog">
    <v-card
      :loading="loadingDialog"
      max-width="400"
      class="text-center"
      prepend-icon="mdi-update"
      :text="`Após aceitar, ${targetStudent?.name || 'vazio'}, vai ser permanentemente apagado do sistema, deseja confirmar?`"
      title="Deseja apagar esse aluno?"
    >
      <template v-slot:actions>
        <div class="flex justify-center w-full items-center flex-row">
          <v-btn class="mr-5 text-white !bg-red-500" @click="modal = false">Cancelar</v-btn>
          <v-btn class="ml-5 text-white !bg-green-600" @click="onDelete">Confirmar</v-btn>
        </div>
      </template>
    </v-card>
  </v-dialog>
  <div class="flex flex-row w-full h-20 bg-secondary">
    <div class="w-3/12 h-full flex justify-center items-center">
      <span class="text-sm md:text-md text-terciary text-center"> Registro Academico</span>
    </div>
    <div class="w-4/12 h-full flex justify-center items-center">
      <span class="text-sm md:text-md text-terciary text-center">Nome</span>
    </div>
    <div class="w-3/12 h-full flex justify-center items-center">
      <span class="text-sm md:text-md text-terciary text-center">CPF</span>
    </div>
    <div class="w-2/12 h-full flex justify-center items-center">
      <span class="text-sm md:text-md text-terciary text-center">Ações</span>
    </div>
  </div>

  <div v-if="loading" class="h-full mt-20 flex-1 justify-center items-center">
    <v-progress-circular indeterminate :size="128" :width="12"></v-progress-circular>
  </div>

  <div
    v-if="!loading"
    class="w-full flex flex-col flex-1 [&>*:nth-child(n)]:border-secondary [&>*:nth-child(n)]:border [&>*:nth-child(n)]:border-solid [&>*:nth-child(odd)]:bg-white [&>*:nth-child(odd)]:text-secondary [&>*:nth-child(even)]:bg-white [&>*:nth-child(even)]:text-green-500"
  >
    <div v-for="student in students" :key="student?.id" class="flex flex-row w-full h-20">
      <div class="w-3/12 h-full flex justify-center items-center">
        <span class="text-sm md:text-md text-center">
          {{ student?.registration_number || 'Sem Registro' }}</span
        >
      </div>
      <div class="w-4/12 h-full flex justify-center items-center">
        <span class="text-sm md:text-md text-center">{{ student?.name || 'Sem Registro' }}</span>
      </div>
      <div class="w-3/12 h-full flex justify-center items-center">
        <span class="text-sm md:text-md text-center">{{
          changeMask(student?.cpf, '999.999.999-99') || 'Sem Registro'
        }}</span>
      </div>
      <div class="w-2/12 h-full flex justify-center items-center">
        <v-menu v-model="student.show" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-icon
              v-bind="props"
              icon="fa-ellipsis-v"
              class="text-secondary !text-[25px] 2xl:!text-[30px]"
            />
          </template>

          <v-card min-width="150">
            <v-list class="!bg-secondary !p-0 !border-white !border-2 !border-solid">
              <div
                @click="onEdit(student)"
                class="w-full h-8 p-1 flex flex-row mt-1 mb-1 fixHover justify-between items-center select-none cursor-pointer active:opacity-50"
              >
                <v-icon
                  icon="fa-pencil-square-o"
                  class="text-primary !text-[20px] 2xl:!text-[20px]"
                />
                <span class="text-primary text-md mr-3">Editar</span>
              </div>

              <div
                @click="handleDelete(student)"
                class="w-full h-8 p-1 flex flex-row mt-1 mb-1 fixHover justify-between items-center select-none cursor-pointer active:opacity-50"
              >
                <v-icon icon="fa-times-circle" class="text-primary !text-[20px] 2xl:!text-[20px]" />
                <span class="text-primary text-md mr-3">Apagar</span>
              </div>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ShowMessage from '@/components/ShowMessage.vue'
import { DeleteStudents } from '@/requests/students.request.js'
import { changeMask } from '@/helpers/mask.helper.js'

const modal = ref(false)

const loadingDialog = ref(false)

const targetStudent = ref({})

const messageProps = ref({ message: '', type: 'error', show: false })

const EndMessage = (props) => {
  messageProps.value = props
}

defineProps(['students', 'loading'])

const emit = defineEmits(['on-edit', 'on-delete'])

const onEdit = (student) => {
  emit('on-edit', { ...student })
}

const handleDelete = (student) => {
  targetStudent.value = student
  modal.value = true
}

const onDelete = async () => {
  //
  try {
    loadingDialog.value = true
    const response = await DeleteStudents(targetStudent.value?.id)

    if (response?.message) {
      messageProps.value = { message: String(response?.message), type: 'error', show: true }
      loadingDialog.value = false
      modal.value = false
      return
    }

    modal.value = false
    emit('on-delete', { ...targetStudent.value })
  } catch (err) {
    messageProps.value = { message: 'Erro interno!', type: 'error', show: true }
  } finally {
    loadingDialog.value = false
  }
}
</script>

<style>
.fixHover:hover > * {
  color: aqua !important;
}
</style>

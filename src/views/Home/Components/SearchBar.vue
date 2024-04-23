<template>
  <ShowMessage
    v-if="messageProps.show"
    :message="messageProps.message"
    :type="messageProps.type"
    :show="messageProps.show"
    @on-end="EndMessage"
  />

  <v-dialog v-model="modalDelete" width="auto" :persistent="loadingDialog">
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
          <v-btn class="mr-5 text-white !bg-red-500" @click="modalDelete = false">Cancelar</v-btn>
          <v-btn class="ml-5 text-white !bg-green-600" @click="onDelete">Confirmar</v-btn>
        </div>
      </template>
    </v-card>
  </v-dialog>

  <v-dialog v-model="modal" width="auto">
    <v-card class="text-center" prepend-icon="mdi-update" :title="`Pesquisa de alunos`">
      <template v-slot:actions>
        <div class="flex justify-center items-center flex-col flex-1 w-[600px]">
          <div class="flex flex-row w-full h-20 bg-secondary">
            <div class="w-8/12 h-full flex justify-center items-center">
              <span class="text-sm md:text-md text-terciary text-center">{{
                handleFieldLabel()
              }}</span>
            </div>
            <div class="w-4/12 h-full flex justify-center items-center">
              <span class="text-sm md:text-md text-terciary text-center">Ações</span>
            </div>
          </div>

          <div v-for="student in students" :key="student?.id" class="flex flex-row w-full h-20">
            <div class="w-8/12 h-full flex justify-center items-center">
              <span class="text-sm md:text-md text-center">
                {{ student[String(field)] || 'Sem Registro' }}</span
              >
            </div>

            <div class="w-4/12 h-full flex justify-center items-center">
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
                      <v-icon
                        icon="fa-times-circle"
                        class="text-primary !text-[20px] 2xl:!text-[20px]"
                      />
                      <span class="text-primary text-md mr-3">Apagar</span>
                    </div>
                  </v-list>
                </v-card>
              </v-menu>
            </div>
          </div>
        </div>
      </template>
    </v-card>
  </v-dialog>

  <div class="w-full min-h-16 md:h-12 flex justify-center mt-1 items-center flex-col md:flex-row">
    <div class="min-w-[300px] w-11/12 md:w-6/12 h-full flex rounded bg-black overflow-hidden">
      <div class="flex justify-center items-center md:w-3/12 rounded">
        <v-select
          class="bg-transparent border-none md:!mt-[-0.4em] 2xl:mt-1 flex h-full no-border no-underline"
          v-model="field"
          border="border-opacity-0"
          variant="outlined"
          :disabled="loading"
          :base-color="Colors.secondary"
          :bg-color="`${Colors.secondary}`"
          :item-color="Colors.primary"
          :items="fields"
          item-title="label"
          item-value="value"
          single-line
        ></v-select>
      </div>
      <div class="flex justify-center items-center border-l border-solid border-gray-500 w-9/12">
        <v-text-field
          type="text"
          :disabled="loading"
          v-model="search"
          :placeholder="placeholder"
          class="bg-transparent border-none !mt-[-0.5em] 2xl:mt-1 flex h-full no-border no-underline"
          variant="outlined"
        ></v-text-field>
      </div>
    </div>

    <div
      class="flex w-8/12 h-12 mt-2 md:mt-0 md:mb-2 md:w-2/12 md:h-full ml-2 rounded-lg overflow-hidden active:opacity-50 select-none"
    >
      <v-btn
        :loading="loading"
        @click="Search()"
        class="!h-full bg-secondary text-white !text-sm"
        type="submit"
        block
        >Pesquisar 🔎</v-btn
      >
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ShowMessage from '@/components/ShowMessage.vue'
import { GetStudents, DeleteStudents } from '@/requests/students.request'
import Colors from '../../../../Colors'

const fields = [
  { value: 'name', label: 'Nome' },
  { value: 'email', label: 'Email' },
  { value: 'cpf', label: 'CPF' },
  { value: 'registration_number', label: 'Registro' }
]

const loading = ref(false)

const modal = ref(false)

const modalDelete = ref(false)

const loadingDialog = ref(false)

const field = ref('name')

const targetStudent = ref({})

const students = ref([])

const messageProps = ref({ message: '', type: 'error', show: false })

const EndMessage = (props) => {
  messageProps.value = props
}

const emit = defineEmits(['on-edit', 'on-delete'])

const placeholder = ref('Pesquisar por nome')

const search = ref('')

const handleFieldLabel = () => {
  return fields.find((e) => e.value == field.value).label || ''
}

const handleDelete = (student) => {
  targetStudent.value = student
  modalDelete.value = true
}

const Search = async () => {
  try {
    const payload = {
      type: field.value,
      search: search.value
    }
    students.value = []
    loading.value = true

    const response = await GetStudents(payload)

    console.log(response)

    if (response?.message) {
      messageProps.value = { message: String(response?.message), type: 'error', show: true }
    }

    students.value = [...response].map((e) => ({ ...e, show: false })) || []

    modal.value = true

    console.log('pesquisa')
  } catch (err) {
    console.log(err, 'erro')
  } finally {
    loading.value = false
  }
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

    modalDelete.value = false
    emit('on-delete', { ...targetStudent.value })
    students.value = students.value.filter((e) => e.id !== targetStudent.value?.id)
  } catch (err) {
    messageProps.value = { message: 'Erro interno!', type: 'error', show: true }
  } finally {
    loadingDialog.value = false
  }
}

const onEdit = (student) => {
  loading.value = false

  modal.value = false

  modalDelete.value = false

  loadingDialog.value = false
  emit('on-edit', { ...student })
}

watch(
  () => field.value,
  (newValue) => {
    const field_label = fields.find((e) => e.value === newValue)?.label || ''
    placeholder.value = `Pesquisar por ${String(field_label).toLowerCase()}`
    search.value = ''
  }
)
</script>

<style>
.v-field--variant-outlined {
  margin-top: 4px;
}

@media (max-width: 576px) {
  .v-field--variant-outlined {
    margin-top: 10px;
  }
}

.v-field {
  border-radius: 0px !important;
}

.v-select__content {
  background-color: #000f01 !important;
}

.v-list--one-line {
  background-color: #000f01 !important;
  border-radius: 0px !important;
}
.v-list-item-title {
  color: #fff;
}

.v-field__append-inner {
  padding-bottom: 8px;
}
</style>

<template>
  <ShowMessage
    v-if="messageProps.show"
    :message="messageProps.message"
    :type="messageProps.type"
    :show="messageProps.show"
    @on-end="EndMessage"
  />
  <div v-if="open" class="bg-white z-[2] absolute h-full w-full">
    <div
      @click="emit('on-closeModal', true)"
      class="min-w-20 max-w-[150px] absolute left-5 top-2 h-10 bg-black p-5 cursor-pointer active:opacity-50 flex justify-center items-center"
    >
      <v-icon icon="fa-arrow-left" class="text-white !text-[20px] 2xl:!text-[20px]" />
      <span class="text-white text-md ml-2"> Voltar </span>
    </div>

    <v-sheet class="w-full !flex flex-1 bg-transparent flex-col mt-16">
      <v-form
        fast-fail
        class="flex flex-col w-full flex-1 items-center justify-around"
        @submit.prevent="handleForm"
      >
        <div class="w-11/12 lg:w-6/12 h-16 mt-5 lg:mb-5 bg-white flex flex-1">
          <v-text-field
            class="flex-1 flex"
            v-model="valuesField.name"
            :rules="nameRule"
            prepend-icon="fa-user"
            :counter="250"
            label="Name"
            variant="solo"
          ></v-text-field>
        </div>

        <div
          class="w-full items-center h-full lg:w-6/12 min-h-16 lg:min-h-16 bg-white rounded-xl flex flex-col lg:flex-row lg:mt-5 lg:mb-5 lg:justify-between"
        >
          <div class="w-11/12 lg:w-[48%] lg:min-h-16 rounded-xl">
            <v-text-field
              class="flex-1 flex"
              prepend-icon="fa-asterisk"
              v-model="valuesField.cpf"
              :rules="cpfRule"
              :counter="11"
              label="CPF"
              variant="solo"
            ></v-text-field>
          </div>

          <div class="w-11/12 lg:w-[48%] lg:min-h-16 rounded-xl">
            <v-text-field
              class="flex-1 flex"
              v-model="valuesField.registration_number"
              :rules="raRule"
              prepend-icon="fa-address-card-o"
              :counter="10"
              label="Registro Academico"
              variant="solo"
            ></v-text-field>
          </div>
        </div>
        <div class="w-11/12 lg:w-6/12 min-h-16 lg:mt-5 lg:mb-5 bg-white flex flex-1">
          <v-text-field
            class="flex-1 flex"
            v-model="valuesField.email"
            :rules="emailRule"
            :counter="250"
            prepend-icon="fa-envelope-o"
            label="Email"
            variant="solo"
          ></v-text-field>
        </div>
        <div class="flex w-11/12 lg:w-6/12 min-h-16 lg:h-14 lg:min-h-16">
          <div className="w-3/6  h-14 mt-5 flex-1 max-h-14 rounded-xl flex pr-2">
            <v-btn
              :disabled="loading"
              @click="emit('on-closeModal', true)"
              class="!pb-2 !pt-2 !h-full !bg-red-500 text-white !text-md"
              block
              >Cancelar</v-btn
            >
          </div>

          <div className="w-3/6  h-14 mt-5 flex-1 max-h-14 rounded-xl flex pr-2">
            <v-btn
              :loading="loading"
              class="!pb-2 !pt-2 !h-full bg-primary text-secondary !text-md"
              type="submit"
              block
              >{{ valuesField?.id ? 'Atualizar Aluno' : 'Salvar Aluno' }}</v-btn
            >
          </div>
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { schema } from '@/schemas/student.schema'
import { CreateStudents, UpdateStudents } from '@/requests/students.request'

const props = defineProps(['open', 'values'])

const emit = defineEmits(['on-closeModal'])

const valuesField = ref({
  id: '',
  name: '',
  registration_number: '',
  cpf: '',
  email: ''
})

const loading = ref(false)

const messageProps = ref({ message: '', type: 'error', show: false })

const handleForm = async () => {
  try {
    const payload = {
      ...valuesField.value,
      registration_number: Number(valuesField.value.registration_number)
    }

    loading.value = true

    await schema.validate(payload, { abortEarly: false })

    let response = {}

    if (payload.id) {
      response = await UpdateStudents(payload)
    } else {
      response = await CreateStudents(payload)
    }

    console.log(response)

    if (response?.message) {
      messageProps.value = { message: String(response?.message), type: 'error', show: true }
      loading.value = false
      return
    }

    if (payload.id) {
      messageProps.value = { message: 'Atualizado com sucesso!', type: 'sucess', show: true }
    } else {
      messageProps.value = { message: 'Criado com sucesso!', type: 'sucess', show: true }
    }

    emit('on-closeModal')
  } catch (err) {
    console.log(err, 'erro')
  } finally {
    loading.value = false
  }
}

const EndMessage = (props) => {
  messageProps.value = props
}
watch(
  () => props?.values,
  (newValue) => {
    console.log(newValue, 'new value2')
    if (newValue) {
      valuesField.value = { ...newValue }
    }
  }
)
</script>

<script>
import handleErrorYup from '@/helpers/handleError.helper'
import ShowMessage from '@/components/ShowMessage.vue'

export default {
  name: 'ModalStudant',
  computed: {
    nameRule() {
      return [async (value) => await handleErrorYup('name', value, schema)]
    },
    cpfRule() {
      return [async (value) => await handleErrorYup('cpf', value, schema)]
    },
    emailRule() {
      return [async (value) => await handleErrorYup('email', value, schema)]
    },
    raRule() {
      return [async (value) => await handleErrorYup('registration_number', value, schema)]
    }
  },
  components: {
    ShowMessage
  }
}
</script>

<style setup>
.v-field__input {
  margin-top: -7px !important;
}
.v-input__details {
  padding-inline: 0px !important;
}
.v-messages__message {
  padding-top: 20px;
  color: red;
  font-weight: 700;
  text-align: center;
  padding-right: 15px;
}
.v-input__control {
  height: 3rem !important;
  margin-top: 0.2em;
  border-radius: 50px;
}
</style>

<template>
  <ShowMessage
    v-if="messageProps.show"
    :message="messageProps.message"
    :type="messageProps.type"
    :show="messageProps.show"
    @on-end="EndMessage"
  />
  <v-sheet class="w-full !flex flex-1 bg-transparent flex-col mt-16">
    <v-form
      fast-fail
      class="flex flex-col w-full flex-1 items-center justify-around"
      @submit.prevent="AuthForm"
    >
      <div
        class="w-4/5 h-14 2xl:h-16 rounded-xl flex flex-row mt-0 mb-10 xl:mb-15 xl:mt-15 shadow-sm bg-white"
      >
        <div className="w-1/6 h-full  rounded-xl flex justify-center items-center">
          <v-icon icon="fa-user-circle" class="text-primary !text-[20px] 2xl:!text-[30px]" />
        </div>

        <div className="w-5/6  h-full flex-1 rounded-xl flex pr-3">
          <v-select
            class="bg-transparent border-none 2xl:mt-1 flex h-full no-border no-underline"
            v-model="user"
            :rules="userRule"
            border="border-opacity-0"
            :no-data-text="'Operadores não encontrados'"
            variant="outlined"
            :bg-color="`${Color.white}`"
            :items="employess"
            item-title="name"
            item-value="id"
            label="Select..."
            single-line
          ></v-select>
        </div>
      </div>

      <div
        class="w-4/5 h-14 2xl:h-16 rounded-xl flex flex-row mt-5 mb-5 xl:mb-15 xl:mt-15 shadow-sm bg-white"
      >
        <div className="w-1/6 h-full  rounded-xl flex justify-center items-center">
          <v-icon icon="fa-lock" class="text-primary !text-[20px] 2xl:!text-[30px]" />
        </div>

        <div className="w-5/6 h-full relative flex-1 rounded-xl flex pr-2">
          <v-text-field
            :type="showPassword"
            :rules="passwordRule"
            v-model="password"
            class="bg-transparent border-none 2xl:mt-1 flex h-full no-border no-underline"
            variant="outlined"
          ></v-text-field>

          <div
            @click="handleShowPassword"
            class="items-center justify-center w-14 h-14 rounded absolute right-2 2xl:right-4 2xl:top-1 flex active:opacity-50 select-none text-secondary cursor-pointer"
          >
            <v-icon
              v-if="showPassword === 'password'"
              icon="fa-eye"
              class="text-secondary !text-[20px]"
            />
            <v-icon v-else icon="fa-eye-slash" class="text-secondary !text-[20px]" />
          </div>
        </div>
      </div>

      <div className="w-4/6  h-14 mt-5 flex-1 max-h-14 rounded-xl flex pr-2">
        <v-btn
          :loading="loading"
          class="!pb-2 !pt-2 !h-full bg-primary text-secondary !text-md"
          type="submit"
          block
          >Acessar</v-btn
        >
      </div>
    </v-form>
  </v-sheet>
  <div class="flex-[1] flex items-end pb-5 text-sm">
    Desenvolvido por
    <a
      class="ml-2 hover:text-primary hover:underline text-sm"
      href="https://github.com/LuanSVXM"
      target="_blank"
    >
      Luan Vieira</a
    >
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { setToken, verifyToken } from '@/helpers/authetication.helper'
import Colors from '../../../../Colors'
import { schema } from '@/schemas/login.schema'
import { Auth } from '@/requests/auth.request'
import { GetEmployees } from '@/requests/employees.request'

const router = useRouter()

const employess = ref([])

const password = ref('')

const loading = ref(false)

const showPassword = ref('password')

const messageProps = ref({ message: '', type: 'error', show: false })

const Color = ref(Colors)

const user = ref('')

const AuthForm = async () => {
  try {
    const payload = {
      user: user.value,
      password: password.value
    }
    loading.value = true
    await schema.validate(payload, { abortEarly: false })

    const response = await Auth(payload)
    console.log(response)

    if (response?.message) {
      messageProps.value = { message: String(response?.message), type: 'error', show: true }
    }

    setToken(response.token)

    const User = employess.value.find((e) => e.id === user.value)

    localStorage.setItem('name', User?.name)

    if (verifyToken()) {
      router.replace('/')
      return
    }
  } catch (err) {
    console.log(err, 'erro')
  } finally {
    loading.value = false
  }
}

const handleShowPassword = () => {
  if (showPassword.value === 'password') {
    showPassword.value = 'text'
  } else {
    showPassword.value = 'password'
  }
  return
}

const EndMessage = (props) => {
  messageProps.value = props
}

onMounted(async () => {
  employess.value = (await GetEmployees()) || []
})
</script>

<script>
import handleErrorYup from '@/helpers/handleError.helper'
import ShowMessage from '@/components/ShowMessage.vue'

export default {
  name: 'FormAuth',
  computed: {
    userRule() {
      return [async (value) => await handleErrorYup('user', value, schema)]
    },
    passwordRule() {
      return [async (value) => await handleErrorYup('password', value, schema)]
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

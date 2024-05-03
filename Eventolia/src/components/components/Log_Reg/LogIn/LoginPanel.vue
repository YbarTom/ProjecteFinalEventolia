<template>
  <div class="loginPanel">
    <div class="TituloLoginPanel">
      <h1>Eventolia</h1>
      <div class="input-container">
        <TextField text="email" v-model="email" />
      </div>
      <div class="input-container">
        <TextField text="password" v-model="password" type="password" />
      </div>
      <div><Button @click="login" text="Log In" /></div>
    </div>
  </div>
</template>

<script setup>
import ThemeToggler from '@/components/components/ThemeToggler.vue'
import TextField from '@/components/components/Log_Reg/TextField.vue'
import Button from '@/components/components/Log_Reg/Button.vue'
import * as funcionsCM from '../../../../communicationsManager.js'
import { useAppStore } from '@/stores/app.js'
import { useRouter } from 'vue-router'

let email = ""
let password = ""

const login = async () => {
  try {
    const appStore = useAppStore()
    const router = useRouter()

    var userInfo = {
      email: email,
      password: password
    }
    const response = await funcionsCM.logIn(userInfo)

    if (response.id) {
      appStore.setUser(response)
      router.push('/MainPage')
    }
    else {
      console.log("AAAA")
    }
  }
  catch (error) {
    console.error('Login Error: ', error)
  }
}
</script>

<script>
export default {
  components: {
    ThemeToggler,
    TextField,
    Button
  },
}
</script>

<style scoped>
.loginPanel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.TituloLoginPanel {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
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

<script>
import ThemeToggler from '@/components/components/ThemeToggler.vue'
import TextField from '@/components/components/Log_Reg/TextField.vue'
import Button from '@/components/components/Log_Reg/Button.vue'
import * as funcionsCM from '../../../../communicationsManager.js'
import { useAppStore } from '@/stores/app.js'

export default {
  components: {
    ThemeToggler,
    TextField,
    Button
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const appStore = useAppStore(); // You might want to check if you can access the store directly here without using a hook
        const userInfo = {
          email: this.email,
          password: this.password
        };
        const response = await funcionsCM.logIn(userInfo);

        if (response.id) {
          appStore.setUser(response);
          this.$router.push('/MainPage');
        } else {
          console.log("AAAA");
        }
      } catch (error) {
        console.error('Login Error: ', error);
      }
    }
  }
};
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

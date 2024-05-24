<template>
  <div class="loginPanel">
    <div class="TituloLoginPanel">
      <div class="input-container">
        <TextField text="email" v-model="email" />
      </div>
      <div class="input-container">
        <TextField text="password" v-model="password" type="password" />
      </div>
      <div><Button @click="login" text="Log In" /></div>

      <div @click="signUp = true">
        <p>Sign Up</p>
      </div>
    </div>
    <v-dialog v-model="signUp" width="79%">
      <SignUp @close-dialog="closeSignUpDialog" />
    </v-dialog>
    <v-dialog v-model="showErrorDialog" max-width="500">
      <v-card class="bg-principal">
        <v-card-title class="headline">Error</v-card-title>
        <v-card-text>{{ errorMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeErrorDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ThemeToggler from '@/components/components/ThemeToggler.vue'
import TextField from '@/components/components/Log_Reg/TextField.vue'
import Button from '@/components/components/Log_Reg/Button.vue'
import * as funcionsCM from '../../../../communicationsManager.js'
import { useAppStore } from '@/stores/app.js'
import SignUp from './SignUp.vue'

export default {
  components: {
    ThemeToggler,
    TextField,
    Button,
    SignUp
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      signUp: false,
      showErrorDialog: false
    };
  },
  methods: {
    async login() {
      try {
        const appStore = useAppStore();
        const userInfo = {
          email: this.email,
          password: this.password
        };
        const response = await funcionsCM.logIn(userInfo);
        if (response.id) {
          if (response.type === 'admin') {
            appStore.setUser(response);
            appStore.setAdmin();
            this.$router.push('/Admin');
          } else {
            appStore.setUser(response);
            this.$router.push('/MainPage');
          }
        } else {
          this.errorMessage = "Invalid email or password";
          this.showErrorDialog = true;
          this.clearErrorMessage();
        }
      } catch (error) {
        console.error('Login Error: ', error);
      }
    },
    clearErrorMessage() {
      setTimeout(() => {
        this.errorMessage = '';
        this.showErrorDialog = false;
      }, 10000);
    },
    closeErrorDialog() {
      this.showErrorDialog = false;
    },
    closeSignUpDialog() {
      this.signUp = false;
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

<template>
  <div class="loginPanel">
      <div class="TituloLoginPanel">
          <h1>Eventolia</h1>
          <div class="input-container"><TextField text="email"/></div>
          <div class="input-container"><TextField text="password"/></div>
          <div><Button /></div>
      </div>
  </div>  
</template>

<script setup>
  import ThemeToggler from '@/components/components/ThemeToggler.vue'
  import TextField from '@/components/components/Log_Reg/TextField.vue'
  import Button from '@/components/components/Log_Reg/Button.vue'
</script>

<script>
export default {
  components: {
    ThemeToggler,
    TextField,
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

  .TituloLoginPanel{
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
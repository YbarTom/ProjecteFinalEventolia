<template>
    <div class="loginPanel">
        <div class="bg-success">
            <h2>LoginPanel</h2>
            <div class="TituloLoginPanel">
                <h1>Eventolia</h1>
                <div><TextField text="email"/></div>
                <div><TextField text="password"/></div>
                <div><ButtonLogin/></div>
            </div>
        </div>
    </div>  
</template>
  
<script setup>
    import ThemeToggler from '@/components/components/ThemeToggler.vue'
    import TextField from '@/components/components/Log_Reg/TextField.vue'
    import ButtonLogin from '@/components/components/Log_Reg/Button.vue'
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
    .container {
      display: flex;
      height: 100vh;
      transition: background-color 0.5s ease;
    }

    .loginPanel {
        margin-top: 150px;
        margin-left: 100px;
        width: 400px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;  
    }

    .TituloLoginPanel{
        display: flex;             
        flex-direction: column;   
        align-items: center;
        margin-bottom: 20px;     
    }
</style>
  
<template>
    <h1>Lado Derecho</h1>
    <div class="bg-warning">
        <div class="login-panel"><LoginPanel/></div>
    </div>
</template>
  
<script setup>
    import ThemeToggler from '@/components/components/ThemeToggler.vue'
    import TextField from '@/components/components/Log_Reg/TextField.vue'
</script>

<script>
  export default {
    components: {
      ThemeToggler,
      TextField, // Asegúrate de incluir el componente TextField aquí
    },
  }
</script>

  <style scoped>
    
  </style>
  
<template>
    <h1>LoginPanel</h1>
    <div>
        <div><TextField text="email"/></div>
        <div><TextField text="Celo"/></div>
    </div>
      
</template>
  
<script setup>
    import ThemeToggler from '@/components/components/ThemeToggler.vue'
    import TextField from '@/components/components/Log_Reg/TextField.vue'
</script>
  
<script>

</script>
  
<style scoped>
    .container {
      display: flex;
      height: 100vh;
      transition: background-color 0.5s ease;
    }
</style>
  
<template>
    <h1>Centro</h1>
    <div><SignUpPanel/></div>
</template>
  
  <script setup>

    import SignUpPanel from '@/components/components/Log_Reg/SignUpPage/SignUpPanel.vue';

  </script>
  
  <style scoped>
    .bg-info {
    display: flex; /* Utiliza flexbox para alinear el contenido */
    justify-content: center; /* Centra el contenido horizontalmente */
  }
  .profile-img {
    width: 100%;
    max-width: 400px;
  }
  </style>
<template>
    <div class="panel">
        <div class="bg-warning">
            <h1>SignUpPanel</h1>
            <div><TextField text="Nom y Cognom"/></div>
            <div><TextField text="email"/></div>
            <div><TextField text="nick"/></div>
            <div><TextField text="password"/></div>
            <div><TextField text="password"/></div>
            <div><Button/></div>
        </div>
    </div>
</template>

<script setup>
import TextField from '../TextField.vue';
import Button from '../Button.vue';
</script>

<style scoped>
.panel {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
}

.bg-warning {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
}
</style>

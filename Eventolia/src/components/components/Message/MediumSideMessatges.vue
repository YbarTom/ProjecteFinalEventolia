
<template>
    <div class="bg-info">
        <h1>MediumSideMessatges</h1>
        <div><InfoUserMessage/></div>
        <div><InfoUserMessage/></div>
        <div><InfoUserMessage/></div>
    </div>
</template>

<script setup>
import InfoUserMessage from "@/components/components/Message/InfoUserMessage.vue";
</script>

<style scoped>
.bg-info {
    height: 100vh;
}
</style>
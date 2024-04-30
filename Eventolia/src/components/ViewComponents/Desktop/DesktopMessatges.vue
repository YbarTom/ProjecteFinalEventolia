<template>
    <div class="container">
        <div><LeftSideMessatges/></div>
        <div><MediumSideMessatges/></div>
        <div><RightSideMessatges/></div>
    </div>
</template>

<script setup>
import LeftSideMessatges from "@/components/components/LeftSideMainPage.vue";
import MediumSideMessatges from "@/components/components/Message/MediumSideMessatges.vue";
import RightSideMessatges from "@/components/components/Message/RightSideMessatges.vue";
</script>

<style scoped>
    .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
</style>
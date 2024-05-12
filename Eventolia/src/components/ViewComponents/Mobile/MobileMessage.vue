<template>
    <div class="container">
        <div class="middle-panel ">
            <ChatComponent />
        </div>
    </div>
    <div class="bottom-bar bg-background" v-if="isMobile">
        <btnBotonBar />
    </div>
</template>

<script setup>
import ChatComponent from "@/components/components/ChatComponent.vue";
import btnBotonBar from '@/components/components/buttonBotomBar.vue';

const isMobile = ref(window.innerWidth < 800);
const updateWidth = () => {
    isMobile.value = window.innerWidth < 800;
};

onMounted(() => {
    window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
});
</script>

<style scoped>
.container {
    display: flex;
    height: 100vh;
}
.middle-panel {
    flex: 2;
    /* Ocupa los dos tercios del contenedor */
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
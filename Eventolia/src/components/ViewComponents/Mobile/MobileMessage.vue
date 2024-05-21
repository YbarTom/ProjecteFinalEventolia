<template>
    <div class="container">
        <div class="middle-panel ">
            <div class="middle-panel " v-if="isDesktop">
                <ChatComponent />
            </div>
            <div class="middle-panel " v-else>
                <ChatComponentMobile />
            </div>
        </div>
    </div>
    <div class="bottom-bar bg-background" v-if="isMobile">
        <btnBotonBar />
    </div>
</template>

<script setup>
import ChatComponent from "@/components/components/ChatComponent.vue";
import ChatComponentMobile from "@/components/components/ChatComponentMobile.vue";
import btnBotonBar from '@/components/components/buttonBotomBar.vue';

const isMobile = ref(window.innerWidth < 800);

</script>

<style scoped>
.container, .middle-panel {
    display: flex;
    height: 100vh;
    width: 100%;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
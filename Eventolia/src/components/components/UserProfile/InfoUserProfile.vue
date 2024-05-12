<template>
    <div class="info-user-profile">
        <div class="ususrio">
            <div class="datos-usuario" v-if="isDesktop">
                <DatosUsuario :userProfile="props.userProfile" :ownProfile="props.ownProfile"/>
            </div>
            <div class="datos-usuario" v-else>
                <MobilDatosUsuario :userProfile="props.userProfile" :ownProfile="props.ownProfile"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import DatosUsuario from '@/components/components/UserProfile/DatosUsuario.vue'

import MobilDatosUsuario from '@/components/components/UserProfile/MobileDatosUsuario.vue'
import { defineProps } from "vue";

const props = defineProps({
    userProfile: Object,
    ownProfile: Boolean
})

const isDesktop = ref(window.innerWidth > 800);

const updateWidth = () => {
  isDesktop.value = window.innerWidth > 800; 
};

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

</script>

<style>
.ususrio {
    align-items: center;
    justify-content: space-between;
}

.img-usuario img {
    width: 100%;
    height: auto;
    max-width: 150px;
}
</style>

<template>
    <div class="info-user-profile">
        <div class="ususrio">
            <div class="datos-usuario">
                <InfoUserProfile :userProfile="props.userProfile" :ownProfile="props.ownProfile"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import InfoUserProfile from '@/components/components/UserProfile/DatosUsuario.vue'
import { defineProps } from "vue";

const props = defineProps({
    userProfile: Object,
    ownProfile: Boolean
})


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

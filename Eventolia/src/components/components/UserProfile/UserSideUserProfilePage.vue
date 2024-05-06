<template>
    <div>
        <PanelProfile :userProfile="props.userProfile" :ownProfile="props.ownProfile"/>
    </div>

</template>
<script setup>
import PanelProfile from '@/components/components/UserProfile/PanelProfile.vue'
import { defineProps } from "vue";
const props = defineProps({
    userProfile: Object,
    ownProfile: Boolean
})

</script>

<style scoped></style>
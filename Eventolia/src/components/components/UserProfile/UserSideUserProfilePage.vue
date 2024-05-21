<template>
    <div v-if="isDesktop">
        <PanelProfile :userProfile="props.userProfile" :ownProfile="props.ownProfile" :events="props.events"
            :posts="props.posts" />
    </div>
    <div v-else>
        <PanelProfileMobile :userProfile="props.userProfile" :ownProfile="props.ownProfile" :events="props.events"
            :posts="props.posts" />
    </div>

</template>
<script setup>


import PanelProfile from '@/components/components/UserProfile/PanelProfile.vue'
import PanelProfileMobile from '@/components/components/UserProfile/PanelProfileMobile.vue'


import { defineProps } from "vue";


const isDesktop = ref(window.innerWidth > 800);
const props = defineProps({
    userProfile: Object,
    ownProfile: Boolean,
    posts: Array,
    events: Array
})

</script>

<style scoped></style>
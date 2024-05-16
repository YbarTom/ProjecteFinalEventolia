<template>
    <div>
        <PanelProfile v-if="isDesktop" :userProfile="props.userProfile" :ownProfile="props.ownProfile" :events="props.events" :posts="props.posts"/>
        <PanelProfileMobile v-else  :userProfile="props.userProfile" :ownProfile="props.ownProfile" :events="props.events" :posts="props.posts"/>
    </div>

</template>
<script setup>
import PanelProfile from '@/components/components/UserProfile/PanelProfile.vue'

import PanelProfileMobile from '@/components/components/UserProfile/PanelProfileMobil.vue'
import { defineProps } from "vue";
const props = defineProps({
    userProfile: Object,
    ownProfile: Boolean,
    posts: Array,
    events: Array
})

</script>

<style scoped></style>
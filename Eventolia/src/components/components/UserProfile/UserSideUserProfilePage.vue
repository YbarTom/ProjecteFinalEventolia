<template>
    <div v-if="isDesktop">
        <PanelProfile :userProfile="props.userProfile" :ownProfile="props.ownProfile" :events="eventsGrid"
            :posts="postsGrid" />
    </div>
    <div v-else>
        <PanelProfileMobile :userProfile="props.userProfile" :ownProfile="props.ownProfile" :events="eventsGrid"
            :posts="postsGrid" />
    </div>

</template>
<script setup>
import PanelProfile from '@/components/components/UserProfile/PanelProfile.vue'
import PanelProfileMobile from '@/components/components/UserProfile/PanelProfileMobile.vue'

import { defineProps, onMounted } from "vue";

const postsGrid = ref([])
const eventsGrid = ref([])

onMounted(() => {
    postsGrid.value = props.posts.reverse()
    eventsGrid.value = props.events.reverse() 
});

const isDesktop = ref(window.innerWidth > 800);
const props = defineProps({
    userProfile: Object,
    ownProfile: Boolean,
    posts: Array,
    events: Array
})

</script>

<style scoped></style>
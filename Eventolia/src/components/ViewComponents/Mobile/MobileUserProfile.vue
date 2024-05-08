<template>
  <div class="user-side">
    <UserSideUserProfilePage :userProfile="props.userProfile" :ownProfile="props.ownProfile" :events="props.events"
      :posts="props.posts" />
  </div>
  <div class="bottom-bar bg-background" v-if="isMobile">
      <btnBotonBar/>
    </div>
</template>

<script setup>
import UserSideUserProfilePage from '@/components/components/UserProfile/UserSideUserProfilePage.vue'
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

const props = defineProps({
  userProfile: Object,
  ownProfile: Boolean,
  events: Array,
  posts: Array
})
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.left-panel {
  flex: 1;
}

.user-side {
  flex: 2;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>

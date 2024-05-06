<template>
  <div v-if="userProfile">
    <DesktopUserProfilePage v-if="isDesktop" :userProfile="userProfile" :ownProfile="ownProfile" />
    <MobileUserProfilePage v-else :userProfile="userProfile" :ownProfile="ownProfile" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import DesktopUserProfilePage from '@/components/ViewComponents/Desktop/DesktopUserProfilePage.vue'
import MobileUserProfilePage from '@/components/ViewComponents/Mobile/MobileUserProfile.vue'
import * as funcionsCM from '@/communicationsManager.js';
import { useAppStore } from '@/stores/app.js'
import { useRoute } from 'vue-router';

const isDesktop = ref(window.innerWidth > 800);
const userName = ref('')
const ownProfile = ref(false)
const userProfile = ref(null)

const updateWidth = () => {
  isDesktop.value = window.innerWidth > 800;
};

const route = useRoute()

onMounted(async () => {
  try {
    window.addEventListener('resize', updateWidth);
    userName.value = route.params.userName
    const data = await funcionsCM.getUserByName(userName.value)
    const appStore = useAppStore()

    //setUser no farà falta al final, si es vol usuari propi /userProfile/user1

    appStore.setUser({
      id: "zi0s21h26zlvm89j9d",
      userName: "a",
      email: "a",
      password: "a",
      followers: [],
      followed: [],
      posts: [],
      events: [],
      profilePic: "",
      privacity: false
    })
    const user = appStore.getUser()

    if (data.id == user.id) {
      ownProfile.value = true
      userProfile.value = data
    } else {
      userProfile.value = data
    }

  } catch (error) {
    console.error("Error getting profile", error)
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});
</script>

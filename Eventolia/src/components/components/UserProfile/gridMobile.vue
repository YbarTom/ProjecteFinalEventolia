<template>
    <div class="ancho">
      <div class="grid" ref="grid" v-if="map && grid">
        <div class="grid-item" @click="seePost(post)" v-for="(post, index) in props.posts" :key="index"
          :style="{ backgroundImage: 'url(' + post.image + ')' }"></div>
      </div>
      <div v-else>
        <Publication :post="postToSee" :key="postToSee.id"></Publication>
        <button @click="grid=true"></button>
      </div>
    </div>
  
  </template>
  
  <script setup>
  import { ref, onMounted, watch, nextTick } from 'vue';
  import { defineProps } from "vue";
  import Publication from '../Publication.vue';
  
  const props = defineProps({
    posts: Array,
    events: Array
  })
  
  const map = ref(true);
  const grid = ref(true)
  const postToSee = ref({})
  
  onMounted(() => {
    adjustGridItemHeight();
  });
  
  watch(map, () => {
    nextTick(adjustGridItemHeight);
  });
  
  const adjustGridItemHeight = () => {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
      item.style.height = `${item.offsetWidth}px`;
    });
  };
  
  const seePost = (post) => {
    postToSee.value = post
    grid.value = false
  }
  
  </script>
  
  <style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
    width: 100%;
    max-height: calc(100vh - 150px);
    overflow-y: auto;
  }
  
  .grid-item {
    text-align: center;
    background-image: url('../../../assets/images/bici.jpg');
    background-size: cover;
    background-position: center;
  }
  
  .grid::-webkit-scrollbar {
    display: none;
  }
  </style>
  
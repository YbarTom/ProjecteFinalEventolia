<template>
    <div class="bg-principal">
        <div v-for="comment in comments">
            <p class="userComments text-text"><b>{{ comment.userName }}</b> {{ comment.text }}</p>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, defineProps } from 'vue';
import * as funcionsCM from '../../communicationsManager.js'

const comments = ref([])

const props = defineProps({
    post: Object
})

onMounted(async () => {
    try {
        comments.value = await funcionsCM.getCommentsByIdPost(props.post.id)
    } catch (error) {
        console.error(error)
    }
})
</script>
<style scoped>
.userComments {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: left;
}
</style>
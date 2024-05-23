<template></template>
<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
const router = useRouter();

onMounted(async () => {
    router.push("/searchpage")
});
</script>
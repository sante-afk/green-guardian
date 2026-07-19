<template>
    <el-page-header @back="goBack" style="font-family: monospace; padding: 20px;">
        <template #content>
            <span class="title-layout">сomplete tasks over time</span>
        </template>
    </el-page-header>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.push({ name: 'main-layout'});
}
</script>
<style scoped>
@import '/src/assets/styles/element/completeTasksLayout.scss';
</style>
<template>
    <el-dialog width="500" title="new task" style="font-family: monospace;">
        <el-form v-model="form">
            <el-form-item label="name">
                <el-input :size="12" v-model="form.name" />
            </el-form-item>
            <el-form-item label="description">
                <el-input v-model="form.description" />
            </el-form-item>
        </el-form>
        <template #footer end>
            <el-button round @click="onCreateTask">
                create
            </el-button>
            <el-button round @click="$emit('onCloseNewTaskDialog')">
                close
            </el-button>
        </template>
        <ErrorDialog v-model="errDialog" v-on:closeErrorDialog="errDialog = false" :err-message="errMessage" />
    </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { TaskType } from '../types/task';
const errDialog = ref(false);
const errMessage = ref('');
const emit = defineEmits(['onCloseNewTaskDialog', 'newTask']);

const form = reactive<TaskType>({
    id: Date.now(),
    name: '',
    description: '',
    date: new Date()
});

const onCreateTask = () => {
    if (!form.id || !form.name || !form.description || !form.date) {
        errDialog.value = true;
        errMessage.value = "Error in some entries to complete";
    } else {
        emit('newTask', {...form});
        emit('onCloseNewTaskDialog')
    }
}
</script>
<style scoped>
@import '../assets/styles/element/newTaskDialog.scss';
</style>
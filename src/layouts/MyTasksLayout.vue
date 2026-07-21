<template>
    <el-page-header @back="goBack" style="font-family: monospace; padding: 20px;">
        <template #content>
            <span class="title-layout">my tasks</span>
        </template>
        <template #extra>
            <el-button round @click="onOpenDialog">new task</el-button>
        </template>
        <div class="containerTask">
            <div class="tasks" v-for="(item, index) in tasks" :key="item.id" id="tasks">
                <div class="dataContainer">
                    <span>task name: {{ checkValue(item.name) }} </span>
                    <span>description: {{ checkValue(item.description) }} date: {{ new Date(item.date).toDateString() }}</span>
                </div>
                <div class="containerButton">
                    <el-button round v-model="buttonDelete" @click="handleDelete(index)" class="buttonDelete">
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>
                    <el-button round v-model="buttonEdit" @click="handleEdit" class="buttonEdit">
                        <el-icon>
                            <Edit />
                        </el-icon>
                    </el-button>
                    <el-button round v-model="buttonInfo" @click="handleInfo" class="buttonInfo">
                        <el-icon>
                            <InfoFilled />
                        </el-icon>
                    </el-button>
                </div>
            </div>
        </div>
    </el-page-header>
    <new-task-dialog v-model="newTaskDialog" @onCloseNewTaskDialog="newTaskDialog = false" @newTask="addTask" />
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import NewTaskDialog from '../components/NewTaskDialog.vue';
import type { TasksType } from '../types/tasks.ts';
import type { TaskType } from '../types/task.ts';
import {
    Delete,
    Edit,
    InfoFilled
} from '@element-plus/icons-vue'

const newTaskDialog = ref(false);
const router = useRouter();
const buttonDelete = ref(false);
const buttonEdit = ref(false);
const buttonInfo = ref(false);
const tasks = ref<TasksType>([]);

const onOpenDialog = () => {
    newTaskDialog.value = true;
}

const handleDelete = (index: number) => {
    tasks.value.splice(index, 1);
}

const handleEdit = () => {
}

const handleInfo = () => {
}

const addTask = (task: TaskType) => {
    tasks.value = [...tasks.value, task];
}

const goBack = () => {
    router.push({ name: 'main-layout' });
}

const checkValue = (value: any) => {
    return value != null ? value : "Нет данных";
} 
</script>
<style scoped>
@import '/src/assets/styles/element/myTasksLayout.scss';
</style>
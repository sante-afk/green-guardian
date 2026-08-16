<template>
    <el-dialog width="500" title="Description" style="font-family: monospace;">
        <el-form label-width="auto" label-position="left">
            <el-form-item label="name">
                <el-input class="form-input" v-model="editName" />
            </el-form-item>
            <el-form-item label="date">
                <el-date-picker type="datetime" class="form-date" v-model="editDate"/>
            </el-form-item>
            <el-form-item label="description">
                <el-input class="form-input" v-model="editDescription" />
            </el-form-item>
        </el-form>
        <template #footer end>
            <el-button round @click="editTask">
                edit
            </el-button>
            <el-button round @click="emit('onCloseEditTaskDialog')">
                close
            </el-button>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
    cardIndex: Number,
    cardName: String,
    cardDescription: String,
    cardDate: String
})

const emit = defineEmits(['editTask', 'onCloseEditTaskDialog']);

const editName = ref(props?.cardName);
const editDate = ref(props?.cardDescription);
const editDescription = ref(props?.cardDate);

const editTask = () => {
    const task = {
        index: props?.cardIndex,
        editName,
        editDate,
        editDescription
    }
    emit('editTask', {...task});
    emit('onCloseEditTaskDialog');
}
</script>
<style>
@import "../assets/styles/element/editTaskDialog.scss";
</style>
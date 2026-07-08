<template>
    <el-dialog width="500" title="Warning" style="font-family: monospace;">
        <el-text v-text="errMessage" />
        <template #footer end>
            <el-button round @click="$emit('closeErrorDialog')"> 
                <el-icon class="el-icon--left">
                    <CircleCloseFilled />
                </el-icon>Close
            </el-button>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { CircleCloseFilled } from '@element-plus/icons-vue';
defineProps({
    errDialog: Boolean,
    errMessage: String
});
</script>
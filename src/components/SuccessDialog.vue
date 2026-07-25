<template>
    <el-dialog width="500" title="Success" style="font-family: monospace;">
        <el-text v-text="succMessage" />
        <template #footer end>
            <el-button round @click="$emit('closeSuccessDialog')"> 
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
    succDialog: Boolean,
    succMessage: String
});
</script>
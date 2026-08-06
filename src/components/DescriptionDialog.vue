<template>
    <el-dialog width="500" title="Description" style="font-family: monospace;">
        <el-form label-width="auto" label-position="left">
            <el-form-item label="name">
                <el-text class="form-text" v-text="cardName" />
            </el-form-item>
            <el-form-item label="date">
                <el-text class="form-text" v-text="cardDate"/>
            </el-form-item>
            <el-form-item label="description">
                <el-text class="form-text" v-text="cardDescription" />
            </el-form-item>
        </el-form>
        <template #footer end>
            <el-button round @click="$emit('onCloseDescriptionDialog')">
                close
            </el-button>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
defineProps({
    cardName: String,
    cardDescription: String,
    cardDate: String
})
</script>
<style>
@import "../assets/styles/element/descriptionDialog.scss";
</style>
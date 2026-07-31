<template>
    <el-container class="main-container">
        <div class="timer-container">
            <div class="timer">
                <el-time-picker :disabled="pickerDisabled" v-model="time" placeholder="Arbitrary time" format="mm:ss" />
            </div>
            <el-container class="container-button">
                <el-button round size="large" class="button-start" @click="startTimer" :disabled="btnStartDisabled"
                    :loading="isLoading">start</el-button>
                <el-button round size="large" class="button-pause" @click="pauseTimer">pause</el-button>
                <el-button round size="large" class="button-reset" @click="resetTimer">reset</el-button>
            </el-container>
        </div>
    </el-container>
    <SuccessDialog v-model="succDialog" v-on:closeSuccessDialog="succDialog = false" :succ-message="succMessage" />
    <ErrorDialog v-model="errDialog" v-on:closeErrorDialog="errDialog = false" :err-message="errMessage" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import ErrorDialog from './ErrorDialog.vue';
import SuccessDialog from './SuccessDialog.vue';

const time = ref('')
const succMessage = ref('');
const succDialog = ref(false);
const errMessage = ref('');
const errDialog = ref(false);
const pickerDisabled = ref(false);
const btnStartDisabled = ref(false);
const isLoading = ref(false);
let timeId: any = null;

const startTimer = () => {
    btnStartDisabled.value = true;
    isLoading.value = true;
    pickerDisabled.value = true;
    if (time.value) {
        const date = new Date(time.value);
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        timeId = setInterval(() => {
            if (seconds) {
                seconds--;
                time.value = String(new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), minutes, seconds));
            } else {
                if (minutes !== 0) {
                    minutes--;
                    seconds = 59;
                    time.value = String(new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), minutes, seconds));
                } else {
                    succDialog.value = true;
                    pickerDisabled.value = false;
                    isLoading.value = false;
                    btnStartDisabled.value = false;
                    succMessage.value = "Timer is done"
                    clearInterval(timeId);
                }
            }
        }, 1000);
    } else {
        errDialog.value = true;
        pickerDisabled.value = false;
        isLoading.value = false;
        btnStartDisabled.value = false;
        errMessage.value = "Error time not chose";
    }
}

const resetTimer = () => {
    if (timeId != null) {
        pickerDisabled.value = false;
        isLoading.value = false;
        btnStartDisabled.value = false;
        clearInterval(timeId);
        timeId = 0;
        time.value = '';
    }
}

const pauseTimer = () => {
    if (timeId != null) {
        pickerDisabled.value = false;
        isLoading.value = false;
        btnStartDisabled.value = false;
        clearInterval(timeId);
    }
}

</script>
<style>
@import '../assets/styles/element/timerComponent.scss';
</style>
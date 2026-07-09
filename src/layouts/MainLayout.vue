<template>
  <el-container>
    <el-header class="header-main">
      <el-aside>
        <div class="header-container">
          <el-avatar :size="32" style="background-color: black;"
            src="https://imgs.search.brave.com/oy9syiR5YnwjhHNhyYrSaFY2kmOHRH-8J-6qHVEnxes/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTAv/NDc5LzEyMi9zbWFs/bC9wdXJwbGUtZmxv/d2Vycy13aXRoLWdy/ZWVuLWxlYXZlcy1j/dXQtb3V0LXN0b2Nr/LXBuZy5wbmc" />
          <span class="label-app">Green Guardian</span>
        </div>
      </el-aside>
      <el-aside>
        <el-button round @click="onCompTasks">сomplete tasks over time</el-button>
        <el-button round @click="onMyTasks">my tasks</el-button>
      </el-aside>
    </el-header>
    <el-container class="common-layout">
      <el-aside width="250px">
        <div class="container-progress" style="font-family: monospace;">
          <el-text class="el-text" style="color: #e6a23c;">Humidity</el-text>
          <el-progress :text-inside="true" :stroke-width="26" :percentage="humidityValue" status="warning"
            :format="format" />
          <el-text class="el-text" style="color: #f56c6c;">Temperature</el-text>
          <el-progress :text-inside="true" :stroke-width="24" :percentage="temperatureValue" status="exception"
            :format="formatDegrees" />
          <el-text class="el-text" style="color: #67c23a;">Happy</el-text>
          <el-progress :text-inside="true" :stroke-width="24" :percentage="happyValue" status="success"
            :format="format" />
          <el-text class="el-text" style="color: #409eff;">Water</el-text>
          <el-progress :text-inside="true" :stroke-width="24" :percentage="waterValue" :format="format" />
          <el-button size="small" round class="el-button-refresh" @click="hundleRefresh()"
            :loading="isRefresh">refresh</el-button>
        </div>
      </el-aside>
      <el-main class="el-main">
        <el-scrollbar class="scrollbar-container">
          <p v-for="i in messagePerson" key="i" class="message-person">{{ i }}</p>
          <p v-for="j in messageArtInt" key="j" class="message-ai">{{ j }}</p>
        </el-scrollbar>
        <el-form class="el-form">
          <el-input type="text" v-model="inputMessage" size="small" class="el-input" />
          <el-button round size="small" :loading="isLoading"
            style="font-family: monospace; display: flex; flex-direction: column;"
            @click="handleSendMessage(sucAlert, erAlert)">{{ isLoading ? ' ' : 'send' }}</el-button>
        </el-form>
      </el-main>
      <el-aside>
        <el-image :src="urlFlower" class="el-flower" />
      </el-aside>
    </el-container>
    <ErrorDialog v-model="errDialog" v-on:closeErrorDialog="errDialog = false" :err-message="errMessage" />
  </el-container>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessageBox, ElText } from 'element-plus'
import { postMessage } from "../api/postMessage"
import ErrorDialog from '../components/ErrorDialog.vue';
import { useRouter } from 'vue-router';
const urlFlower = '/src/assets/images/flower.png';
const inputMessage = ref('');
const errMessage = ref('');
const errDialog = ref(false);
const messagePerson = ref(new Set());
const messageArtInt = ref(new Set());
const humidityValue = ref('0');
const temperatureValue = ref('0');
const happyValue = ref('0');
const waterValue = ref('0');
const erAlert = ref(false);
const sucAlert = ref(false);
const isLoading = ref(false);
const isRefresh = ref(false);

declare global {
  interface Navigator {
    serial: any;
  }
}

const router = useRouter()

const onCompTasks = () => {
  router.push({ name: 'complete-tasks'});
}

const onMyTasks = () => {
  router.push({name: 'my-tasks'});
}

const format = (value: string) => {
  return `${value}`;
};

const formatDegrees = (value: string) => {
  return `${value} °C`;
}

const hundleRefresh = async () => {
  try {
    const encoder: TextEncoder = new TextEncoder();
    const port = await navigator.serial.requestPort()
    isRefresh.value = true;
    await port.open({ baudRate: 9600 });
    await new Promise((r) => setTimeout(r, 2000));
    const writer = port.writable.getWriter();
    await writer.write(encoder.encode("G"));
    writer.releaseLock();
    const numsArray: string[] = [];
    const reader = port.readable.getReader();

    setTimeout(async () => {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          reader.releaseLock();
          errDialog.value = true;
          errMessage.value = 'Port off'
          break;
        }
        let values: string = new TextDecoder().decode(value);
        let nums = values.match(/\d+/g);

        if (nums && numsArray.length !== 2) {
          nums.forEach(item => {
            numsArray.push(item);
          });
        }

        if (numsArray.length) {
          humidityValue.value = String(numsArray[0]);
          temperatureValue.value = String(numsArray[1]);
          waterValue.value = String(numsArray[2]);
          numsArray.length = 0;
          writer.releaseLock();
          reader.releaseLock();
          isRefresh.value = false;
          await port.close();
        }
      }
      console.log(port);
    }, 2000)

  } catch (error) {
    isRefresh.value = false;
    errDialog.value = true;
    errMessage.value = 'Request port error'
  }
}

const handleSendMessage = async (sucAlert: any, erAlert: any) => {
  const sAlert = sucAlert;
  const eAlert = erAlert;
  messagePerson.value.add(inputMessage.value);
  isLoading.value = true;
  const messageAi = await postMessage(inputMessage.value, sAlert, eAlert, isLoading);

  if (messageAi.isAxiosError) {
    errDialog.value = true
    errMessage.value = messageAi.message;
  } else {
    messageArtInt.value.add(messageAi.choices[0].message.content);
  }

}

</script>
<style scoped>
@import '/src/assets/styles/element/mainLayout.scss';
</style>
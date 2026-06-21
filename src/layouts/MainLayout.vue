<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="250px">
        <div class="container-progress">
          <el-text class="el-text">Humidity</el-text>
          <el-progress :text-inside="true" :stroke-width="26" :percentage="humidityValue" status="warning"
            :format="format" />
          <el-text class="el-text">Temperature</el-text>
          <el-progress :text-inside="true" :stroke-width="24" :percentage="temperatureValue" status="exception"
            :format="formatDegrees" />
          <el-text class="el-text">Happy</el-text>
          <el-progress :text-inside="true" :stroke-width="24" :percentage="happyValue" status="warning"
            :format="format" />
          <el-text class="el-text">Water</el-text>
          <el-progress :text-inside="true" :stroke-width="24" :percentage="waterValue" :format="format" />
          <el-button size="small" round class="el-button-refresh" @click="hundleRefresh()">refresh</el-button>
        </div>
      </el-aside>
      <el-main class="el-main">
        <div class="container-messages">
          <el-text>{{ messages }}</el-text>
        </div>
        <el-form class="el-form">
          <el-input type="text" v-model="inputMessage" size="small" class="el-input" />
          <el-button round size="small" @click="handleSendMessage()">send</el-button>
        </el-form>
      </el-main>
      <el-aside>
        <el-image :src="urlFlower" class="el-flower" />
      </el-aside>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
const urlFlower = '/src/assets/images/flower.png';
const inputMessage = ref('');
const messages = ref('');
const humidityValue = ref('0');
const temperatureValue = ref('0');
const happyValue = ref('0');
const waterValue = ref('0');

declare global {
  interface Navigator {
    serial: any;
  }
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
          ElMessageBox.alert("port off", 'Info', {
            confirmButtonText: 'Ok',
          });
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
          await port.close();
        }
      }
      console.log(port);
    }, 2000)

  } catch (error) {
    ElMessageBox.alert("request port error", 'Error', {
      confirmButtonText: 'Ok',
    });
  }
}

const handleSendMessage = async () => {
  messages.value = inputMessage.value;
  inputMessage.value = '';
};

</script>
<style scoped>
@import '/src/assets/styles/element/mainLayout.scss';
</style>
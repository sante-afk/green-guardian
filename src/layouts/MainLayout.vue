<template >
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div class="container-progress">
          <el-text class="el-text">Humidity</el-text>
          <el-progress 
            :text-inside="true" 
            :stroke-width="26" 
            :percentage="70" />

          <el-text class="el-text">Warm</el-text>
          <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="100"
            status="success"
          />
          <el-text class="el-text">Happy</el-text>
          <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="80"
            status="warning"
          />

          <el-text class="el-text">Water</el-text>
          <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="50"
            status="exception"
          />
        </div>
      </el-aside>
      <el-main class="el-main">
        <div class="container-messages">
            <el-text>{{ messages }}</el-text>
        </div>
        <el-form class="el-form">
          <el-input
            type="text"
            v-model="inputMessage"
            size="small"
            class="el-input"
          />
          <el-button size="small" @click="handleSendMessage">send</el-button>
        </el-form>
      </el-main>
      <el-aside>
        <el-image :src="urlFlower" class="el-flower"/>
      </el-aside>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
const urlFlower = '/src/assets/images/flower.png';
const inputMessage = ref('');
const messages = ref('');

const handleSendMessage = () => {
  const text = inputMessage.value;
  messages.value = text;
};

</script>
<style scoped>
@import '/src/assets/styles/element/mainLayout.scss';
</style>
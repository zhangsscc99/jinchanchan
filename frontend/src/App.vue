<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" fixed>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="plus" to="/add-game">添加对局</van-tabbar-item>
      <van-tabbar-item icon="chart-trending-o" to="/statistics">统计</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'App',
  setup() {
    const active = ref(0)
    
    return {
      active
    }
  }
}
</script>

<style>
#app {
  height: 100vh;
  background-color: #f8f8f8;
}

.page-container {
  padding-bottom: 60px;
  height: 100vh;
  overflow-y: auto;
}

.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style> 
